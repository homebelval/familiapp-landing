/**
 * Cookie Consent Manager — FamilyApp
 * RGPD/CNIL compliant — chargement conditionnel GTM
 */
(function () {
  var CONSENT_KEY = 'fa_cookie_consent';
  var GTM_ID = 'GTM-MDLG8DBD';

  /* ── Charger GTM ── */
  function loadGTM() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    f.parentNode.insertBefore(j, f);
  }

  /* ── Vérifier consentement existant ── */
  var consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  if (consent === 'accepted') {
    loadGTM();
    return;
  }
  if (consent === 'refused') {
    return; // pas de tracking
  }

  /* ── Afficher la bannière ── */
  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Consentement cookies');
    banner.innerHTML = [
      '<div style="max-width:900px;margin:0 auto;">',
        '<div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:14px;">',
          '<span style="font-size:1.6rem;line-height:1;">🍪</span>',
          '<div>',
            '<p style="margin:0 0 4px;font-size:1rem;font-weight:700;color:#fff;">Respect de votre vie privée</p>',
            '<p style="margin:0;font-size:.875rem;line-height:1.55;color:rgba(255,255,255,.8);">',
              'Nous utilisons des cookies pour mesurer l\'audience et améliorer votre expérience sur FamilyApp. ',
              'Vous pouvez accepter ou refuser leur utilisation. ',
              '<a href="/privacy/" style="color:#a78bfa;text-decoration:underline;white-space:nowrap;">Politique de confidentialité</a>',
            '</p>',
          '</div>',
        '</div>',
        '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;">',
          '<button id="cookie-refuse" style="',
            'background:transparent;border:1.5px solid rgba(255,255,255,.35);color:rgba(255,255,255,.85);',
            'padding:10px 22px;border-radius:10px;cursor:pointer;font-size:.875rem;font-family:inherit;',
            'transition:all .2s;min-width:120px;">Tout refuser</button>',
          '<button id="cookie-accept" style="',
            'background:linear-gradient(135deg,#7c3aed,#6d28d9);border:none;color:#fff;',
            'padding:10px 26px;border-radius:10px;cursor:pointer;font-size:.875rem;font-weight:700;font-family:inherit;',
            'box-shadow:0 4px 14px rgba(124,58,237,.5);transition:all .2s;min-width:120px;">✓ Tout accepter</button>',
        '</div>',
      '</div>'
    ].join('');

    banner.style.cssText = [
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;',
      'background:linear-gradient(135deg,rgba(20,10,40,.97),rgba(30,15,55,.97));',
      'backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);',
      'color:#fff;padding:20px 28px;',
      'box-shadow:0 -6px 32px rgba(0,0,0,.4),0 -1px 0 rgba(124,58,237,.3);',
      'border-top:1px solid rgba(124,58,237,.25);',
      'animation:cookieSlideUp .35s cubic-bezier(.16,1,.3,1);'
    ].join('');

    // Animation CSS
    var style = document.createElement('style');
    style.textContent = '@keyframes cookieSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}';
    document.head.appendChild(style);

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch (e) {}
      loadGTM();
      hideBanner();
    });

    document.getElementById('cookie-refuse').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'refused'); } catch (e) {}
      hideBanner();
    });
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.animation = 'cookieSlideDown .2s ease forwards';
      var style = document.createElement('style');
      style.textContent = '@keyframes cookieSlideDown{to{transform:translateY(100%)}}';
      document.head.appendChild(style);
      setTimeout(function () { banner.remove(); }, 250);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }

  /* ── API publique pour le lien "Gérer les cookies" ── */
  window.faResetCookieConsent = function () {
    try { localStorage.removeItem(CONSENT_KEY); } catch (e) {}
    showBanner();
  };
})();
