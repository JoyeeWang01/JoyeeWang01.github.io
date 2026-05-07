# joyeewang.github.io

Personal website. Pure HTML / CSS / JS — no build step.

## Local preview

Just open `index.html` in a browser, or run a tiny local server so font loading and relative paths behave exactly like production:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

The simplest setup is a **user site** at `https://<your-username>.github.io`.

### One-time setup

1. On GitHub, create a new public repo named exactly `<your-username>.github.io` (e.g. `joyeewang01.github.io`). Leave it empty — no README, no license.
2. From this folder, push:

   ```bash
   git add .
   git commit -m "Initial site"
   git remote add origin git@github.com:<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```

3. On GitHub, go to the repo → **Settings → Pages** and confirm the source is `main` branch / `/ (root)`. It usually auto-detects.
4. Wait ~1 minute. The site goes live at `https://<your-username>.github.io`.

### Updating later

```bash
git add .
git commit -m "Update photos"
git push
```

GitHub rebuilds in ~30 seconds.

## Custom domain (optional)

If you buy a domain (e.g. `joyeewang.com`):

1. Add a `CNAME` file at the repo root containing just the domain: `joyeewang.com`
2. At your domain registrar, point the apex `A` records to GitHub Pages' IPs and add a `CNAME` record for `www` pointing to `<your-username>.github.io`. GitHub's docs walk through this: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site>
3. Enable HTTPS in the repo's Pages settings.

## Files

- `index.html` — content
- `styles.css` — design system
- `script.js` — scroll reveals & nav tracking
- `images/` — drop your photos here (`portrait.jpg`, `singapore.jpg`, `luau.jpg`, `volcano.jpg`, `tree.jpg`)
