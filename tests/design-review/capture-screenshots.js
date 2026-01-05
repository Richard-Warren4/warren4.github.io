#!/usr/bin/env node

/**
 * Screenshot Capture Script for Design Review
 * User Story 1: Comprehensive Visual Analysis
 *
 * Captures screenshots of website pages at multiple viewport sizes
 * for design analysis with Claude Code.
 *
 * Usage:
 *   node capture-screenshots.js
 *   node capture-screenshots.js --url https://custom-url.com
 *   node capture-screenshots.js --local (uses http://localhost:4321)
 */

import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { VIEWPORTS, PAGES, BASE_URL, NAVIGATION_TIMEOUT, STABILIZATION_DELAY, RETRY_CONFIG } from './config.js';
import { ensureTempDirectory, retryWithBackoff, formatFileSize, getTimestamp } from './utils.js';

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  let baseUrl = BASE_URL;
  let keepScreenshots = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) {
      baseUrl = args[i + 1];
      i++;
    } else if (args[i] === '--local') {
      baseUrl = 'http://localhost:4321';
    } else if (args[i] === '--keep-screenshots' || args[i] === '--keep') {
      keepScreenshots = true;
    }
  }

  return { baseUrl, keepScreenshots };
}

/**
 * Capture a single screenshot with metadata
 *
 * @param {import('playwright').Page} page - Playwright page object
 * @param {Object} pageInfo - Page information
 * @param {Object} viewport - Viewport configuration
 * @param {string} tempDir - Temporary directory path
 * @returns {Promise<Object>} ScreenshotArtifact object
 */
async function captureScreenshot(page, pageInfo, viewport, tempDir) {
  const fileName = `${pageInfo.id}-${viewport.label}-${viewport.width}x${viewport.height}.png`;
  const filePath = path.join(tempDir, fileName);

  console.log(`📸 Capturing ${pageInfo.name} at ${viewport.width}px (${viewport.label})...`);

  // Set viewport size
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  // Navigate to page
  const url = pageInfo.path === '/' ? '' : pageInfo.path;
  await page.goto(`${url}`, {
    waitUntil: 'networkidle',
    timeout: NAVIGATION_TIMEOUT
  });

  // Wait for page to stabilize (animations, dynamic content)
  await page.waitForTimeout(STABILIZATION_DELAY);

  // Capture full-page screenshot
  await page.screenshot({
    path: filePath,
    fullPage: true,
    type: 'png'
  });

  // Get file stats
  const stats = fs.statSync(filePath);

  // Create ScreenshotArtifact metadata
  const artifact = {
    pageId: pageInfo.id,
    pageName: pageInfo.name,
    url: page.url(),
    viewport: {
      width: viewport.width,
      height: viewport.height,
      label: viewport.label
    },
    filePath,
    fileName,
    fileSize: stats.size,
    format: 'png',
    timestamp: getTimestamp(),
    captureSuccess: true,
    captureAttempts: 1
  };

  console.log(`   ✓ Saved ${fileName} (${formatFileSize(stats.size)})`);

  return artifact;
}

/**
 * Capture screenshot with retry logic
 *
 * @param {import('playwright').Page} page - Playwright page object
 * @param {Object} pageInfo - Page information
 * @param {Object} viewport - Viewport configuration
 * @param {string} tempDir - Temporary directory path
 * @returns {Promise<Object>} ScreenshotArtifact object (with error if failed)
 */
async function captureWithRetry(page, pageInfo, viewport, tempDir) {
  let attempts = 0;

  try {
    const artifact = await retryWithBackoff(
      async () => {
        attempts++;
        return await captureScreenshot(page, pageInfo, viewport, tempDir);
      },
      {
        maxAttempts: RETRY_CONFIG.maxAttempts,
        delays: RETRY_CONFIG.delays,
        context: `${pageInfo.name} at ${viewport.width}px`
      }
    );

    artifact.captureAttempts = attempts;
    return artifact;

  } catch (error) {
    // All retry attempts failed
    console.error(`   ✗ Failed to capture ${pageInfo.name} at ${viewport.width}px: ${error.message}`);

    return {
      pageId: pageInfo.id,
      pageName: pageInfo.name,
      url: `${pageInfo.path}`,
      viewport: {
        width: viewport.width,
        height: viewport.height,
        label: viewport.label
      },
      filePath: null,
      fileName: null,
      fileSize: 0,
      format: 'png',
      timestamp: getTimestamp(),
      captureSuccess: false,
      captureAttempts: attempts,
      error: error.message
    };
  }
}

/**
 * Main execution function
 */
async function main() {
  const { baseUrl, keepScreenshots } = parseArgs();

  console.log('🎯 Design Review Screenshot Capture');
  console.log('=====================================\n');
  console.log(`📍 Target URL: ${baseUrl}`);
  console.log(`📊 Pages to capture: ${PAGES.length}`);
  console.log(`📱 Viewports: ${VIEWPORTS.map(v => `${v.width}px (${v.label})`).join(', ')}`);
  console.log(`📸 Total screenshots: ${PAGES.length * VIEWPORTS.length}\n`);

  // Ensure temp directory exists
  const tempDir = ensureTempDirectory();
  console.log(`📁 Temp directory: ${tempDir}\n`);

  // Launch browser
  console.log('🚀 Launching browser...\n');
  const browser = await chromium.launch({
    headless: true
  });

  const context = await browser.newContext({
    baseURL: baseUrl
  });

  const page = await context.newPage();

  // Track all captures
  const artifacts = [];
  let successCount = 0;
  let failCount = 0;

  // Capture screenshots for each page and viewport combination
  const startTime = Date.now();

  for (const pageInfo of PAGES) {
    for (const viewport of VIEWPORTS) {
      const artifact = await captureWithRetry(page, pageInfo, viewport, tempDir);
      artifacts.push(artifact);

      if (artifact.captureSuccess) {
        successCount++;
      } else {
        failCount++;
      }
    }
    console.log(''); // Empty line between pages
  }

  // Close browser
  await browser.close();

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  // Summary
  console.log('=====================================');
  console.log('✅ Screenshot Capture Complete\n');
  console.log(`📊 Summary:`);
  console.log(`   Total: ${artifacts.length} screenshots`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Duration: ${duration}s\n`);

  if (failCount > 0) {
    console.log('⚠️  Failed Captures:');
    artifacts
      .filter(a => !a.captureSuccess)
      .forEach(a => {
        console.log(`   - ${a.pageName} at ${a.viewport.width}px: ${a.error}`);
      });
    console.log('');
  }

  // Output for Claude Code analysis
  console.log('📋 Next Step: Analyze with Claude Code');
  console.log('=====================================\n');
  console.log('Provide these screenshots to Claude Code for design analysis:\n');

  artifacts
    .filter(a => a.captureSuccess)
    .forEach(a => {
      console.log(`${a.filePath}`);
    });

  console.log('\nUse this prompt with Claude Code:');
  console.log('```');
  console.log('Please analyze these screenshots for design quality:');
  console.log('- Typography (readability, hierarchy, sizing)');
  console.log('- Color scheme (contrast, accessibility, branding)');
  console.log('- Spacing and layout (whitespace, density, alignment)');
  console.log('- Visual hierarchy (attention flow, importance signals)');
  console.log('- Cross-device responsiveness (mobile/tablet/desktop)');
  console.log('- Accessibility (WCAG AA compliance)');
  console.log('');
  console.log('Reference: docs/DESIGN-PRINCIPLES.md and Constitution Principle VI');
  console.log('```\n');

  // Cleanup option
  if (!keepScreenshots) {
    console.log('💡 Tip: Screenshots will remain in temp directory until next capture.');
    console.log(`   Use --keep-screenshots flag to explicitly preserve them.\n`);
  } else {
    console.log(`✅ Screenshots preserved in: ${tempDir}\n`);
  }

  // Exit with error code if any captures failed
  if (failCount > 0) {
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
