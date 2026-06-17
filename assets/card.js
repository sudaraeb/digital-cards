/* Renders a single contact card + "Save Contact" (.vcf) download.
   Shared logic — do not edit. Edit data.js in the company folder instead. */
(function () {
  var contacts = window.CONTACTS || [];
  var company = window.COMPANY || {};
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var c = contacts.find(function (x) { return x.id === id; }) || contacts[0];

  var mount = document.getElementById('card');
  if (!mount) return;
  if (!c) {
    mount.innerHTML = '<div class="body"><h1>Contact not found</h1>' +
      '<a class="back" href="index.html">&larr; Back to directory</a></div>';
    return;
  }

  document.title = c.name + ' | Digital Calling Card';
  var photoAbs = c.photo ? new URL(c.photo, window.location.href).href : '';
  var cardUrl = window.location.href;
  var phones = c.phones || [];

  var telBtns = phones.map(function (p) {
    return '<a class="btn" href="tel:' + p.replace(/\s/g, '') + '">📞 Call</a>';
  }).join('');

  var avatar = c.photo
    ? '<img class="avatar" src="' + esc(c.photo) + '" alt="' + esc(c.name) + '">'
    : '<span class="avatar avatar-fallback">' + esc(initials(c.name)) + '</span>';
  mount.innerHTML =
    '<div class="card-head">' +
      (company.logo ? '<img class="card-logo" src="' + esc(company.logo) + '" alt="' + esc(company.name || '') + ' logo" onerror="this.style.display=\'none\'">' : '') +
      avatar +
      '<div class="id">' +
        '<h1>' + esc(c.name) + '</h1>' +
        '<p class="title">' + esc(c.title || '') + '</p>' +
      '</div>' +
    '</div>' +
    '<div class="body">' +
      (c.company ? '<p class="company">' + esc(c.company) + '</p>' : '') +
      '<div class="actions">' +
        telBtns +
        (c.email ? '<a class="btn" href="mailto:' + esc(c.email) + '">✉️ Email</a>' : '') +
        (c.website ? '<a class="btn" href="' + esc(c.website) + '" target="_blank" rel="noopener">🌐 Website</a>' : '') +
        '<button class="btn primary full" type="button" id="saveBtn">⬇️ Save Contact</button>' +
      '</div>' +
      '<div class="details">' +
        (c.email ? '<p><strong>Email</strong><br>' + esc(c.email) + '</p>' : '') +
        (phones.length ? '<p><strong>Phone</strong><br>' + esc(phones.join(' / ')) + '</p>' : '') +
        (c.website ? '<p><strong>Website</strong><br>' + esc(c.website.replace(/^https?:\/\//, '')) + '</p>' : '') +
        (c.address ? '<p><strong>Address</strong><br>' + esc(c.address) + '</p>' : '') +
      '</div>' +
      '<a class="back" href="index.html">&larr; Back to directory</a>' +
    '</div>';

  var saveBtn = document.getElementById('saveBtn');
  if (saveBtn) saveBtn.addEventListener('click', downloadVcard);

  function downloadVcard() {
    var telLines = phones.map(function (p) { return 'TEL;TYPE=CELL:' + p; }).join('\n');
    var vcf =
      'BEGIN:VCARD\nVERSION:3.0\n' +
      'N:' + v(c.lastName) + ';' + v(c.firstName) + ';' + v(c.middleName) + ';;\n' +
      'FN:' + v(c.name) + '\n' +
      (c.company ? 'ORG:' + v(c.company) + '\n' : '') +
      (c.title ? 'TITLE:' + v(c.title) + '\n' : '') +
      (c.email ? 'EMAIL;TYPE=WORK,INTERNET:' + c.email + '\n' : '') +
      (telLines ? telLines + '\n' : '') +
      (c.website ? 'URL:' + c.website + '\n' : '') +
      (photoAbs ? 'PHOTO;VALUE=URI:' + photoAbs + '\n' : '') +
      'ADR;TYPE=WORK:;;' + v(c.street) + ';' + v(c.city) + ';' + v(c.region) + ';' + v(c.postalCode) + ';' + v(c.country) + '\n' +
      'NOTE:Digital card: ' + cardUrl + '\n' +
      'END:VCARD';
    var blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (c.id || 'contact') + '.vcf';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function v(s) {
    return String(s == null ? '' : s)
      .replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function initials(name) {
    return String(name || '?').trim().split(/\s+/).slice(0, 2)
      .map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }
})();
