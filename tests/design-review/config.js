/**
 * Configuration for design review screenshot capture
 * Based on spec.md requirements
 */

/**
 * Viewport configurations for responsive testing
 * Spec requires: 375px (mobile), 768px (tablet), 1920px (desktop)
 */
const VIEWPORTS = [
  {
    width: 375,
    height: 812,  // iPhone X height
    label: 'mobile'
  },
  {
    width: 768,
    height: 1024, // iPad height
    label: 'tablet'
  },
  {
    width: 1920,
    height: 1080, // Full HD
    label: 'desktop'
  }
];

/**
 * Pages to capture for design review
 * Spec requires: homepage, about, blog index, at least one blog post
 */
const PAGES = [
  {
    id: 'homepage',
    name: 'Homepage',
    path: '/'
  },
  {
    id: 'about',
    name: 'About Page',
    path: '/about'
  },
  {
    id: 'blog-index',
    name: 'Blog Index',
    path: '/blog'
  },
  {
    id: 'blog-post-welcome',
    name: 'Blog Post: Welcome',
    path: '/blog/welcome'
  }
];

/**
 * Base URL for the website
 * Can be overridden via environment variable or CLI argument
 */
const BASE_URL = process.env.DESIGN_REVIEW_URL || 'https://www.warren4.co.uk';

/**
 * Playwright navigation timeout (milliseconds)
 * Spec requires: retry on timeout with exponential backoff
 */
const NAVIGATION_TIMEOUT = 30000; // 30 seconds

/**
 * Screenshot stabilization delay (milliseconds)
 * Allows animations and dynamic content to settle
 */
const STABILIZATION_DELAY = 1000; // 1 second

/**
 * Retry configuration
 * Spec requires: 2 retries with exponential backoff (1s, 2s)
 */
const RETRY_CONFIG = {
  maxAttempts: 3, // Initial attempt + 2 retries
  delays: [1000, 2000] // Exponential backoff: 1s, 2s
};

export {
  VIEWPORTS,
  PAGES,
  BASE_URL,
  NAVIGATION_TIMEOUT,
  STABILIZATION_DELAY,
  RETRY_CONFIG
};
