/**
 * Utility functions for design review system
 * Based on research.md and plan.md
 */

import os from 'os';
import path from 'path';
import fs from 'fs';

/**
 * Get the temporary directory path for screenshots
 * Spec requires: Save to system temp folder
 *
 * @returns {string} Absolute path to temp directory
 */
function getTempDirectory() {
  return path.join(os.tmpdir(), 'warren4-design-review');
}

/**
 * Ensure temp directory exists
 * Creates directory if it doesn't exist
 *
 * @returns {string} Absolute path to temp directory
 */
function ensureTempDirectory() {
  const tempDir = getTempDirectory();

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  return tempDir;
}

/**
 * Clean up temp directory and all its contents
 * Spec requires: Delete screenshots after analysis
 *
 * @returns {void}
 */
function cleanupTempDirectory() {
  const tempDir = getTempDirectory();

  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log(`🧹 Cleaned up temp directory: ${tempDir}`);
  }
}

/**
 * Retry a function with exponential backoff
 * Spec requires: 2 retries with exponential backoff (1s, 2s delays)
 *
 * @param {Function} fn - Async function to retry
 * @param {Object} options - Retry configuration
 * @param {number} options.maxAttempts - Maximum number of attempts (default: 3)
 * @param {number[]} options.delays - Delay in ms between attempts (default: [1000, 2000])
 * @param {string} options.context - Context description for error messages
 * @returns {Promise<any>} Result of the function if successful
 * @throws {Error} Last error if all attempts fail
 */
async function retryWithBackoff(fn, options = {}) {
  const {
    maxAttempts = 3,
    delays = [1000, 2000],
    context = 'operation'
  } = options;

  let lastError;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts - 1) {
        const delay = delays[attempt] || delays[delays.length - 1];
        console.log(`⚠️  Attempt ${attempt + 1} failed for ${context}: ${error.message}`);
        console.log(`   Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  // All attempts failed
  throw new Error(`Failed after ${maxAttempts} attempts: ${lastError.message}`);
}

/**
 * Sleep for specified milliseconds
 *
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format file size in human-readable format
 *
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size (e.g., "1.5 MB")
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get current timestamp in ISO 8601 format
 *
 * @returns {string} ISO 8601 timestamp
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Get date stamp for file naming (YYYY-MM-DD)
 *
 * @returns {string} Date stamp
 */
function getDateStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export {
  getTempDirectory,
  ensureTempDirectory,
  cleanupTempDirectory,
  retryWithBackoff,
  sleep,
  formatFileSize,
  getTimestamp,
  getDateStamp
};
