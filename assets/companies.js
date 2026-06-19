/* ============================================================
   COMPANY LIST  (for the main landing page only)
   ------------------------------------------------------------
   To add a NEW company:
     1. Copy the "companies/jltcb" folder and rename it (e.g. "acme").
     2. Edit data.js inside the new folder.
     3. Add one line below copying the JLTCB block.
   Each company also works on its own without being listed here.
   ============================================================ */
window.COMPANIES = [
  {
    id: 'jltcb',                 // = the folder name inside /companies
    name: 'JLTCB',               // shown on the landing page
    tagline: 'Health & Wellness Global Trade Division',
    logo: 'https://jltcb.com/wp-content/uploads/2024/09/Mask-group.png'   // small image (optional, leave '' for initials)
  },
  {
    id: 'romblon',              // = the folder name inside /companies
    name: 'Romblon Health Care Systems Inc.',
    tagline: 'Practicing passion with compassion',
    logo: 'photos/rhsi_with text.png'                     // small image (optional, leave '' for initials)
  }

  // ,{ id: 'acme', name: 'Acme Corp', tagline: 'Sales Team', logo: '' }
];
