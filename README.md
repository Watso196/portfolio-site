# Kalib Watson: personal site

Small, durable, no build step. Plain HTML and CSS, plus two small scripts (`js/prefs.js`, `js/site.js`). Everything important works without JavaScript; the scripts add display settings, animations, and the contact email (built by script so it isn't in the page source).

## Structure

- `index.html`: the one-page home (hero, intro, Writings, About me), plus the footer
- `writings/how-my-teams-work.html`: the first writing
- `css/styles.css`: design tokens at the top, then base, header, settings, motion, hero, sections, writing pages
- `js/prefs.js`: loads in `<head>`; applies saved theme/fonts/motion before first paint
- `js/site.js`: settings panel, plain-font size matching, contact email, scroll reveals
- `js/button-demo.js`: the live "Save for later" button on the teams writing (only that page loads it)
- `images/kalib.jpg`: the portrait (800x1000)

## Preview

Open `index.html` directly in a browser, or use VS Code Live Server. With Node: `npx serve` from this folder.

## Adding a writing

1. Copy `writings/how-my-teams-work.html`, change the title, description, and body. Keep the footer (Connect links and copyright) identical on every page, and update the year in all of them.
2. In `index.html`, add an `<li>` to the Writings list (optional teaser: `<span class="teaser">…</span>` after the link).
3. Keep only the 3 most recent in the visible list. Move older ones into the "See all writings" `<details>` block (template is in a comment in `index.html`).

## Before publishing

- Self-host the fonts (Alegreya, Atkinson Hyperlegible; both OFL): add woff2 files in `fonts/`, add `@font-face` rules, then delete the three TEMPORARY Google Fonts lines in each page's `<head>`.
- Internal links end in `index.html` so the site works from disk. Switch to clean paths at deploy time if wanted.
- Add `og:image` and `og:url` once there is a domain.

## Open ideas

- Speaking topics and résumé link in Connect
- Accessibility statement page; 404 page
- Writing about how this site's accessibility choices were made
