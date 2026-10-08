# Shri Chidambar Gurukul Sports Academy – Website

Upload everything in this folder to a GitHub repo (root), then Settings → Pages → Deploy from branch → main / root.

## Edit details (script.js, top of file, SITE_CONFIG)
- Phone: `phone` + `phoneDisplay`; second number `phone2` + `phone2Display`; contact person `contactPerson`. WhatsApp: `whatsapp` (91XXXXXXXXXX, no + or spaces).
- Address: `address`. Google Maps: paste your exact share link into `googleMaps` (until then Directions uses an address search).
- Social: `instagram`, `facebook`, `youtube` (empty = link goes to Contact).
- Form: paste a Formspree/EmailJS-style endpoint in `formEndpoint`. If empty, the form opens WhatsApp with the details pre-filled (no fake backend).

## Logo
Replace `images/logo/logo.webp` (and `favicon.png` in the root) with the same file names.

## Images
Replace any file in `images/` using the SAME file name, or add new files and list them in `ACHIEVEMENTS` / `GALLERY` in script.js (title, event, year, student, category).
Folders: hero, sports, training, achievements, gallery, school, logo. Use WebP, max ~1400px wide.

## Name spelling
Site uses "Shri Chidambar Gurukul Sports Academy" as on the academy's own banners. Change it in script.js, and in the title/meta tags in index.html if needed.
