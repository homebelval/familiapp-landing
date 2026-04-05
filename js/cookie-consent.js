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
      '<div style="max-width:860px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:16px;justify-content:space-between;">',
        '<p style="margin:0;font-size:.9rem;line-height:1.5;flex:1;min-width:200px;">',
          '🍪 Nous utilisons des cookies pour analyser l\'audience et améliorer votre expérience. ',
          '<a href="/privacy/" style="color:#a78bfa;text-decoration:underline;">En savoir plus</a>',
        '</p>',
        '<div style="display:flex;gap:10px;flex-shrink:0;">',
          '<button id="cookie-refuse" style="',
            'background:transparent;border:1px solid rgba(255,255,255,.4);color:#fff;',
            'padding:8px 18px;border-radius:8px;cursor:pointer;font-size:.85rem;font-family:inherit;',
            'transition:background .2s;">Refuser</button>',
          '<button id="cookie-accept" style="',
            'background:#7c3aed;border:none;color:#fff;',
            'padding:8px 20px;border-radius:8px;cursor:pointer;font-size:.85rem;font-weight:600;font-family:inherit;',
            'transition:background .2s;">Accepter</button>',
        '</div>',
      '</div>'
    ].join('');

    banner.style.cssText = [
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;',
      'background:rgba(15,10,30,.96);backdrop-filter:blur(8px);',
      'color:#fff;padding:16px 24px;',
      'box-shadow:0 -4px 24px rgba(0,0,0,.3);',
      'animation:cookieSlideUp .3s ease;'
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
