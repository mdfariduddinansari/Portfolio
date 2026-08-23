# Fariduddin Developer Portfolio

A premium single-page React portfolio for MD Fariduddin Ansari, presenting full-stack skills and two selected projects through an animated, recruiter-focused experience.

## Masterplan

- Position MD Fariduddin Ansari as an Information Technology graduate and full-stack developer building responsive, scalable web applications.
- Give recruiters a fast path from the hero statement to skills, selected work, internship experience, education, and contact details.
- Make **ShopiKart** the portfolio centerpiece with a visual product preview and expandable architecture-focused case study.
- Use polished interaction design—without unsupported claims, fabricated metrics, or invented project URLs.
- Keep the site accessible, mobile-responsive, and respectful of `prefers-reduced-motion`.

## Tech Stack & Architecture

- **React + TypeScript** with Vite entry setup.
  - `src/main.tsx` mounts `<App />` in `StrictMode` and registers `public/service-worker.js` in production builds.
  - `src/App.tsx` owns page content, navigation, interaction state, observers, and section composition.
- **CSS-first styling** in `src/styles/main.css`.
  - No CSS framework — the UI is entirely custom CSS classes and variables. (Tailwind was previously imported but unused; it has been removed as dead weight.)
- **Lucide React** supplies interface icons such as navigation, contact, media, playback, and project icons.
- No backend, database, API routes, CMS, router, or external runtime integration exists. This is a static SPA, deployable to any static host.
- The public resume is served directly from:
  - `public/resume/MD-Fariduddin-Ansari-Resume.pdf`
  - Reference it as `/resume/MD-Fariduddin-Ansari-Resume.pdf`.
- Animation and interaction patterns are implemented with browser APIs and CSS:
  - `IntersectionObserver` for active navigation and `.reveal` entrance states.
  - `matchMedia('(prefers-reduced-motion: reduce)')` disables rotating roles and 3D tilt behavior where applicable.
  - CSS handles ambient background drift, hover effects, cursor presentation, and responsive transitions.
- State is local to `App.tsx`; do not add a global store for this static portfolio.
  - `activeNav`, `menuOpen`, `caseStudyOpen`
  - Music mockup state: `musicPlaying`, `musicAutoplay`, `musicProgress`, `musicVolume`
  - Hero role rotation: `roleIndex`

## File Structure

```text
index.html                                  # SEO description, theme color, manifest link, favicon, root mount node.
package.json                                # Project scripts and installed React/Vite/UI dependencies.
public/
├── manifest.json                           # PWA manifest (name, icons, theme colors).
├── service-worker.js                       # Offline caching, registered from src/main.tsx.
├── offline.html                            # Offline fallback page shown by the service worker.
├── install-prompt.js                       # Dismissible "Add to Home Screen" banner.
└── resume/
    └── MD-Fariduddin-Ansari-Resume.pdf     # Resume downloaded/opened from the hero CTA.
src/
├── main.tsx                                # React/Vite bootstrap; imports global stylesheet; registers service worker.
├── App.tsx                                 # Main single-page portfolio, content data, state, navigation, observers.
├── components/
│   ├── CaseStudyDialog.tsx                 # Accessible ShopiKart modal with Escape, focus trap, focus return.
│   ├── ProjectMockups.tsx                  # CSS-rendered ShopiKart browser and interactive music-player previews.
│   └── SectionHeading.tsx                  # Reusable eyebrow/title/description section heading.
├── lib/
│   └── utils.ts                            # `cn()` conditional class-name helper.
└── styles/
    └── main.css                            # Design tokens, layout, all component styles, animation, responsive rules.
tsconfig.json                               # Strict TypeScript configuration for browser source.
tsconfig.node.json                          # TypeScript configuration for Vite config.
vite.config.ts                              # Vite setup with the React plugin.
```

**Note:** `public/` files are served at the site root by Vite (dev and build) — anything referenced by an absolute path like `/manifest.json` must live inside `public/`, not the repo root.

## Key Features

### Single-page section navigation

- The header uses anchor-style scrolling through `scrollToId()` in `src/App.tsx`; section IDs must match lowercase navigation labels:
  - `home`, `about`, `skills`, `projects`, `experience`, `education`, `contact`
- `IntersectionObserver` updates the active desktop navigation pill as sections enter the viewport.
- Desktop navigation is fixed at the top.
- Mobile uses a full-screen off-canvas menu controlled by `menuOpen`.
- The mobile close button receives focus after closing via `closeMenuTrigger`; preserve this behavior if modifying the menu.

### Hero

- Displays the name, animated role list, tagline, work CTA, and resume CTA.
- Roles are sourced from the `roles` constant in `src/App.tsx`.
- Role cycling runs every 2400 ms unless reduced motion is enabled.
- Resume CTA must keep using `/resume/MD-Fariduddin-Ansari-Resume.pdf`; do not replace it with an invented URL.

### About, skills, education, and experience

- Skills are data-driven from `skillGroups` and `coreSkills` in `src/App.tsx`.
- Do not introduce percentage bars, proficiency scores, years of experience, certifications, awards, testimonials, or statistics not supplied by the owner.
- Experience is intentionally limited to:
  - **CodeAlpha**
  - **Frontend Development Intern**
  - **July 2025**
- Education is intentionally limited to:
  - **Techno International New Town**
  - B.Tech in Information Technology
  - 2022–2026
  - Affiliated to MAKAUT

### Projects

Only two projects are shown:

1. **ShopiKart** — featured full-stack e-commerce and rental platform.
   - Preview is rendered by `ShopiKartMockup()` in `src/components/ProjectMockups.tsx`.
   - The preview is CSS-generated and illustrative; it is not a live product embed.
   - “View case study” opens `CaseStudyDialog.tsx`.
   - Case study describes the fixed architecture:
     `User → React → Redux Toolkit → REST API → Express / Node → MongoDB`
   - The dialog must remain accessible:
     - `role="dialog"` and `aria-modal`
     - Escape-to-close
     - click-backdrop-to-close
     - keyboard focus trapping
     - restore focus to the trigger after close

2. **Interactive Music Player**
   - Preview is rendered by `MusicMockup()`.
   - Play/pause, autoplay, timeline scrub, and volume controls update visual local state only.
   - There is no audio engine or media playback; do not imply actual playback support without adding an audio implementation.

Project external URLs are deliberately unconfigured constants in `src/App.tsx`:

```ts
const SHOPIKART_GITHUB_URL = ''
const SHOPIKART_LIVE_URL = ''
const MUSIC_PLAYER_GITHUB_URL = ''
const MUSIC_PLAYER_LIVE_URL = ''
```

`ProjectLink` renders an explicit “configure URL” disabled label for blank values. Populate only verified URLs. Do not invent GitHub or deployment links.

### Contact and footer

- Contact details are direct external actions:
  - Email: `mdfariduddinansari786@gmail.com`
  - Phone: `+91 62909 77513`
  - GitHub: `https://github.com/mdfariduddinansari`
  - LinkedIn: `https://linkedin.com/in/md-fariduddin-ansari-a481a5326`
- Footer repeats the professional identity and key social/contact links.

## Design Guidelines

- **Visual direction:** dark, futuristic, professional editorial portfolio—not a Bootstrap-style template.
- **Core colors** are CSS variables in `src/styles/main.css`:
  - Background: `#090b10`
  - Surface/card: `#11151e`
  - Foreground: `#f1f5fb`
  - Muted text: `#a8b1c1`
  - Primary cyan: `#73ddff`
  - Ring/focus cyan: `#8de4ff`
  - Destructive pink: `#ff8292`
- Background atmosphere combines fixed blurred blue/cyan ambient shapes and a faint grid overlay.
- Typography uses the system/Inter stack defined on `:root`; hero type is oversized, tightly tracked, and uses an outlined surname treatment.
- Use cyan for interactive emphasis, section eyebrows, active indicators, and select glows. Avoid adding unrelated accent palettes.
- Glass/translucent surfaces are reserved for navigation and select panels; keep them subtle.
- Layout widths use `min(..., calc(100% - ...))` patterns to retain spacious desktop framing while preventing overflow.
- Responsive behavior is CSS-driven. Preserve:
  - desktop pill navigation,
  - mobile full-screen menu,
  - stacking/reflow of hero, cards, mockups, and contact content,
  - `min-width: 320px` body support.
- Avoid horizontal overflow. The root `.site-shell` uses `overflow: clip`; do not rely on this to hide broken layouts.
- Preserve visible keyboard focus styles defined for buttons and links.
- The custom cursor only activates for `pointer: fine`; do not force it on touch devices.

## App Flow

1. **Landing**
   - User arrives at `#home`, sees identity, rotating role, work CTA, and resume download/open CTA.
2. **Explore work**
   - “Explore My Work” scrolls to `#projects`.
   - ShopiKart supports visual hover/tilt interaction and opens an expanded case study.
   - Project GitHub/live links remain visibly unavailable until verified URLs are configured.
3. **Evaluate fit**
   - User scrolls through About, grouped skills, internship timeline, and education.
   - Active desktop navigation updates based on visible section.
4. **Contact**
   - Contact CTAs open mail, phone, GitHub, or LinkedIn destinations.
5. **Mobile**
   - User opens the menu, selects a section, and the menu closes before smooth scrolling.
6. **Reduced-motion users**
   - Role cycling and pointer tilt are suppressed. CSS animation behavior must continue to honor the existing reduced-motion rules in `main.css`.

## Conventions

- Use TypeScript function components and named local prop interfaces, as in `CaseStudyDialogProps`, `MusicMockupProps`, and `SectionHeadingProps`.
- Keep static portfolio content near the top of `src/App.tsx` when it directly drives a section (`navItems`, `roles`, `skillGroups`).
- Reuse `SectionHeading` for section heading consistency instead of duplicating eyebrow/title markup.
- Use `cn()` from `src/lib/utils.ts` for conditional class names; it filters falsy class entries.
- Keep project mockup UI in `src/components/ProjectMockups.tsx`, not inline in `App.tsx`.
- Keep all styling in `src/styles/main.css`. Match existing class-based CSS; do not mix in large Tailwind utility blocks unless the styling approach is intentionally migrated.
- Use semantic sections and meaningful accessible labels for non-text controls and visual-only previews.
- Buttons that trigger in-page behavior must use `type="button"`.
- External links should use `target="_blank"` with `rel="noreferrer"`, matching `ProjectLink`.
- For a new section:
  1. Add its display label to `navItems` if it should be navigable.
  2. Add a `<section id="...">` inside the existing `<main>` in `src/App.tsx`.
  3. Set matching `data-nav` text so the intersection observer can activate the correct nav item.
  4. Use `section-pad`, `reveal`, and `SectionHeading` where appropriate.
  5. Add responsive CSS to `src/styles/main.css`.
  6. Test keyboard navigation, mobile layout, reduced motion, and no-overflow behavior.

## Local development

This is a standard npm/Vite project — no special runtime or hosting platform is required.

```bash
npm install
npm run dev      # local dev server with HMR
npm run build    # production build to dist/
```

The project has no backend, database, or server-side API. All contact actions (`mailto:`, `tel:`) and external links (GitHub, LinkedIn) resolve directly in the browser.
