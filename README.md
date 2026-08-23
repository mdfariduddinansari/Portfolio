# MD Fariduddin Ansari — Developer Portfolio

A premium, dark, animated single-page portfolio built with React, TypeScript, and Vite — presenting MD Fariduddin Ansari's full-stack skills, two selected projects (ShopiKart and Interactive Music Player), internship experience, and education to recruiters.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for dev server and production builds
- **lucide-react** for icons
- Hand-written CSS (`src/styles/main.css`) — no CSS framework dependency
- A small installable PWA layer (manifest, service worker, offline page)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Install and run

```bash
npm install
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open it in your browser. Edits to any file in `src/` hot-reload instantly.

### Production build

```bash
npm run build
```

This outputs a static, deployable site to `dist/`. You can preview the production build locally with:

```bash
npx vite preview
```

## Project structure

```text
index.html                  # Page shell, meta tags, manifest link, favicon
package.json                 # Scripts and dependencies
vite.config.ts                # Vite + React plugin config
tsconfig.json / tsconfig.node.json
public/
├── manifest.json            # PWA manifest
├── service-worker.js         # Offline caching (registered from src/main.tsx)
├── offline.html              # Offline fallback page
├── install-prompt.js         # "Add to Home Screen" banner
└── resume/
    └── MD-Fariduddin-Ansari-Resume.pdf
src/
├── main.tsx                 # React bootstrap + service worker registration
├── App.tsx                  # Page content, navigation, state, all sections
├── components/
│   ├── CaseStudyDialog.tsx   # ShopiKart case study modal (accessible)
│   ├── ProjectMockups.tsx     # CSS-rendered ShopiKart & music player previews
│   └── SectionHeading.tsx     # Reusable eyebrow/title/description heading
├── lib/
│   └── utils.ts              # `cn()` class-name helper
└── styles/
    └── main.css               # All design tokens, layout, and component styles
```

## Things you'll likely want to customize

- **Project links** — `SHOPIKART_GITHUB_URL`, `SHOPIKART_LIVE_URL`, `MUSIC_PLAYER_GITHUB_URL`, and `MUSIC_PLAYER_LIVE_URL` near the top of `src/App.tsx` are intentionally left blank. Add real URLs once the projects are deployed/published; until then the UI shows a "configure URL" placeholder instead of a broken link.
- **Resume** — replace `public/resume/MD-Fariduddin-Ansari-Resume.pdf` with an updated file of the same name, or update the path used in the hero's "Download resume" button in `src/App.tsx`.
- **Content** — skills, experience, and education are defined as plain data near the top of `src/App.tsx` (`skillGroups`, `coreSkills`, and the Experience/Education sections further down).

## Progressive Web App

The site can be installed like an app:

- `public/manifest.json` defines the name, icons, and theme color.
- `public/service-worker.js` is registered from `src/main.tsx` (production builds only) and caches static assets for offline use, falling back to `public/offline.html` when navigation fails offline.
- `public/install-prompt.js` shows a small, dismissible "Install" banner when the browser fires `beforeinstallprompt`.

PWA install prompts and service workers require HTTPS (or `localhost`). To test the offline behavior locally after building:

```bash
npm run build
npx vite preview
```

Then, in Chrome DevTools → Application → Service Workers, you can simulate offline mode.

## Deployment

The build output in `dist/` is a static site and can be deployed anywhere that serves static files:

- **Vercel** — import the repo, framework preset "Vite", no extra config needed.
- **Netlify** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — run `npm run build`, then publish the contents of `dist/` (e.g. via the `gh-pages` package or a GitHub Actions workflow).

## Content accuracy

All content reflects only what MD Fariduddin Ansari has provided — no invented companies, metrics, testimonials, or years of experience. Missing details (like project URLs) are left as clearly-labeled placeholders rather than guessed at.

## License

MIT
