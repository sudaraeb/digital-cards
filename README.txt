DIGITAL CALLING CARDS — HOW TO USE
==================================

Every company lives in its own folder under /companies.
You only ever edit ONE file per company: data.js

FOLDER LAYOUT
-------------
index.html .................. main landing page (lists all companies)
assets/ ..................... shared look + logic (do NOT edit)
assets/companies.js ......... the list shown on the landing page
companies/jltcb/ ............ one company
    data.js ................. ★ EDIT THIS — company info + contacts
    photos/ ................. put each person's photo here
    index.html .............. that company's directory (do NOT edit)
    card.html ............... single card page (do NOT edit)


ADD A NEW PERSON (to an existing company)
-----------------------------------------
1. Put the photo in that company's  photos/  folder (e.g. john.png).
2. Open  data.js  in that company's folder.
3. Copy one whole { ... } block, paste it, and change the details.
4. Give the person a unique "id" (lowercase, no spaces).
5. Save / commit on GitHub. Done — it appears automatically.


ADD A NEW COMPANY
-----------------
1. Copy the folder  companies/jltcb  and rename it (e.g. companies/acme).
2. Edit  data.js  inside the new folder (company name + contacts).
3. Replace the photos in its  photos/  folder.
4. Open  assets/companies.js  and copy the JLTCB line, change id/name.
   (A company still works on its own even if you skip this step.)


COMPANY LOGO
------------
In a company's data.js, set the "logo" value to either:
  - a file in its photos/ folder ....  logo: 'photos/logo.png'
  - or a full web link .............  logo: 'https://site.com/logo.png'
Leave it as ''  to show no logo.
The logo appears on that company's directory header and on each card.
(The "logo" in assets/companies.js is only the small icon on the
 main landing page — you can set both to the same link.)


PUBLISH + QR CODES
------------------
1. Upload the whole folder to GitHub, then turn on GitHub Pages
   (Settings > Pages > deploy from main branch).
   Cloudflare Pages or Netlify also work.

2. Your links will look like:
   - All companies:     https://YOURNAME.github.io/REPO/
   - One company:       https://YOURNAME.github.io/REPO/companies/jltcb/
   - One person's card: https://YOURNAME.github.io/REPO/companies/jltcb/card.html?id=anna

3. Make a QR code from any of those links
   (e.g. qr-code-generator.com or qrcode.tec-it.com) and print/share it.

The "Save Contact" button downloads a .vcf file that saves straight
into the phone's contacts, including the online photo.


TIP: COMMAS MATTER in data.js
-----------------------------
Each person block ends with }  and blocks are separated by a comma:
    { ...person A... },
    { ...person B... }
The last person has NO comma after it. If a page looks blank, a missing
or extra comma is almost always the cause.
