# Pre-Publish Tests

Simple, lean automated tests to validate the site before publishing.

## Running Tests

```bash
# Run tests on existing build
npm run test

# Build and test together
npm run prepublish
```

## What Gets Tested

### 1. Build Output
- Checks that `dist/` folder exists
- Ensures build completed successfully

### 2. Key Pages
- Verifies essential pages exist:
  - `index.html` (home)
  - `about/index.html`
  - `blog/index.html`
  - `rss.xml`

### 3. Page Structure
- Each page has `<title>` tag
- Meta description present
- Favicon linked

### 4. Internal Links
- Scans all HTML files for broken internal links
- Reports any links pointing to non-existent pages
- Ignores external links and anchors

### 5. RSS Feed
- Valid XML structure
- Required elements present (title, description)
- Contains blog post items

### 6. Blog Posts
- Blog posts directory exists
- Each post has `index.html`
- Reports total count

### 7. Newsletter Signup
- Buttondown integration present in blog posts

## Exit Codes

- `0` - All tests passed
- `1` - One or more tests failed

## Adding New Tests

Edit `tests/pre-publish.js` and add a new test function following the pattern:

```javascript
function testNewFeature() {
  section('Test N: Feature Name');

  if (condition) {
    pass('Test description');
  } else {
    fail('Test description');
  }
}
```

Then call it in `runTests()`.

## Dependencies

- `cheerio` - HTML/XML parsing
- `html-validator` - HTML validation (currently unused but available)

Keep it lean - avoid heavy testing frameworks for simple checks.
