#!/usr/bin/env node

/**
 * Pre-publish tests for Warren4 blog
 * Simple validation checks before deploying to production
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

let passed = 0;
let failed = 0;

// Colors for terminal output
const colors = {
	green: '\x1b[32m',
	red: '\x1b[31m',
	yellow: '\x1b[33m',
	blue: '\x1b[34m',
	reset: '\x1b[0m',
};

function log(message, color = 'reset') {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

function pass(message) {
	passed++;
	log(`✓ ${message}`, 'green');
}

function fail(message) {
	failed++;
	log(`✗ ${message}`, 'red');
}

function section(message) {
	log(`\n${message}`, 'blue');
	log('='.repeat(message.length), 'blue');
}

// Test 1: Check dist folder exists
function testDistExists() {
	section('Test 1: Build Output');
	if (existsSync(DIST_DIR)) {
		pass('dist/ folder exists');
		return true;
	} else {
		fail('dist/ folder not found - run npm run build first');
		return false;
	}
}

// Test 2: Check key pages exist
function testKeyPagesExist() {
	section('Test 2: Key Pages');
	const pages = ['index.html', 'about/index.html', 'blog/index.html', 'rss.xml'];

	for (const page of pages) {
		const path = join(DIST_DIR, page);
		if (existsSync(path)) {
			pass(`${page} exists`);
		} else {
			fail(`${page} not found`);
		}
	}
}

// Test 3: Check pages have required HTML elements
function testPageStructure() {
	section('Test 3: Page Structure');
	const pages = [
		{ path: 'index.html', name: 'Home' },
		{ path: 'about/index.html', name: 'About' },
		{ path: 'blog/index.html', name: 'Blog' },
	];

	for (const page of pages) {
		const filePath = join(DIST_DIR, page.path);
		if (!existsSync(filePath)) continue;

		const html = readFileSync(filePath, 'utf-8');
		const $ = cheerio.load(html);

		// Check for title
		if ($('title').length > 0 && $('title').text().trim()) {
			pass(`${page.name} has <title>`);
		} else {
			fail(`${page.name} missing <title>`);
		}

		// Check for meta description
		if ($('meta[name="description"]').length > 0) {
			pass(`${page.name} has meta description`);
		} else {
			fail(`${page.name} missing meta description`);
		}

		// Check for favicon
		if ($('link[rel="icon"]').length > 0) {
			pass(`${page.name} has favicon`);
		} else {
			fail(`${page.name} missing favicon link`);
		}
	}
}

// Test 4: Check for broken internal links
function testInternalLinks() {
	section('Test 4: Internal Links');
	const pages = getAllHtmlFiles(DIST_DIR);
	const brokenLinks = [];

	for (const page of pages) {
		const html = readFileSync(page, 'utf-8');
		const $ = cheerio.load(html);

		$('a[href]').each((_, element) => {
			const href = $(element).attr('href');

			// Skip external links, anchors, and mailto
			if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
				return;
			}

			// Resolve relative links
			let targetPath = href;
			if (!targetPath.startsWith('/')) {
				const pagePath = page.replace(DIST_DIR, '');
				const pageDir = dirname(pagePath);
				targetPath = join(pageDir, href);
			}

			// Normalize path
			targetPath = targetPath.replace(/^\//, '');
			if (!targetPath.endsWith('.html') && !targetPath.includes('.')) {
				targetPath = join(targetPath, 'index.html');
			}

			const fullPath = join(DIST_DIR, targetPath);
			if (!existsSync(fullPath)) {
				brokenLinks.push({ from: page.replace(DIST_DIR, ''), to: href });
			}
		});
	}

	if (brokenLinks.length === 0) {
		pass('No broken internal links found');
	} else {
		fail(`Found ${brokenLinks.length} broken internal link(s)`);
		brokenLinks.slice(0, 5).forEach((link) => {
			log(`  ${link.from} -> ${link.to}`, 'yellow');
		});
		if (brokenLinks.length > 5) {
			log(`  ... and ${brokenLinks.length - 5} more`, 'yellow');
		}
	}
}

// Test 5: Validate RSS feed
function testRssFeed() {
	section('Test 5: RSS Feed');
	const rssPath = join(DIST_DIR, 'rss.xml');

	if (!existsSync(rssPath)) {
		fail('rss.xml not found');
		return;
	}

	const xml = readFileSync(rssPath, 'utf-8');

	// Basic XML validation
	if (xml.includes('<?xml') && xml.includes('<rss')) {
		pass('RSS feed is valid XML');
	} else {
		fail('RSS feed has invalid XML structure');
		return;
	}

	// Check for required RSS elements
	const $ = cheerio.load(xml, { xmlMode: true });
	if ($('channel > title').length > 0) {
		pass('RSS feed has title');
	} else {
		fail('RSS feed missing title');
	}

	if ($('channel > description').length > 0) {
		pass('RSS feed has description');
	} else {
		fail('RSS feed missing description');
	}

	const items = $('item').length;
	if (items > 0) {
		pass(`RSS feed has ${items} item(s)`);
	} else {
		fail('RSS feed has no items');
	}
}

// Test 6: Check blog posts exist
function testBlogPosts() {
	section('Test 6: Blog Posts');
	const blogDir = join(DIST_DIR, 'blog');

	if (!existsSync(blogDir)) {
		fail('blog/ directory not found');
		return;
	}

	const entries = readdirSync(blogDir).filter((entry) => {
		const path = join(blogDir, entry);
		return statSync(path).isDirectory() && entry !== 'index.html';
	});

	if (entries.length > 0) {
		pass(`Found ${entries.length} blog post(s)`);
	} else {
		fail('No blog posts found');
	}

	// Check each blog post has an index.html
	for (const entry of entries.slice(0, 5)) {
		const indexPath = join(blogDir, entry, 'index.html');
		if (existsSync(indexPath)) {
			pass(`Blog post "${entry}" has index.html`);
		} else {
			fail(`Blog post "${entry}" missing index.html`);
		}
	}
}

// Test 7: Check newsletter signup is present
function testNewsletterSignup() {
	section('Test 7: Newsletter Signup');
	const blogFiles = getAllHtmlFiles(join(DIST_DIR, 'blog')).filter(
		(f) => !f.endsWith('blog/index.html')
	);

	if (blogFiles.length === 0) {
		log('  No blog posts to check', 'yellow');
		return;
	}

	const samplePost = blogFiles[0];
	const html = readFileSync(samplePost, 'utf-8');

	if (html.includes('buttondown.com')) {
		pass('Newsletter signup found in blog posts');
	} else {
		fail('Newsletter signup not found in blog posts');
	}
}

// Helper: Get all HTML files recursively
function getAllHtmlFiles(dir, files = []) {
	if (!existsSync(dir)) return files;

	const entries = readdirSync(dir);
	for (const entry of entries) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) {
			getAllHtmlFiles(path, files);
		} else if (entry.endsWith('.html')) {
			files.push(path);
		}
	}
	return files;
}

// Run all tests
function runTests() {
	log('\n🚀 Running pre-publish tests...\n', 'blue');

	if (!testDistExists()) {
		log('\n❌ Build not found. Run "npm run build" first.\n', 'red');
		process.exit(1);
	}

	testKeyPagesExist();
	testPageStructure();
	testInternalLinks();
	testRssFeed();
	testBlogPosts();
	testNewsletterSignup();

	// Summary
	section('Summary');
	log(`Passed: ${passed}`, 'green');
	log(`Failed: ${failed}`, failed > 0 ? 'red' : 'reset');

	if (failed > 0) {
		log('\n❌ Tests failed. Fix issues before publishing.\n', 'red');
		process.exit(1);
	} else {
		log('\n✅ All tests passed! Site is ready to publish.\n', 'green');
		process.exit(0);
	}
}

runTests();
