/**
 * Type definitions for the design review system
 * Based on data-model.md specification
 */

/**
 * @typedef {Object} Viewport
 * @property {number} width - Viewport width (375 | 768 | 1920)
 * @property {number} height - Actual rendered height (varies by content)
 * @property {string} label - Viewport label ("mobile" | "tablet" | "desktop")
 */

/**
 * @typedef {Object} ScreenshotArtifact
 * @property {string} pageId - Page identifier (e.g., "homepage", "about")
 * @property {string} pageName - Human-readable page name
 * @property {string} url - Full URL captured
 * @property {Viewport} viewport - Viewport information
 * @property {string} filePath - Absolute path to temp file
 * @property {string} fileName - File name (e.g., "homepage-desktop-1920x1080.png")
 * @property {number} fileSize - File size in bytes
 * @property {'png'} format - Image format (always PNG)
 * @property {string} timestamp - ISO 8601 timestamp
 * @property {boolean} captureSuccess - True if captured successfully
 * @property {number} captureAttempts - Number of capture attempts (1-3)
 * @property {string} [error] - Error message if captureSuccess is false
 */

/**
 * @typedef {Object} PageDefinition
 * @property {string} id - Page identifier
 * @property {string} name - Human-readable name
 * @property {string} path - URL path
 */

/**
 * @typedef {Object} ViewportConfig
 * @property {number} width - Viewport width in pixels
 * @property {number} height - Viewport height in pixels
 * @property {string} label - Viewport label
 */

module.exports = {};
