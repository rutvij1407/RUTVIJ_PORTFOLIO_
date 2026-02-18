# GitHub Issues for Portfolio Improvements

Copy each issue below and create it in your repo: **https://github.com/rutvij1407/RUTVIJ_PORTFOLIO_/issues/new**

---

## Issue 1: Mobile-first responsive layout audit

**Title:** Mobile-first responsive layout audit across all breakpoints

**Description:**
The portfolio should behave consistently across phones, tablets, and desktops. Currently, some sections may not adapt well to different aspect ratios (portrait vs landscape) and screen sizes.

**Tasks:**
- [ ] Audit all sections at breakpoints: 320px, 375px, 414px, 768px, 1024px, 1440px
- [ ] Fix overflow/horizontal scroll on small viewports
- [ ] Ensure touch targets are ≥44px on mobile (nav icons, buttons, links)
- [ ] Test sidebar nav and bottom nav on different phone aspect ratios (16:9, 19.5:9, etc.)
- [ ] Verify Certifications grid, Projects cards, and Skills tags wrap correctly on narrow screens
- [ ] Add `overflow-x-hidden` or fix layout where content spills on small devices

**Labels:** `enhancement`, `responsive`, `mobile`

**Priority:** High

---

## Issue 2: Improve accessibility (a11y) compliance

**Title:** Improve accessibility (a11y) for screen readers and keyboard navigation

**Description:**
Make the portfolio accessible to users with disabilities. No content changes—only semantic markup and behavior.

**Tasks:**
- [ ] Add `aria-label` or visible labels to icon-only buttons (nav toggle, scroll up, social links)
- [ ] Ensure all interactive elements are focusable and have visible focus rings
- [ ] Add `skip to main content` link for keyboard users
- [ ] Use semantic HTML: `<main>`, `<nav>`, `<section>`, proper heading hierarchy (h1 → h2 → h3)
- [ ] Add `alt` text to any decorative images or ensure they have `aria-hidden`
- [ ] Check color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Add `prefers-reduced-motion` support to reduce/disable animations for users who prefer it

**Labels:** `accessibility`, `enhancement`

**Priority:** High

---

## Issue 3: Loading performance and Core Web Vitals

**Title:** Optimize loading performance and Core Web Vitals

**Description:**
Improve perceived load time and Lighthouse scores without changing content. Focus on React/Next.js optimizations.

**Tasks:**
- [ ] Lazy-load below-the-fold sections (e.g., `dynamic()` import for Certifications, Projects)
- [ ] Add `loading="lazy"` to any images
- [ ] Reduce Framer Motion bundle impact: consider splitting animations or using CSS where possible
- [ ] Ensure fonts load without layout shift (e.g., `font-display: swap` or `optional`)
- [ ] Run Lighthouse and address LCP, CLS, FID issues
- [ ] Add `sizes` to images if using `next/image`

**Labels:** `performance`, `enhancement`

**Priority:** Medium

---

## Issue 4: Consistent spacing and typography on mobile

**Title:** Consistent spacing and typography across mobile viewports

**Description:**
Section padding, font sizes, and line heights may feel inconsistent on different mobile devices. Standardize without changing copy.

**Tasks:**
- [ ] Use consistent `py-*` / `px-*` for sections across breakpoints (e.g., `py-16 md:py-24`)
- [ ] Ensure body text is readable (min ~16px on mobile, avoid tiny text)
- [ ] Fix any cramped cards or overlapping text on small screens
- [ ] Add `min-height` or safe-area padding for devices with notches
- [ ] Test in both portrait and landscape orientation

**Labels:** `enhancement`, `responsive`, `mobile`

**Priority:** Medium

---

## Issue 5: Navigation UX improvements

**Title:** Improve navigation UX on mobile and desktop

**Description:**
Enhance how users move between sections, especially on phones where screen real estate is limited.

**Tasks:**
- [ ] Add smooth scroll behavior: `scroll-behavior: smooth` or programmatic scroll
- [ ] Highlight active section in both sidebar and bottom nav based on scroll position
- [ ] Consider collapsing or simplifying bottom nav on very small screens (e.g., show fewer items or use a hamburger)
- [ ] Ensure nav doesn’t overlap content; add padding/margin so sections aren’t hidden under fixed nav
- [ ] Test nav visibility when keyboard is open on mobile (e.g., in Contact form)

**Labels:** `enhancement`, `ux`, `responsive`

**Priority:** Medium

---

## Issue 6: Dark/light mode or theme toggle

**Title:** Add optional theme toggle (dark/light or system preference)

**Description:**
Support user preference for light or dark mode. Portfolio is currently dark—add a toggle and light variant.

**Tasks:**
- [ ] Add theme state (e.g., `Context` or `localStorage`)
- [ ] Create light theme CSS variables / Tailwind classes
- [ ] Add toggle button in header or nav
- [ ] Respect `prefers-color-scheme` on first load
- [ ] Persist choice in `localStorage`

**Labels:** `enhancement`, `feature`

**Priority:** Low

---

## Issue 7: Error and edge-case handling

**Title:** Improve error handling and edge-case behavior

**Description:**
Handle network failures, slow connections, and missing data gracefully. No content changes—only robustness.

**Tasks:**
- [ ] Add error boundary for React errors (e.g., wrap main content)
- [ ] Ensure 404 page (`not-found.tsx`) has clear “Go home” CTA and matches design
- [ ] If any data is fetched async, add loading and error states
- [ ] Test with slow 3G in DevTools
- [ ] Ensure CountUp and animations don’t break if JS fails (progressive enhancement)

**Labels:** `enhancement`, `bug`

**Priority:** Low

---

## Issue 8: Form and Contact UX on mobile

**Title:** Improve Contact form UX on mobile devices

**Description:**
Forms on mobile need proper input types, sizing, and keyboard behavior.

**Tasks:**
- [ ] Use correct `input type` (email, tel, etc.) for better mobile keyboards
- [ ] Ensure form fields are large enough for touch (min height ~44px)
- [ ] Add proper `autocomplete` attributes
- [ ] Prevent zoom on focus for inputs with `font-size: 16px` (iOS)
- [ ] Fix any layout issues when virtual keyboard is visible
- [ ] Add clear success/error feedback for form submission

**Labels:** `enhancement`, `mobile`, `ux`

**Priority:** Medium

---

## Issue 9: Cross-browser testing and fallbacks

**Title:** Cross-browser testing and CSS/JS fallbacks

**Description:**
Ensure consistent behavior in Chrome, Safari, Firefox, and Edge. Add fallbacks where needed.

**Tasks:**
- [ ] Test in Safari (iOS and macOS) for flex/grid quirks
- [ ] Check `backdrop-filter` support and fallbacks
- [ ] Verify Framer Motion works or degrades gracefully
- [ ] Add `-webkit-` prefixes if needed for older Safari
- [ ] Test scroll behavior and sticky/fixed elements
- [ ] Document any known limitations in README

**Labels:** `enhancement`, `testing`

**Priority:** Low

---

## Issue 10: Animations and reduced motion support

**Title:** Add prefers-reduced-motion support for animations

**Description:**
Some users prefer minimal motion. Respect `prefers-reduced-motion: reduce` without removing all interactivity.

**Tasks:**
- [ ] Detect `prefers-reduced-motion` via media query or JS
- [ ] Disable or simplify Framer Motion animations when reduced motion is preferred
- [ ] Use `@media (prefers-reduced-motion: reduce)` for CSS animations
- [ ] Keep essential UX (e.g., hover states) but reduce duration/scale
- [ ] Test with OS setting: System Preferences → Accessibility → Display → Reduce motion

**Labels:** `accessibility`, `enhancement`

**Priority:** Medium

---

## How to use

1. Go to: https://github.com/rutvij1407/RUTVIJ_PORTFOLIO_/issues/new
2. Copy the **Title** and **Description** (including checkboxes) for each issue
3. Add labels if they exist in your repo (or create them)
4. Create issues over time (e.g., 2–3 per week) to keep the repo active
5. Close issues as you implement them and reference commits in the issue

---

*Generated for keeping your portfolio repo active and improving React/Next.js skills.*
