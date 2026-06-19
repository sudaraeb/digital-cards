/* ============================================================
   ★★★  THIS IS THE ONLY FILE YOU EDIT FOR THIS COMPANY  ★★★
   ------------------------------------------------------------
   COMPANY INFO  — shown at the top of the directory page.
   ============================================================ */
window.COMPANY = {
  name: 'Romblon Health Care Systems Inc.',
  tagline: 'Practicing passion with compassion',
  // Logo: a file in the photos/ folder (e.g. 'photos/logo.png')
  //       OR a full link (e.g. 'https://example.com/logo.png').
  //       Leave as '' to show no logo.
  logo: 'photos/rhsi_with text.png',
  // Services: shown as chips on the directory and on each card.
  //           Add or remove items freely (keep the commas between them).
  services: []
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
    id: 'jose',                                  // unique, used in the link: card.html?id=jose
    name: 'JOSE ANTONIO MERCADO RIVERA MD',      // full name shown on the card
    firstName: 'Jose Antonio',
    middleName: 'Mercado',
    lastName: 'Rivera',
    title: 'Project Manager / Vice President',
    company: 'Romblon Health Care Systems Inc.',
    email: 'romblonhealthcaresystems@gmail.com',
    phones: ['+639084459121'],                   // one or more, comma separated
    website: '',
    photo: 'photos/coco.jpg',                                   // file inside the photos/ folder

    // ADDRESSES — one { ... } block per location. Each becomes a tappable
    // link on the card that opens Google Maps / the phone's map app.
    // "label" is optional (e.g. 'Head Office'). You can fill the structured
    // street/city/region/postalCode/country fields (best for the saved
    // contact), or just write a single "address" line — either works.
    //
    // For a PINPOINT map location, also add lat + lng (decimal degrees).
    // When present, the map link uses the exact coordinates instead of
    // searching the address text. To get them: open Google Maps, right-click
    // the spot, and click the "lat, lng" numbers at the top to copy.
    //   Example:  lat: 14.5995, lng: 120.9760
    addresses: [
      {
        label: 'Main Office',
        street: 'E&E Bldg, Tablas Circumferential Rd, Brgy Dapawan',
        city: 'San Agustin',
        region: 'Romblon',
        postalCode: '5501',
        country: 'Philippines',
        lat: '',   // e.g. 14.5995  (leave '' to search by address text)
        lng: ''    // e.g. 120.9760
      },
      {
        label: 'Clark Office',
        street: 'Unit A, Villa de Oro Grande, Rio Grande de Pampanga',
        city: 'Clark Freeport Zone',
        region: 'Pampanga',
        postalCode: '2023',
        country: 'Philippines',
        lat: '',
        lng: ''
      },
      {
        label: 'Quezon City Office',
        street: '33 Maginhawa Street, Sikatuna Village',
        city: 'Quezon City',
        region: 'Metro Manila',
        postalCode: '1101',
        country: 'Philippines',
        lat: '',
        lng: ''
      }
    ]
  }

  // ,{  <-- remove the // and copy a block above to add the next person
  //   id: 'john',
  //   name: 'JOHN DELA CRUZ',
  //   ...
  // }

];
