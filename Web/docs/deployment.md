# Deploying to GitHub Pages (with a custom domain)

Replace the placeholders as you go:

| Placeholder | Meaning | Example |
|---|---|---|
| `YOUR-USERNAME` | GitHub account or organisation | `blackhawk-academy` |
| `YOUR-REPO` | Repository name | `website` |
| `YOUR-DOMAIN` | The domain you own | `blackhawkacademy.com` |

---

## 1. Put the site in a GitHub repository

**Important:** `index.html` must sit at the **top level** of the repository, not inside a `Web/` folder.

### Option A: upload through the GitHub website (no tools needed)
1. Sign in to GitHub. Click **+ → New repository**, give it a name, choose **Public** and click **Create repository**.
2. On the new, empty repository page, click **uploading an existing file**.
3. Open the `Web` folder in Finder, select **everything inside it** (Cmd + A) and drag it into the browser.
   The folders `assets`, `css`, `docs`, `en` and `js` keep their structure.
4. Hidden files: also drag in `.nojekyll`. In Finder, press **Cmd + Shift + .** to show hidden files.
   This file is optional; the site works without it.
5. Click **Commit changes**.

Limits of the web uploader: 100 files per upload and 25 MB per file. This site is about 40 files, and the largest is the 12.5 MB video.

### Option B: command line
```bash
cd Web
git init
git add .
git commit -m "Black Hawk Academy website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## 2. Turn on GitHub Pages

1. On GitHub, open the repository, then **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

The empty `.nojekyll` file tells GitHub to serve the files exactly as they are.

## 3. Connect your own domain

### 3a. Tell GitHub the domain
**Settings → Pages → Custom domain**: enter `www.YOUR-DOMAIN` (or `YOUR-DOMAIN`) and save.
GitHub commits a `CNAME` file to the repository. Pull it before your next push:
```bash
git pull
```

**Recommended:** verify the domain under your GitHub **account/organisation Settings → Pages → Add a domain**.
This stops anyone else from claiming it.

### 3b. Add DNS records at your domain registrar
Sign in where you bought the domain (GoDaddy, Namecheap, Cloudflare, etc.) and open its DNS settings.

**For the root domain (`YOUR-DOMAIN`), four `A` records:**

| Type | Name/Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Optional IPv6 (`AAAA`, host `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

**For `www`:**

| Type | Name/Host | Value |
|---|---|---|
| CNAME | `www` | `YOUR-USERNAME.github.io` |

Remove any old `A`/`CNAME` records for `@` or `www` that point somewhere else, such as a parking page.
If you use Cloudflare, set these records to **DNS only** (grey cloud) until HTTPS is working.
DNS changes can take from a few minutes up to 24–48 hours.

### 3c. Enable HTTPS
When **Settings → Pages** shows that the DNS check passed, tick **Enforce HTTPS**.
The certificate can take up to an hour to appear.

## 4. After the domain is live: finish the SEO details

In **both** `index.html` and `en/index.html`:

1. Uncomment the `canonical` / `hreflang` block in `<head>` and replace `YOUR-DOMAIN`.
2. Change `og:image` to the absolute address `https://YOUR-DOMAIN/assets/images/brand/og-image.jpg`.
   Social networks cannot read relative image paths.
3. Set `domain` in `js/config.js`.

Create `sitemap.xml` in the repository root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://YOUR-DOMAIN/</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://YOUR-DOMAIN/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://YOUR-DOMAIN/en/"/>
  </url>
  <url>
    <loc>https://YOUR-DOMAIN/en/</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://YOUR-DOMAIN/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://YOUR-DOMAIN/en/"/>
  </url>
</urlset>
```

Then uncomment the `Sitemap:` line in `robots.txt`, and optionally submit the sitemap in Google Search Console.

## 5. Updating the site later

Edit files locally and preview them (`python3 -m http.server 8000`).
Then either drag the changed files onto the repository page on GitHub (**Add file → Upload files**; same-named files are replaced), or run:

```bash
git add .
git commit -m "Describe the change"
git push
```

GitHub Pages redeploys automatically within a minute or two. Hard-refresh the browser (Cmd/Ctrl + Shift + R) if you still see the old version.

## 6. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Page loads but has no styling or images | A path starts with `/`. Every path in this project is relative (`css/…`, `../assets/…`), so keep new paths relative too. |
| An image works locally but not online | GitHub is case-sensitive: `Hero.JPG` ≠ `hero.jpg`. Match the file name exactly. |
| Custom domain stops working after a push | The `CNAME` file was deleted or overwritten. Run `git pull` before pushing, or re-enter the domain in Settings → Pages. |
| "Enforce HTTPS" is greyed out | DNS has not finished propagating, or the records are wrong. Re-check step 3b and wait. |
| Social preview shows no image | `og:image` is still relative. See step 4. |
| Changes don't appear | Wait 1–2 minutes and hard-refresh. Check the **Actions** tab for the Pages deployment status. |

Never commit passwords, API keys or private files. Everything in this repository is public.
