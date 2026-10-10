# Black Hawk Academy — Website

**أكاديمية بلاك هوك · Train • Protect • Lead**

A cinematic, black-and-gold, bilingual (Arabic RTL + English) static website.
Plain HTML, CSS and vanilla JavaScript: no frameworks, no build step and no server.
It runs on GitHub Pages as-is.

| Page | Path |
|---|---|
| Arabic (default) | `index.html` |
| English | `en.html` |
| Not found | `404.html` |

---

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000> for Arabic and <http://localhost:8000/en.html> for English.
(Double-clicking `index.html` also works. A local server is closer to how GitHub Pages behaves.)

---

## Where things are

Every file sits at the top level, with no subfolders. That way the GitHub website uploader (drag and drop) always keeps the site working.

| File(s) | What it is |
|---|---|
| `index.html` | Arabic page (all sections + icon sprite) |
| `en.html` | English page (same structure) |
| `404.html` | Self-contained "page not found" |
| `style.css`, `animations.css`, `responsive.css` | Design, motion, phone/tablet layouts |
| `config.js` | **Contact details, phones, map, social links, video, announcement** |
| `data.js` | **The 14 missions + instructor profiles** (Arabic + English) |
| `main.js`, `navigation.js`, `animations.js` | Behaviour (no need to edit) |
| `emblem*.png/.webp`, `og-image.jpg`, `favicon-32.png`, `icon-512.png`, `apple-touch-icon.png` | Logo, icons, social-share image |
| `ahmed-hassan-abdelshafi.webp`, `mohamed-abdelbasset.webp`, `ahmed-sayed.webp`, `nermeen-ahmed-saeed.webp` | Instructor portraits |
| `academy-interview.mp4`, `academy-interview-poster.webp` | Film section video |
| `precision-target*.webp/.jpg` | About-section photo |
| `deployment.md` | GitHub Pages + custom domain guide |

**New images or videos go next to `index.html`.** Then refer to them by file name only (e.g. `image: 'new-trainer.webp'`).

Addresses: Arabic `…/`, English `…/en.html`.

---

## Editing content

### Contact details, enquiry button, social links → `js/config.js`
Fill in the empty strings. **Anything left empty stays hidden**, so the site never shows a broken link.

* Every **Enquire Now** button follows this order: `enquiryUrl`, then WhatsApp, then email, then the Contact section.
* Phone numbers live in `contact.phones`; each one becomes its own tap-to-call card and footer line.
* WhatsApp: digits only, with the country code (e.g. `201XXXXXXXXX`).
* The contact section shows a tidy "coming soon" panel until at least one detail is set.

### Missions → `js/data.js` → `missions`
The 14 missions are taken word-for-word from *"أكاديمية بلاك هوك - مهام المركز.pptx"*, with English translations.
Each mission has `title`, `summary`, `role`, `axes` (training tracks) and `outcomes`, in `ar` and `en`.
`icon` refers to a `<symbol id="i-…">` in the sprite at the top of each HTML page.

> Note: in the presentation, mission 03 has no separate title, only the line *"التفاوض يحسم المواقف الحساسة بالحوار"*.
> The site uses **التفاوض** as the title and that line as the summary.

### Instructors → `js/data.js` → `instructors`
Four profiles: Brig. Ahmed Hassan Abdel-Shafi (General Manager of the Center), Staff Maj. Gen. (Ret.) Dr. Mohamed Abdel-Basset (Advisor to the Center),
Col. (Ret.) Ahmed Sayed and Dr. Nermeen Ahmed Saeed (Panel of Experts). The text is as supplied by the Academy, with English translations.
Each profile has `name`, `badge` (label on the photo), `role`, `bio`, `qualifications`, `specializations` and an optional `years` (shown as "+20 years of experience").

To add someone:
1. Add a portrait next to `index.html` (**640 × 800 px or larger, 4:5**, WebP or JPG). Crop out any text banners and keep the face in the upper third.
2. Copy an existing object in `instructors`, then fill in both `ar` and `en`.

The order in the file is the order on the page. Delete an object to remove a card.

### Facility photos → `index.html` and `en.html`, section `#environment`
Each tile has a commented-out `<img>` line. Put the photo next to `index.html`, uncomment the line, set `src` to its file name and write a real `alt` description.
Tiles with photos open in an accessible lightbox automatically.
Once photos are added, delete the "photos coming soon" note under the grid.
Use only real photographs of the Academy here.

### Film → `js/config.js` → `video`
The section plays `academy-interview.mp4`: the supplied WhatsApp video, re-encoded for the web
(1280×720 H.264, *faststart*, 12.5 MB, 3:22). It downloads only when a visitor presses play.
To replace it, put a new MP4 next to `index.html` and update `src`, `poster` and `duration`. Compress it first, for example:
```bash
ffmpeg -i original.mp4 -c:v libx264 -preset slow -crf 30 -vf "scale=1280:-2" -c:a aac -b:a 96k -movflags +faststart new-film.mp4
```
Keep each file under **25 MB** if you upload through the GitHub website.

### Announcement bar → `js/config.js` → `announcement`
Change the text, or set `enabled: false`. Change `id` whenever the text changes so visitors who closed the old one see it again.

### Page text
Section text lives directly in `index.html` (Arabic) and `en.html` (English). Edit both when you change wording.

---

## Status

Done: logo, 14 missions, 4 instructor profiles with photos, filmed interview, phones (010 6860 0700 and 011 0366 9668), location map, Instagram, Facebook.

Still optional / to add later:
- [ ] **WhatsApp number**: once set in `js/config.js`, every "Enquire Now" button opens a WhatsApp chat (right now they scroll to the contact section)
- [ ] Email address, opening hours, written street address
- [ ] Photographs of facilities / training (to replace the six designed tiles in "Training Environment")
- [ ] Final domain name (for canonical URLs, social previews and the sitemap; see `deployment.md`)
- [ ] Privacy policy page (optional, `privacyUrl`)

## Design & motion notes

* **Palette:** black `#080909`, surfaces `#131414`, gold `#C6A45B` / `#E7CB86` / bronze `#80652E`, text `#F5F3ED`.
* **Type:** Noto Kufi Arabic (Arabic display), IBM Plex Sans Arabic / IBM Plex Sans (body), Saira (Latin display, wordmark).
  All are free Google Fonts under the SIL Open Font License.
* **Logo animation:** a gold line traces the shield, the hawk emerges from a blur, a light sweep crosses the metal every few seconds and the eye glints.
  A seal ring with the motto slowly rotates, rays turn behind, embers drift upward and the crest follows the pointer slightly on desktop.
  The intro is CSS-only and never blocks the content.
* **Accessibility:** semantic landmarks, skip link, keyboard-operable mission tabs (arrows / Home / End), native `<dialog>` with focus return,
  visible focus rings, and a full `prefers-reduced-motion` fallback (everything visible, nothing moving).
* **Sources:** the emblem was cut out of the supplied logo image. The target photograph comes from the supplied presentation.
  Instructor portraits were cropped from the supplied poster images.
  The original source files are kept outside this folder, in `../BlackHawk-source-files/`, and are not part of the website.

Deployment: see **[deployment.md](deployment.md)**.
