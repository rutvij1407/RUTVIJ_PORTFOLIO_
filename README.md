# Rutvij Reddy Vakati | Data Analytics Engineer Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, Framer Motion, and Tailwind CSS.

## Features

- Intro animation: the RUTVIJ wordmark, then a swarm of cursors "builds" the page while it auto scrolls (skip with `?nointro`; respects reduced motion)
- Hero with a 3D scene, About with a glass portrait, and a scroll driven numbers band
- Analytics lab section that presents career impact, projects by domain and tools per role as live charts
- Experience timeline, featured projects with GitHub and live links, skills, education and certifications
- Top menu bar plus a sidebar nav that appears on scroll, scroll progress bar and cursor glow
- Contact section and resume PDF download
- Fully responsive (mobile, tablet, desktop)

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons

## Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project** → Import your repository
4. Vercel auto-detects Next.js
5. Click **Deploy**

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

## Project Structure

```
├── app/               layout, page and global styles
├── components/        one file per section (Hero, About, Dashboard, Experience,
│                      Projects, Skills, Education, Contact, Footer), navigation,
│                      AgentBuild intro, effects and chart helpers
├── public/assets/     images and Rutvij_Resume.pdf
└── package.json
```

## Contact

- **Email:** rvakati@gmu.edu
- **Phone:** +1 (703) 499-1275
- **LinkedIn:** [vakati-rutvij-1167rutvij](https://linkedin.com/in/vakati-rutvij-1167rutvij)
- **GitHub:** [rutvij1407](https://github.com/rutvij1407)
- **Location:** Fairfax, VA, USA

---

© 2026 Rutvij Reddy Vakati. All rights reserved.