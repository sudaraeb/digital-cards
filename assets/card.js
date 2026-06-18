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
  var phones = c.phones || [];
  var addresses = normalizeAddresses(c);

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
      (company.services && company.services.length
        ? '<ul class="chips">' + company.services.map(function (s) {
            return '<li>' + esc(s) + '</li>';
          }).join('') + '</ul>'
        : '') +
      '<div class="actions">' +
        telBtns +
        (c.email ? '<a class="btn" href="mailto:' + esc(c.email) + '">✉️ Email</a>' : '') +
        (c.website ? '<a class="btn" href="' + esc(c.website) + '" target="_blank" rel="noopener">🌐 Website</a>' : '') +
        '<button class="btn full" type="button" id="qrBtn">🔗 Share via QR</button>' +
        '<button class="btn primary full" type="button" id="saveBtn">⬇️ Save Contact</button>' +
      '</div>' +
      '<div class="details">' +
        (c.email ? '<p><strong>Email</strong><br>' + esc(c.email) + '</p>' : '') +
        (phones.length ? '<p><strong>Phone</strong><br>' + esc(phones.join(' / ')) + '</p>' : '') +
        (c.website ? '<p><strong>Website</strong><br>' + esc(c.website.replace(/^https?:\/\//, '')) + '</p>' : '') +
        (addresses.length
          ? '<div class="addr-block"><strong>' + (addresses.length > 1 ? 'Addresses' : 'Address') + '</strong>' +
              addresses.map(function (a) {
                return '<a class="addr-link" href="' + esc(mapsUrl(a)) + '" target="_blank" rel="noopener" ' +
                  'aria-label="Open ' + esc(a.label || a.full) + ' in Maps">' +
                  (a.label ? '<span class="addr-label">' + esc(a.label) + '</span>' : '') +
                  '<span class="addr-text">' + esc(a.full || (a.lat + ', ' + a.lng)) + '</span>' +
                  '<span class="addr-go">📍 Get directions</span>' +
                '</a>';
              }).join('') +
            '</div>'
          : '') +
      '</div>' +
      '<a class="back" href="index.html">&larr; Back to directory</a>' +
    '</div>';

  var saveBtn = document.getElementById('saveBtn');
  if (saveBtn) saveBtn.addEventListener('click', downloadVcard);

  var qrBtn = document.getElementById('qrBtn');
  if (qrBtn) qrBtn.addEventListener('click', function () {
    window.DCC.shareQr({
      url: window.location.href,
      title: c.name,
      subtitle: 'Scan to open this calling card'
    });
  });

  function downloadVcard() {
    var telLines = phones.map(function (p) { return 'TEL;TYPE=CELL:' + p; }).join('\n');
    var adrLines = addresses.map(function (a) {
      var type = 'WORK' + (a.label ? ',' + v(a.label).toUpperCase().replace(/[^A-Z0-9]+/g, '-') : '');
      return 'ADR;TYPE=' + type + ':;;' +
        v(a.street) + ';' + v(a.city) + ';' + v(a.region) + ';' + v(a.postalCode) + ';' + v(a.country);
    }).join('\n');
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
      (adrLines ? adrLines + '\n' : '') +
      'END:VCARD';
    var blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (c.id || 'contact') + '.vcf';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // Build a normalized list of addresses from either the new `addresses`
  // array or the older single-address fields, so both formats keep working.
  function normalizeAddresses(c) {
    var raw = (c.addresses && c.addresses.length)
      ? c.addresses
      : ((c.address || c.street || c.city)
          ? [{ label: '', street: c.street, city: c.city, region: c.region,
               postalCode: c.postalCode, country: c.country, address: c.address }]
          : []);
    return raw.map(function (a) {
      var full = a.address ||
        [a.street, a.city, a.region, a.postalCode, a.country]
          .filter(Boolean).join(', ');
      return {
        label: a.label || '',
        street: a.street, city: a.city, region: a.region,
        postalCode: a.postalCode, country: a.country,
        lat: a.lat, lng: a.lng,
        full: full
      };
    }).filter(function (a) { return a.full || hasCoords(a); });
  }

  function hasCoords(a) {
    return a.lat != null && a.lat !== '' && a.lng != null && a.lng !== '';
  }

  // Universal Maps directions link — opens turn-by-turn navigation FROM the
  // user's current location ("Your location") TO this address. Uses exact
  // lat/lng when provided (pinpoint accuracy), otherwise the address text.
  // Opens the native maps app on phones, Google Maps in the browser on desktop.
  function mapsUrl(a) {
    var dest = hasCoords(a) ? (a.lat + ',' + a.lng) : a.full;
    return 'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent(dest) + '&travelmode=driving';
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
