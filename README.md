# Portfolio — Alex Iacoboni

Personal portfolio website for Alex Iacoboni, Computer Science student focused on backend development and cybersecurity. Built as a static multi-page site — no framework, no build step.

**Live site:** https://alexiacoboni.github.io/portfolio/

---

## Pages

| Page | Description |
|---|---|
| `index.html` | Home — hero intro, featured project, tech stack overview |
| `about.html` | Background, skills, timeline/experience |
| `projects.html` | Full project list: Cybersecurity Learning Platform, ATM Banking System, Troll Game, Legends of Eternia |
| `contact.html` | Contact links (GitHub, LinkedIn, Email) + contact form |

---

## Featured Projects

- **[Cybersecurity Learning Platform](https://github.com/alexiacoboni/Cybersecurity-Learning-Platform)** — educational Flask app simulating SQL Injection, XSS and Brute Force attacks against vulnerable vs. secure implementations
- **[Troll Game](https://github.com/alexiacoboni/TrollGame)** — minimalist black-and-white platformer, packaged as a desktop app with Electron
- **ATM Banking System** — simulated banking dashboard built with Flask and MySQL
- **Legends of Eternia** — 2D RPG built with vanilla HTML/CSS/JavaScript

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS (custom, no framework), responsive via `responsive.css` |
| Behaviour | Vanilla JavaScript |
| Fonts | Google Fonts (Inter) |
| Icons | Inline SVG sprite + [Simple Icons](https://simpleicons.org) CDN |
| Contact form | [Formspree](https://formspree.io) |
| Hosting | GitHub Pages |

---

## Project Structure

```
portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── main.js
├── images/
│   └── projects/           # per-project screenshots, one subfolder per project
├── icons/
│   └── favicon.svg
├── assets/
│   └── cv.pdf
└── README.md
```

---

## Features

- **Multi-page navigation** with active-link highlighting based on the current URL
- **Mobile menu** with overlay, keyboard/click-outside close behaviour
- **Scroll reveal animations** via `IntersectionObserver`, with a no-JS fallback
- **Header shadow + back-to-top button**, both driven by a single throttled scroll listener
- **Contact form** with progressive enhancement — works via a plain HTML POST even if JavaScript fails, and shows inline success/error messages when JS is available
- **Spam protection** via an invisible honeypot field
- **SEO/meta tags** — Open Graph and Twitter Card tags on every page for link previews
- **Downloadable CV** button in the navbar and mobile menu

---

## Running Locally

No build step or dependencies required — it's static HTML/CSS/JS.

```bash
git clone https://github.com/alexiacoboni/portfolio.git
cd portfolio
```

Open `index.html` directly in a browser, or serve it locally (recommended, avoids relative-path quirks) with any static server, e.g. the VS Code **Live Server** extension, or:

```bash
python -m http.server 5500
```

Then visit `http://127.0.0.1:5500`.

---

## Contact Form Setup

The form in `contact.html` posts to Formspree:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

To make it functional:
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy its endpoint
3. Replace `YOUR_FORM_ID` in `contact.html` with your real form ID

---

## Deployment

Hosted via **GitHub Pages**, deployed from the `main` branch, root folder:

1. Repo → **Settings → Pages**
2. **Source:** Deploy from a branch → `main` → `/ (root)`
3. Save — the site publishes to `https://alexiacoboni.github.io/portfolio/`

Any push to `main` redeploys automatically within a couple of minutes.

---

## License

Specify your license here (e.g. MIT).
