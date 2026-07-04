# Alex Iacoboni — Portfolio

Multi-page portfolio built with HTML5, CSS3 and Vanilla JavaScript.

## Structure

- `index.html` — Home (hero, about preview, featured project, contact CTA)
- `about.html` — Full about, experience timeline, skills
- `projects.html` — Full project grid
- `contact.html` — Contact cards + working contact form
- `css/style.css` — shared styles (design tokens, components)
- `css/responsive.css` — media queries only
- `js/main.js` — nav, scroll effects, mobile menu, reveal animations, contact form
- `icons/sprite.svg` — self-hosted UI icon set (also inlined per-page)
- `icons/favicon.svg` — site favicon

## Before deploying

1. **Contact form**: replace `YOUR_FORM_ID` in `contact.html` with your real
   Formspree endpoint (sign up free at https://formspree.io).
2. **Domain**: replace `https://alexiacoboni.dev` in every `<meta>`/canonical
   tag across all 4 pages with your real deployed domain.
3. **OG image**: add a real `images/og-image.png` (1200x630px) — referenced
   in meta tags but not yet created.
4. **Assets**: make sure `assets/cv.pdf`, `images/profile.png`, and
   `images/projects/*.png` exist — they're referenced but not included here.
