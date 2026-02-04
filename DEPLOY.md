# Deploy Commands

## Push to GitHub (Existing Repo)

```bash
cd /Users/vakatirutvijreddy/Projects/rutvij-portfolio

git add .
git commit -m "Updated portfolio with resume data, projects, experience, skills"
git push origin main
```

If you need to set up the remote first:

```bash
cd /Users/vakatirutvijreddy/Projects/rutvij-portfolio
git remote add origin https://github.com/rutvij1407/RUTVIJ_PORTFOLIO_.git
git branch -M main
git push -u origin main
```

## Run Locally

```bash
cd /Users/vakatirutvijreddy/Projects/rutvij-portfolio
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy on Vercel

1. Push to GitHub (commands above)
2. Go to https://vercel.com
3. Import project → Select RUTVIJ_PORTFOLIO_ repo
4. Deploy (Vercel auto-detects Next.js)

Your site will be live at `rutvij-portfolio-six.vercel.app` (or your custom domain).
