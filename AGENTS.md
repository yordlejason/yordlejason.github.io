# Repository Guidelines

## Project Structure & Module Organization
Source SCSS lives in `scss/` (partials prefixed with `_` feed `resume.scss`), and compiled output is committed to `css/`. JavaScript for interactions resides in `js/`, with minified bundles alongside their sources. Core HTML entry points are `index.html` for production and `test.html` for quick experiments. Static assets live under `icons/` and `vendor/` for third-party libraries. `build.sh` mirrors the npm build and is handy for CI-style scripting.

## Build, Test, and Development Commands
Use `npm run build` to compile `scss/resume.scss` into `css/resume.css` and `css/resume.min.css`, and to minify `js/resume.js`. Run `npm run watch` while iterating on styles; it keeps `scss/` and `css/` in sync. `npm run serve` launches a lightweight HTTP server on port 8000 so you can verify layout and interactions in a browser. For scripted pipelines, `./build.sh` performs the same Sass and Uglify steps.

## Coding Style & Naming Conventions
Stick with two-space indentation across SCSS, HTML, and JS to match the existing files. SCSS partials use dashed filenames (e.g., `_custom-styles.scss`) and component blocks favor Bootstrap-compatible class names; when adding custom selectors, follow the `resume-` prefix pattern. Keep JavaScript modular inside `js/resume.js`, grouping behavior by section, and prefer semantic HTML with ARIA attributes when updating markup.

## Testing Guidelines
There is no automated test suite, so rely on the build output and manual verification. Before pushing, run `npm run build` to ensure Sass compilation and JS minification succeed without warnings. Use `npm run serve` and check key sections (navigation, section anchors, timeline animations) in at least Chrome and Safari. When adding assets, confirm they are optimized and referenced correctly in `index.html`.

## Commit & Pull Request Guidelines
Follow the existing history: concise, imperative summaries such as “Update job title formatting” or “Refactor visibility toggle functionality.” Squash incidental work so each commit maps to a focused change. For pull requests, provide a short narrative of the change, link any relevant issue, and include before/after screenshots for visible updates. Note any manual checks performed (build, browser smoke test) in the PR description to speed reviews.
