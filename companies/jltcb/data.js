/* ============================================================
   ★★★  THIS IS THE ONLY FILE YOU EDIT FOR THIS COMPANY  ★★★
   ------------------------------------------------------------
   COMPANY INFO  — shown at the top of the directory page.
   ============================================================ */
window.COMPANY = {
  name: 'JLTCB',
  tagline: 'Health & Wellness Global Trade Division',
  // Logo: a file in the photos/ folder (e.g. 'photos/logo.png')
  //       OR a full link (e.g. 'https://example.com/logo.png').
  //       Leave as '' to show no logo.
  logo: 'https://jltcb.com/wp-content/uploads/2024/09/Mask-group.png',
  // Services: shown as chips on the directory and on each card.
  //           Add or remove items freely (keep the commas between them).
  services: [
    'Customs Brokerage',
    'Logistics',
    'Global Trade Compliance Solutions'
  ]
};

/* ============================================================
   CONTACTS  — one { ... } block per person.
   TO ADD A PERSON:
     1. Put their photo in the  photos/  folder (e.g. john.png).
     2. Copy one whole block below, from {  to },
     3. Paste it, then change the details.
     4. Give each person a unique "id" (lowercase, no spaces).
   Keep the commas exactly as shown: a comma after each "}".
   ============================================================ */
window.CONTACTS = [

  {
    id: 'anna',                                  // unique, used in the link: card.html?id=anna
    name: 'ANNA MARIE M. GANGCUANGCO',           // full name shown on the card
    firstName: 'Anna Marie',
    middleName: 'M.',
    lastName: 'Gangcuangco',
    title: 'Senior Sales Executive — Health & Wellness Global Trade Division',
    company: 'JLTCB',
    email: 'annagangcuanco@jltcb.com',
    phones: ['+639171788213', '+639195070424'], // one or more, comma separated
    website: 'https://www.jltcb.com',
    photo: 'photos/anna.png',                    // file inside the photos/ folder

    // Address (used for the directions / saved contact)
    street: 'Suite 508, Pacific Centre, Quintin Paredes',
    city: 'Binondo',
    region: 'Metro Manila',
    postalCode: '1006',
    country: 'Philippines',
    address: 'Suite 508, Pacific Centre, Quintin Paredes, Binondo, Metro Manila, Philippines 1006'
  }

  // ,{  <-- remove the // and copy a block above to add the next person
  //   id: 'john',
  //   name: 'JOHN DELA CRUZ',
  //   ...
  // }

];
