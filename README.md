# Lena: personal site

For now not hosted anywhere just a preview to fill in. Open `index.html` in a browser.

## Files
- `index.html`: page structure and all copy
- `styles.css`: design tokens (colours and fonts at the top in `:root`), layout, responsive rules
- `script.js`: mobile menu, scroll reveals, publication filter, copy-email button, animated "memory network" in the hero

## Navigation
Each section is a tab (About, Current research, Projects,
Publications), and clicking the name opens the home tab. Tabs can be linked
directly (e.g. `index.html#projects`).

## Pictures
Put images in the `pics/` folder using these exact names (until a file exists, a
labelled placeholder appears in its spot):

| File | Where it shows |
|---|---|
| `pics/elena.jpg` | Home tab, portrait (tall, ~4:5) |
| `pics/about.jpg` | About tab (tall, ~4:5) |
| `pics/omr.jpg` | Projects → Open Memory Robot |
| `pics/codesign.jpg` | Projects → Co-designed Robot Memory |
| `pics/bookworm.jpg` | Projects → The Robot Bookworm |
| `pics/humor.jpg` | Projects → Fitting Humor |

To use .png or other names, change the matching `src="pics/…"` in `index.html`.

## Sections
1. **About**: research framing, background, interests
2. **Current research**: the newest omr project with some pics. 
3. **Projects**: Open-Memory Robots, Making memories together, The Robot Bookworm, Fitting Humor
4. **Publications**: papers, filterable by year (from the VU research portal)
5. **Contact**: email, vu website, LinkedIn, orcid

## Replacing placeholders
Everything highlighted in **purple** on the page is a placeholder (`<span class="ph">…</span>`).
Replace the text and remove the `ph` class. Search `index.html` for `class="ph` to find them all.

Also update:
- `href="#"` links (GitHub, papers, Scholar, CV…)
- the email in `mailto:` and `data-copy` in the contact section
- the illustrative pictures for the projects

## Customising the look
Colours live at the top of `styles.css`: `--bg` (gray background), `--purple` (buttons and highlights).
The font is DM Sans, loaded from Google Fonts.
