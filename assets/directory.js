/* Renders a company's contact directory from window.COMPANY + window.CONTACTS.
   Shared logic — do not edit. Edit data.js in the company folder instead. */
(function () {
  var company = window.COMPANY || { name: 'Contacts', tagline: '' };
  var contacts = window.CONTACTS || [];

  var head = document.getElementById('dirHead');
  if (head) {
    head.innerHTML =
      (company.logo ? '<img class="brand-logo" src="' + esc(company.logo) + '" alt="' + esc(company.name) + ' logo" onerror="this.style.display=\'none\'">' : '') +
      '<p class="eyebrow">Digital Calling Cards</p>' +
      '<h1>' + esc(company.name) + '</h1>' +
      (company.tagline ? '<p>' + esc(company.tagline) + '</p>' : '') +
      (company.services && company.services.length
        ? '<ul class="chips">' + company.services.map(function (s) {
            return '<li>' + esc(s) + '</li>';
          }).join('') + '</ul>'
        : '');
  }
  document.title = company.name + ' | Contacts';

  var grid = document.getElementById('dirGrid');
  if (!grid) return;

  if (!contacts.length) {
    grid.outerHTML = '<div class="empty">No contacts yet. Add one in <strong>data.js</strong>.</div>';
    return;
  }

  contacts.forEach(function (c) {
    var a = document.createElement('a');
    a.className = 'tile';
    a.href = 'card.html?id=' + encodeURIComponent(c.id);
    var thumb = c.photo
      ? '<img class="thumb" src="' + esc(c.photo) + '" alt="' + esc(c.name) + '">'
      : '<span class="thumb">' + esc(initials(c.name)) + '</span>';
    a.innerHTML =
      thumb +
      '<span class="meta">' +
        '<h2>' + esc(c.name) + '</h2>' +
        '<p>' + esc(c.title || '') + '</p>' +
      '</span>' +
      '<span class="go">&rarr;</span>';
    grid.appendChild(a);
  });

  function initials(name) {
    return String(name || '?').trim().split(/\s+/).slice(0, 2)
      .map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
