# Rutvij Reddy Vakati | Data Analytics Engineer Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, Framer Motion, and Tailwind CSS.

## Features

- Animated loading screen with "RUTVIJ" in blue
- Blue & pitch black theme
- Scroll-triggered sidebar navigation (pops out when scrolling)
- Featured projects with GitHub/Output links
- Work experience carousel (Archents, Pullulate, NSIC)
- Technical skills from resume
- Education & certifications
- Contact form with LinkedIn, GitHub, Email, Phone
- Fully responsive (mobile, tablet, desktop)
- Resume PDF download

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

## Push to Existing GitHub Repo

```bash
cd /Users/vakatirutvijreddy/Projects/rutvij-portfolio

# Initialize git (if not already)
git init

# Add remote (your existing repo)
git remote add origin https://github.com/rutvij1407/RUTVIJ_PORTFOLIO_.git

# Add all files
git add .

# Commit
git commit -m "Updated portfolio with resume data, projects, experience, skills"

# Push to main
git branch -M main
git push -u origin main
```

If the repo already has content and you want to overwrite:

```bash
git push -u origin main --force
```

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LoadingScreen.tsx
│   ├── NavXian.tsx
│   ├── Projects.tsx
│   ├── SidebarNav.tsx
│   ├── Skills.tsx
│   ├── TopMenuBar.tsx
│   └── ScrollUp.tsx
├── public/
│   └── assets/
│       ├── img/
│       └── pdf/
│           └── Rutvij_Resume.pdf
└── package.json
```

## Contact

- **Email:** rvakati@gmu.edu
- **Phone:** +1 (703) 499-1275
- **LinkedIn:** [vakati-rutvij-reddy](https://linkedin.com/in/vakati-rutvij-reddy)
- **GitHub:** [rutvij1407](https://github.com/rutvij1407)
- **Location:** Fairfax, VA, USA

---

© 2025 Vakati Rutvij Reddy. All rights reserved.