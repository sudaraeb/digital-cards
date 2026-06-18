/* Shared "Share via QR" modal — used by both the directory and card pages.
   Shared logic — do not edit. Call window.DCC.shareQr({ url, title, subtitle }). */
(function () {
  window.DCC = window.DCC || {};

  window.DCC.shareQr = function (opts) {
    opts = opts || {};
    var url = opts.url || window.location.href;
    var title = opts.title || document.title || 'Share';
    var subtitle = opts.subtitle || 'Scan to open this page';
    var img = 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=' +
      encodeURIComponent(url);

    var overlay = document.createElement('div');
    overlay.className = 'qr-overlay';
    overlay.innerHTML =
      '<div class="qr-modal" role="dialog" aria-modal="true" aria-label="Share">' +
        '<button class="qr-close" type="button" aria-label="Close">&times;</button>' +
        '<h2 class="qr-title">' + esc(title) + '</h2>' +
        '<p class="qr-sub">' + esc(subtitle) + '</p>' +
        '<div class="qr-img"><img src="' + esc(img) + '" alt="QR code for ' + esc(title) + '"></div>' +
        '<p class="qr-link">' + esc(url.replace(/^https?:\/\//, '')) + '</p>' +
        '<button class="btn primary full" type="button" id="qrShare">' +
          (navigator.share ? '📤 Share link' : '🔗 Copy link') +
        '</button>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    var qrImg = overlay.querySelector('.qr-img img');
    if (qrImg) qrImg.addEventListener('error', function () {
      qrImg.parentNode.innerHTML =
        '<span class="qr-fallback">Couldn’t load the QR image. Use the link below to share.</span>';
    });

    function close() {
      document.body.style.overflow = '';
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.qr-close').addEventListener('click', close);

    var shareBtn = overlay.querySelector('#qrShare');
    shareBtn.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({ title: title, text: title, url: url }).catch(function () {});
      } else {
        copyText(url, shareBtn);
      }
    });
  };

  function copyText(text, btn) {
    function done() {
      var old = btn.innerHTML;
      btn.innerHTML = '✓ Copied';
      setTimeout(function () { btn.innerHTML = old; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      ta.remove();
    }
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
