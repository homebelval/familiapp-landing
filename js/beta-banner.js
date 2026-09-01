// Lightweight urgency-bar counter for pages other than /beta/ (which has its
// own richer counter script). Fills #urgency-num with the live remaining-spots
// count and hides the whole banner once the beta is full.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js';
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-app-check.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js';

const TOTAL_SPOTS = 50;

function hideBanner() {
  const bar = document.getElementById('urgency-bar');
  if (bar) bar.hidden = true;
  document.documentElement.style.setProperty('--banner-h', '0px');
}

try {
  const app = initializeApp({
    apiKey: 'AIzaSyDKxnkRcsEqrXHjQNiDYuj7cAAmKKEp2Eo',
    projectId: 'family-app-fr',
    appId: '1:625878948688:web:f25ae52de9b8197459aa55'
  });

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LdO2RstAAAAAAMty8QqLdGXCsX2SSNI3RcS-e8r'),
    isTokenAutoRefreshEnabled: true
  });

  const db = getFirestore(app);
  const snap = await getDoc(doc(db, 'beta', 'stats'));
  const taken = snap.exists() ? (snap.data().signupCount ?? 0) : 0;
  const remaining = Math.max(0, TOTAL_SPOTS - taken);

  if (remaining <= 0) {
    hideBanner();
  } else {
    const numEl = document.getElementById('urgency-num');
    if (numEl) numEl.textContent = remaining;
  }
} catch (e) {
  // Firestore unreachable: keep the static "50 places restantes" fallback already in the markup.
  console.error('[Urgency banner] Firestore error:', e);
}
