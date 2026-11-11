# Elena Malnatsky: personal research site (design)

A static, single-page site design. No build step. Open `index.html` in a browser.

## Files
- `index.html`: page structure and all copy
- `styles.css`: design tokens (colours and fonts at the top in `:root`), layout, responsive rules
- `script.js`: mobile menu, scroll reveals, publication filter, copy-email button, animated "memory network" in the hero

## Navigation
The page doesn't scroll. Each section is a tab (About, Current research, Projects,
Publications, Get in touch), and clicking the name opens the home tab. Tabs can be linked
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
1. **Hero**: positioning statement and key facts
2. **About**: research framing, background, interests
3. **Current research**: the unpublished project (marked *in progress*), a diagram showing how it builds on Open Memory Robot and Co-designed Robot Memory, research questions, and a timeline
4. **Projects**: Open-Memory Robots, Co-designed Robot Memory, The Robot Bookworm, Fitting Humor
5. **Publications**: Elena's papers, filterable by year (from the VU research portal)
6. **Contact**: email, Scholar, GitHub, LinkedIn, CV

## Replacing placeholders
Everything highlighted in **purple** on the page is a placeholder (`<span class="ph">…</span>`).
Replace the text and remove the `ph` class. Search `index.html` for `class="ph` to find them all.

Also update:
- `href="#"` links (GitHub, papers, Scholar, CV…)
- the email in `mailto:` and `data-copy` in the contact section
- the research questions (RQ1–3) and timeline years, so they match the real study
- the illustrative memory example and co-design quotes in the project visuals, if you want them to reflect real material

## Customising the look
Colours live at the top of `styles.css`: `--bg` (gray background), `--purple` (buttons and highlights).
The font is DM Sans, loaded from Google Fonts.
