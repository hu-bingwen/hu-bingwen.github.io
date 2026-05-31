# Personal Photography Website

A clean, editorial personal site with three sections:
- **Work** — photography grid (homepage)
- **Words** — writing & essays
- **About** — self introduction

## File Structure

```
personal-site/
├── index.html        ← Photography homepage
├── words.html        ← Writing list
├── about.html        ← Self introduction
├── posts/
│   └── post1.html    ← Sample post (duplicate for more)
├── images/           ← Put your photos here
│   ├── photo1.jpg … photo7.jpg
│   └── portrait.jpg
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Adding Your Photos

Place your images in the `images/` folder:
- `photo1.jpg` through `photo7.jpg` → gallery on homepage
- `portrait.jpg` → your photo on the About page

Photos will auto-fit to their grid cells. Recommended sizes:
- Regular cells: at least **1200×900px**
- Wide (span-2) cells: at least **1600×900px**
- Portrait: at least **800×1067px**

## Customizing Content

### Change Your Name
Search and replace `Your Name` across all HTML files.

### Add a New Post
1. Duplicate `posts/post1.html`
2. Update the title, date, tag, and body text
3. Add a new `<article>` block in `words.html` pointing to your new file

### About Page
Edit `about.html` — update your city, bio paragraphs, links, and the quote.

## Deploy to GitHub Pages

### First time setup

1. Create a new GitHub repository (e.g. `yourusername.github.io` for a user site, or any name for a project site)

2. Initialize git and push:
```bash
cd personal-site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/REPONAME.git
git push -u origin main
```

3. On GitHub → go to your repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`
   - Click **Save**

4. Your site will be live at:
   - `https://YOURUSERNAME.github.io` (if repo is named `YOURUSERNAME.github.io`)
   - `https://YOURUSERNAME.github.io/REPONAME` (for any other repo name)

### Updating the site

```bash
git add .
git commit -m "Update photos"
git push
```

GitHub Pages will rebuild automatically within ~30 seconds.

## Fonts Used
- **Cormorant Garamond** — headings (served by Google Fonts)
- **Mada** — body text (served by Google Fonts)

Fonts load from Google Fonts CDN; no installation needed.
