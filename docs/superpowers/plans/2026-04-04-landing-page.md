# FamilyApp Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire une landing page marketing HTML/CSS/JS vanilla haute qualité pour FamilyApp, hébergée sur Infomaniak, avec design ludique & chaleureux, mockups CSS de l'app, et SEO top niveau.

**Architecture:** Site statique pur (zéro dépendance, zéro build step). Un fichier `index.html` principal structuré sémantiquement, un `css/style.css` organisé par sections avec CSS custom properties comme design system, et un `js/main.js` pour toutes les interactions. SEO via balises meta, schema.org JSON-LD intégrés dans le HTML.

**Tech Stack:** HTML5 sémantique · CSS3 (Grid, Flexbox, custom properties, animations) · JavaScript ES6 vanilla (IntersectionObserver, classList) · Google Fonts Inter · Aucun framework, aucun bundler.

**Spec de référence :** `docs/superpowers/specs/2026-04-04-landing-page-design.md`

---

## Carte des fichiers

| Fichier | Responsabilité |
|---|---|
| `index.html` | Page principale — toutes les sections, meta SEO, schema.org JSON-LD |
| `css/style.css` | Design system (custom properties) + styles de toutes les sections |
| `js/main.js` | Header scroll, menu mobile, FAQ accordion, pricing toggle, IntersectionObserver |
| `register.html` | Page stub — redirige vers l'app React |
| `sitemap.xml` | Index SEO du site |
| `robots.txt` | Directives crawlers |
| `images/favicon.png` | Copié depuis `familiapp-saas/public/` |
| `images/og-image.jpg` | Image Open Graph 1200×630 (placeholder à remplacer) |

---

## Task 1 : Scaffolding du projet

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `register.html`
- Create: `images/` (dossier vide)

- [ ] **Step 1 : Créer la structure des dossiers**

```bash
cd /Users/admin/Developpement/familiapp-landing
mkdir -p css js images terms privacy
```

- [ ] **Step 2 : Copier le favicon depuis l'app**

```bash
cp /Users/admin/Developpement/familiapp-saas/public/favicon.ico images/favicon.ico 2>/dev/null || echo "favicon non trouvé, créer manuellement"
cp /Users/admin/Developpement/familiapp-saas/src/assets/*.png images/ 2>/dev/null || echo "assets non trouvés"
```

- [ ] **Step 3 : Créer `robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://family-app.fr/sitemap.xml
```

- [ ] **Step 4 : Créer `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://family-app.fr/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://family-app.fr/terms/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://family-app.fr/privacy/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 5 : Créer `register.html` (redirect vers l'app)**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=https://app.family-app.fr/signup">
  <title>Inscription — FamilyApp</title>
</head>
<body>
  <p>Redirection en cours… <a href="https://app.family-app.fr/signup">Cliquez ici</a></p>
</body>
</html>
```

- [ ] **Step 6 : Vérifier la structure**

```bash
find /Users/admin/Developpement/familiapp-landing -not -path '*/docs/*' -not -path '*/.git/*' | sort
```

Résultat attendu :
```
.
./css
./images
./js
./privacy
./register.html
./robots.txt
./sitemap.xml
./terms
```

- [ ] **Step 7 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add -A
git commit -m "chore: scaffold project structure"
```

---

## Task 2 : Design system CSS — custom properties & reset

**Files:**
- Create: `css/style.css` (section 1/6 — base)

- [ ] **Step 1 : Écrire le reset et les custom properties dans `css/style.css`**

```css
/* ============================================================
   FamilyApp Landing — Main Stylesheet
   Sections: 1-Base 2-Header 3-Hero 4-Sections 5-Components 6-Responsive
   ============================================================ */

/* 1. RESET & BASE
   ============================================================ */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Couleurs */
  --purple:       #667eea;
  --purple-dark:  #764ba2;
  --purple-light: #ede9fe;
  --green:        #10b981;
  --green-dark:   #059669;
  --green-light:  #d1fae5;
  --amber:        #f59e0b;
  --amber-light:  #fef3c7;
  --rose-light:   #fce7f3;
  --red-light:    #fee2e2;
  --blue-light:   #dbeafe;

  /* Neutrals */
  --text:         #1a1a2e;
  --text-muted:   #6b7280;
  --bg:           #fffdf9;
  --white:        #ffffff;
  --border:       #f0ece6;
  --dark-bg:      #0f0f1a;

  /* Spacing */
  --section-py:   96px;
  --container:    1120px;

  /* Shape */
  --radius:       20px;
  --radius-sm:    12px;
  --radius-pill:  50px;

  /* Shadow */
  --shadow:       0 8px 32px rgba(102, 126, 234, 0.10);
  --shadow-lg:    0 20px 60px rgba(102, 126, 234, 0.18);
  --shadow-green: 0 6px 24px rgba(16, 185, 129, 0.35);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--text);
  background: var(--bg);
  line-height: 1.6;
  font-size: 16px;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* Container */
.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 24px;
}

/* Section wrapper */
.section {
  padding: var(--section-py) 0;
}

.section--alt {
  background: linear-gradient(180deg, var(--white) 0%, #faf5ff 100%);
}

/* Section header */
.section__label {
  display: inline-block;
  background: var(--purple-light);
  color: var(--purple-dark);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.section__title {
  font-size: 2.4rem;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.2;
  margin-bottom: 16px;
}

.section__sub {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 520px;
  line-height: 1.7;
}

.section--center {
  text-align: center;
}

.section--center .section__sub {
  margin: 0 auto;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 22px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.88rem;
  border: none;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.btn--outline {
  background: transparent;
  border: 2px solid var(--purple);
  color: var(--purple);
}

.btn--outline:hover {
  background: var(--purple);
  color: var(--white);
}

.btn--primary {
  background: linear-gradient(135deg, var(--purple), var(--purple-dark));
  color: var(--white);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.35);
}

.btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);
}

.btn--green {
  background: linear-gradient(135deg, #34d399, var(--green), var(--green-dark));
  color: var(--white);
  box-shadow: var(--shadow-green);
  border: none;
}

.btn--green:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.45);
}

.btn--white {
  background: var(--white);
  color: var(--green-dark);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: none;
}

.btn--white:hover {
  transform: translateY(-2px);
}

.btn--lg {
  padding: 16px 36px;
  font-size: 1rem;
  font-weight: 800;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 2 : Créer `index.html` avec le squelette HTML complet (sans contenu des sections)**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Meta — à compléter en Task 9 -->
  <title>FamilyApp — L'organisation familiale gamifiée | Essai gratuit 30 jours</title>
  <meta name="description" content="Gérez les tâches, le calendrier, Pronote et le temps d'écran de toute la famille. Parents sereins, enfants motivés. Essai gratuit 30 jours sans CB.">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/images/favicon.png">
  <link rel="apple-touch-icon" href="/images/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- HEADER -->
  <header class="header" id="header">
    <!-- Task 3 -->
  </header>

  <main>
    <!-- HERO -->
    <section class="hero" id="accueil">
      <!-- Task 4 -->
    </section>

    <!-- SOCIAL PROOF BAND -->
    <div class="proof-band">
      <!-- Task 5 -->
    </div>

    <!-- FEATURES -->
    <section class="section section--alt" id="fonctionnalites">
      <!-- Task 6 -->
    </section>

    <!-- SPLIT PARENT / ENFANT -->
    <section class="split-section">
      <!-- Task 7 -->
    </section>

    <!-- GAMIFICATION -->
    <section class="section section--alt">
      <!-- Task 8 -->
    </section>

    <!-- PRICING -->
    <section class="section" id="tarifs">
      <!-- Task 9 pricing HTML -->
    </section>

    <!-- TESTIMONIALS -->
    <section class="section section--alt" id="temoignages">
      <!-- Task 10 -->
    </section>

    <!-- FAQ -->
    <section class="section" id="faq">
      <!-- Task 11 -->
    </section>

    <!-- FINAL CTA -->
    <section class="final-cta">
      <!-- Task 12 -->
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <!-- Task 13 -->
  </footer>

  <!-- Schema.org JSON-LD — Task 14 -->

  <!-- JS -->
  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 3 : Ouvrir `index.html` dans le navigateur et vérifier que la page se charge (fond crème, police Inter)**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Résultat attendu : page blanche/crème, titre visible dans l'onglet, police Inter chargée.

- [ ] **Step 4 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add css/style.css index.html register.html robots.txt sitemap.xml
git commit -m "feat: design system CSS + HTML skeleton"
```

---

## Task 3 : Header sticky

**Files:**
- Modify: `index.html` (section header)
- Modify: `css/style.css` (ajouter section 2-Header)

- [ ] **Step 1 : Remplir le HTML du header dans `index.html`**

Remplacer `<!-- Task 3 -->` par :

```html
<div class="container">
  <div class="header__inner">
    <!-- Logo -->
    <a href="#accueil" class="header__logo">
      <div class="header__logo-mark" aria-hidden="true">🏠</div>
      <span class="header__logo-text">Family<span>App</span></span>
    </a>

    <!-- Navigation desktop -->
    <nav class="header__nav" id="header-nav" role="navigation" aria-label="Navigation principale">
      <a href="#fonctionnalites" class="header__link">Fonctionnalités</a>
      <a href="#tarifs" class="header__link">Tarifs</a>
      <a href="#temoignages" class="header__link">Témoignages</a>
      <a href="#faq" class="header__link">FAQ</a>
      <a href="https://app.family-app.fr/login" class="btn btn--outline" rel="noopener">Connexion</a>
      <a href="register.html" class="btn btn--primary">🎁 Essai gratuit</a>
    </nav>

    <!-- Bouton hamburger mobile -->
    <button
      class="header__hamburger"
      id="hamburger-btn"
      aria-label="Ouvrir le menu"
      aria-expanded="false"
      aria-controls="header-nav"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</div>
```

- [ ] **Step 2 : Ajouter les styles header à `css/style.css`**

Ajouter à la suite du fichier :

```css
/* 2. HEADER
   ============================================================ */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 253, 249, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
  transition: box-shadow 0.3s ease;
}

.header.is-scrolled {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Logo */
.header__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.header__logo-mark {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, var(--purple), var(--purple-dark));
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
}

.header__logo-text {
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--text);
  letter-spacing: -0.5px;
}

.header__logo-text span {
  color: var(--purple);
}

/* Nav */
.header__nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.header__link {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
  white-space: nowrap;
}

.header__link:hover {
  color: var(--purple);
}

/* Hamburger */
.header__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
}

.header__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.header__hamburger[aria-expanded="true"] span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.header__hamburger[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}

.header__hamburger[aria-expanded="true"] span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Vérifier : logo visible en haut, nav avec 4 liens + 2 boutons, fond crème semi-transparent, aucun débordement horizontal.

- [ ] **Step 4 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html css/style.css
git commit -m "feat: sticky header avec nav desktop"
```

---

## Task 4 : Hero — texte + CTA

**Files:**
- Modify: `index.html` (section hero, partie texte)
- Modify: `css/style.css` (styles hero texte)

- [ ] **Step 1 : Remplir le HTML hero (texte uniquement) dans `index.html`**

Remplacer `<!-- Task 4 -->` par :

```html
<div class="container">
  <div class="hero__inner">
    <!-- Côté texte -->
    <div class="hero__text">
      <div class="hero__badge">⭐ +2 000 familles organisées en France</div>
      <h1 class="hero__title">
        L'organisation familiale<br>
        <span class="hero__title-accent">enfin fun</span>
        pour petits et grands
      </h1>
      <p class="hero__sub">
        Tâches gamifiées, calendrier partagé, suivi Pronote et temps d'écran —
        tout ce qu'il faut pour une famille sereine et des enfants motivés.
      </p>
      <div class="hero__ctas">
        <a href="register.html" class="btn btn--green btn--lg">🎁 Essai gratuit 30 jours</a>
        <a href="#fonctionnalites" class="hero__cta-ghost">Découvrir l'app ↓</a>
      </div>
      <ul class="hero__trust">
        <li>✓ Sans engagement</li>
        <li>✓ Sans carte bancaire</li>
        <li>✓ 🇫🇷 Made in France</li>
      </ul>
    </div>

    <!-- Côté visuel — Task 5 -->
    <div class="hero__visual" aria-hidden="true">
      <!-- mockups CSS ajoutés en Task 5 -->
    </div>
  </div>
</div>
```

- [ ] **Step 2 : Ajouter les styles hero texte dans `css/style.css`**

```css
/* 3. HERO
   ============================================================ */
.hero {
  padding: 80px 0 60px;
  background: linear-gradient(160deg, var(--bg) 0%, #faf5ff 40%, #f0f4ff 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(240, 147, 251, 0.07) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero__text {
  animation: fadeInUp 0.5s ease both;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--purple-light);
  color: var(--purple-dark);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: var(--radius-pill);
  margin-bottom: 20px;
}

.hero__title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -1.5px;
  margin-bottom: 20px;
}

.hero__title-accent {
  background: linear-gradient(135deg, var(--purple), #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__sub {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 36px;
  max-width: 440px;
  line-height: 1.7;
}

.hero__ctas {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.hero__cta-ghost {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.hero__cta-ghost:hover {
  color: var(--purple);
}

.hero__trust {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hero__trust li {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* Visual placeholder */
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  min-height: 400px;
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Vérifier : H1 visible avec dégradé sur "enfin fun", badge violet, bouton vert, 3 trust items, layout 2 colonnes (colonne droite vide pour l'instant).

- [ ] **Step 4 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html css/style.css
git commit -m "feat: hero section texte + CTA"
```

---

## Task 5 : Hero — mockups CSS (téléphone + tablette)

**Files:**
- Modify: `index.html` (hero__visual)
- Modify: `css/style.css` (styles mockups)

- [ ] **Step 1 : Remplir `hero__visual` dans `index.html`**

Remplacer `<!-- mockups CSS ajoutés en Task 5 -->` par :

```html
<!-- Tablette — dashboard parent -->
<div class="mockup-tablet">
  <div class="mockup-tablet__screen">
    <div class="mockup-tablet__header">
      <span class="mockup-tablet__title">Dashboard famille</span>
      <span class="mockup-badge mockup-badge--purple">Vue parent</span>
    </div>
    <div class="mockup-family-grid">
      <div class="mockup-family-card">
        <div class="mockup-avatar" style="background:#fef3c7;">👧</div>
        <div class="mockup-family-name">Emma</div>
        <div class="mockup-family-tasks">4/5 tâches</div>
        <div class="mockup-progress"><div class="mockup-progress__fill" style="width:80%;background:var(--green);"></div></div>
      </div>
      <div class="mockup-family-card">
        <div class="mockup-avatar" style="background:#ede9fe;">👦</div>
        <div class="mockup-family-name">Lucas</div>
        <div class="mockup-family-tasks">2/4 tâches</div>
        <div class="mockup-progress"><div class="mockup-progress__fill" style="width:50%;background:var(--amber);"></div></div>
      </div>
      <div class="mockup-family-card">
        <div class="mockup-avatar" style="background:#d1fae5;">🧒</div>
        <div class="mockup-family-name">Léa</div>
        <div class="mockup-family-tasks">3/3 tâches</div>
        <div class="mockup-progress"><div class="mockup-progress__fill" style="width:100%;background:var(--purple);"></div></div>
      </div>
      <div class="mockup-family-card mockup-family-card--event">
        <div class="mockup-event-label">📅 Prochain</div>
        <div class="mockup-event-name">Foot Lucas</div>
        <div class="mockup-event-time">Demain 18h</div>
      </div>
    </div>
  </div>
</div>

<!-- Téléphone — app Fammily enfant -->
<div class="mockup-phone">
  <div class="mockup-phone__notch" aria-hidden="true"></div>
  <div class="mockup-phone__screen">
    <!-- Greeting -->
    <div class="mockup-phone__header">
      <div class="mockup-phone__greeting">Salut <strong>Emma</strong> ! 👋</div>
      <div class="mockup-streak">🔥 12j</div>
    </div>

    <!-- Tâches -->
    <div class="mockup-card">
      <div class="mockup-card__title">Mes tâches</div>
      <div class="mockup-task">
        <div class="mockup-task__check mockup-task__check--done" aria-label="Complété"></div>
        <span class="mockup-task__label mockup-task__label--done">Ranger chambre</span>
        <span class="mockup-pts">+10⭐</span>
      </div>
      <div class="mockup-task">
        <div class="mockup-task__check mockup-task__check--done" aria-label="Complété"></div>
        <span class="mockup-task__label mockup-task__label--done">Mettre la table</span>
        <span class="mockup-pts">+5⭐</span>
      </div>
      <div class="mockup-task">
        <div class="mockup-task__check" aria-label="À faire"></div>
        <span class="mockup-task__label">Devoirs de maths</span>
        <span class="mockup-pts">+15⭐</span>
      </div>
      <div class="mockup-task">
        <div class="mockup-task__check" aria-label="À faire"></div>
        <span class="mockup-task__label">Lecture 20 min</span>
        <span class="mockup-pts">+10⭐</span>
      </div>
    </div>

    <!-- Cagnotte -->
    <div class="mockup-card">
      <div class="mockup-cagnotte">
        <div>
          <div class="mockup-card__title">Ma cagnotte 💰</div>
          <div class="mockup-cagnotte__amount">12,50 €</div>
        </div>
        <div class="mockup-cagnotte__goal">
          <div class="mockup-cagnotte__goal-label">Objectif vélo</div>
          <div class="mockup-cagnotte__goal-amount">25 €</div>
        </div>
      </div>
      <div class="mockup-progress" style="margin-top:6px;">
        <div class="mockup-progress__fill" style="width:50%;"></div>
      </div>
      <div class="mockup-progress__labels">
        <span>50% atteint</span>
        <span>encore 12,50€</span>
      </div>
    </div>

    <!-- Pronote -->
    <div class="mockup-card">
      <div class="mockup-card__title">Dernière note Pronote</div>
      <div class="mockup-grade">
        <div class="mockup-grade__score">16/20</div>
        <div>
          <div class="mockup-grade__subject">Maths — Contrôle</div>
          <div class="mockup-grade__bonus">Bonus débloqué ! 🎉</div>
        </div>
      </div>
    </div>
  </div>
  <div class="mockup-phone__bar" aria-hidden="true"></div>
</div>
```

- [ ] **Step 2 : Ajouter les styles des mockups dans `css/style.css`**

```css
/* 3b. HERO MOCKUPS
   ============================================================ */

/* -- Tablette -- */
.mockup-tablet {
  width: 260px;
  background: #1a1a2e;
  border-radius: 20px;
  padding: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  margin-bottom: -20px;
  flex-shrink: 0;
}

.mockup-tablet__screen {
  background: linear-gradient(160deg, #fff8f0 0%, #f0f4ff 100%);
  border-radius: 14px;
  padding: 14px;
}

.mockup-tablet__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.mockup-tablet__title {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--text);
}

.mockup-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
}

.mockup-badge--purple {
  background: var(--purple-light);
  color: var(--purple-dark);
}

.mockup-family-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.mockup-family-card {
  background: var(--white);
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.mockup-family-card--event {
  background: linear-gradient(135deg, var(--purple), var(--purple-dark));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2px;
}

.mockup-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  margin-bottom: 4px;
}

.mockup-family-name {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2px;
}

.mockup-family-tasks {
  font-size: 0.58rem;
  color: var(--text-muted);
}

.mockup-event-label {
  font-size: 0.58rem;
  color: rgba(255, 255, 255, 0.8);
}

.mockup-event-name {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--white);
}

.mockup-event-time {
  font-size: 0.58rem;
  color: rgba(255, 255, 255, 0.75);
}

.mockup-progress {
  background: #f0ece6;
  height: 4px;
  border-radius: 2px;
  margin-top: 5px;
  overflow: hidden;
}

.mockup-progress__fill {
  background: linear-gradient(90deg, var(--purple), var(--purple-dark));
  height: 100%;
  border-radius: 2px;
}

/* -- Téléphone -- */
.mockup-phone {
  width: 200px;
  background: #1a1a2e;
  border-radius: 32px;
  padding: 10px;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.mockup-phone__notch {
  width: 50px;
  height: 5px;
  background: #0d0d1a;
  border-radius: 3px;
  margin: 0 auto 8px;
}

.mockup-phone__screen {
  background: linear-gradient(160deg, #fff8f0 0%, #f0f4ff 100%);
  border-radius: 22px;
  padding: 14px 12px;
}

.mockup-phone__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.mockup-phone__greeting {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text);
}

.mockup-phone__greeting strong {
  color: var(--purple);
}

.mockup-streak {
  background: linear-gradient(135deg, #f97316, #ef4444);
  color: var(--white);
  font-size: 0.58rem;
  font-weight: 800;
  padding: 3px 7px;
  border-radius: 8px;
}

.mockup-phone__bar {
  width: 50px;
  height: 4px;
  background: #333;
  border-radius: 2px;
  margin: 8px auto 0;
}

/* Mockup cards */
.mockup-card {
  background: var(--white);
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 7px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.mockup-card:last-child {
  margin-bottom: 0;
}

.mockup-card__title {
  font-size: 0.6rem;
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 7px;
}

/* Tasks */
.mockup-task {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 0;
}

.mockup-task__check {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  flex-shrink: 0;
}

.mockup-task__check--done {
  background: var(--green);
  border-color: var(--green);
  position: relative;
}

.mockup-task__check--done::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--white);
  font-size: 7px;
  font-weight: 900;
}

.mockup-task__label {
  font-size: 0.65rem;
  color: var(--text);
  font-weight: 500;
  flex: 1;
}

.mockup-task__label--done {
  text-decoration: line-through;
  color: var(--text-muted);
}

.mockup-pts {
  background: var(--amber-light);
  color: var(--amber);
  font-size: 0.55rem;
  font-weight: 800;
  padding: 2px 4px;
  border-radius: 5px;
  flex-shrink: 0;
}

/* Cagnotte */
.mockup-cagnotte {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.mockup-cagnotte__amount {
  font-size: 1.05rem;
  font-weight: 900;
  color: var(--purple);
}

.mockup-cagnotte__goal {
  text-align: right;
}

.mockup-cagnotte__goal-label {
  font-size: 0.58rem;
  color: var(--text-muted);
}

.mockup-cagnotte__goal-amount {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--green);
}

.mockup-progress__labels {
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
}

.mockup-progress__labels span {
  font-size: 0.58rem;
  color: var(--text-muted);
}

/* Pronote grade */
.mockup-grade {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mockup-grade__score {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--green);
  flex-shrink: 0;
}

.mockup-grade__subject {
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--text);
}

.mockup-grade__bonus {
  font-size: 0.6rem;
  color: var(--text-muted);
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Vérifier : tablette (gauche, plus basse) avec 4 cartes enfants + barres de progression colorées. Téléphone (droite) avec tâches, cagnotte à 50%, note Pronote. Les deux mockups sont côte à côte.

- [ ] **Step 4 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html css/style.css
git commit -m "feat: hero mockups CSS téléphone et tablette"
```

---

## Task 6 : Bande preuve sociale + Section Features

**Files:**
- Modify: `index.html` (proof-band + section features)
- Modify: `css/style.css` (styles proof-band + features)

- [ ] **Step 1 : Remplir la bande proof dans `index.html`**

Remplacer `<!-- Task 5 -->` par :

```html
<div class="container">
  <ul class="proof-band__list">
    <li class="proof-band__item"><span class="proof-band__num">2 000+</span> familles</li>
    <li class="proof-band__sep" aria-hidden="true">·</li>
    <li class="proof-band__item">⭐ <span class="proof-band__num">4,9/5</span> de moyenne</li>
    <li class="proof-band__sep" aria-hidden="true">·</li>
    <li class="proof-band__item">🎁 <span class="proof-band__num">30 jours</span> d'essai gratuit</li>
    <li class="proof-band__sep" aria-hidden="true">·</li>
    <li class="proof-band__item">🇫🇷 Made in France</li>
    <li class="proof-band__sep" aria-hidden="true">·</li>
    <li class="proof-band__item">🔒 RGPD compliant</li>
  </ul>
</div>
```

- [ ] **Step 2 : Remplir la section features dans `index.html`**

Remplacer `<!-- Task 6 -->` par :

```html
<div class="container">
  <div class="section--center">
    <span class="section__label">Fonctionnalités</span>
    <h2 class="section__title">Tout pour votre famille,<br>en une seule app</h2>
    <p class="section__sub">Conçue pour les parents qui veulent reprendre le contrôle — et les enfants qui adorent jouer.</p>
  </div>

  <div class="features-grid">

    <article class="feat-card animate-on-scroll">
      <div class="feat-card__icon" style="background:var(--purple-light);">✅</div>
      <h3 class="feat-card__title">Tâches & routines</h3>
      <p class="feat-card__desc">Créez des routines quotidiennes pour chaque enfant. Chaque tâche accomplie rapporte des points et renforce l'autonomie naturellement.</p>
      <span class="feat-card__tag feat-card__tag--essential">Essentiel</span>
    </article>

    <article class="feat-card animate-on-scroll">
      <div class="feat-card__icon" style="background:var(--green-light);">📅</div>
      <h3 class="feat-card__title">Calendrier partagé</h3>
      <p class="feat-card__desc">Synchronisé Google & Outlook. Activités, rendez-vous, anniversaires — plus rien ne vous échappe en famille.</p>
      <span class="feat-card__tag feat-card__tag--essential">Essentiel</span>
    </article>

    <article class="feat-card animate-on-scroll">
      <div class="feat-card__icon" style="background:var(--amber-light);">💰</div>
      <h3 class="feat-card__title">Cagnotte virtuelle</h3>
      <p class="feat-card__desc">Les enfants accumulent leurs gains et suivent leurs objectifs d'épargne. La responsabilité financière, dès le plus jeune âge.</p>
      <span class="feat-card__tag feat-card__tag--essential">Essentiel</span>
    </article>

    <article class="feat-card animate-on-scroll">
      <div class="feat-card__icon" style="background:var(--rose-light);">📱</div>
      <h3 class="feat-card__title">App Fammily (enfants)</h3>
      <p class="feat-card__desc">Interface dédiée, ludique et motivante. Séries de régularité, défis, récompenses — l'organisation devient un jeu d'enfant.</p>
      <span class="feat-card__tag feat-card__tag--essential">Essentiel</span>
    </article>

    <article class="feat-card animate-on-scroll">
      <div class="feat-card__icon" style="background:var(--red-light);">⏱️</div>
      <h3 class="feat-card__title">Temps d'écran intelligent</h3>
      <p class="feat-card__desc">Définissez des limites par appareil et par enfant. Plages horaires, blocages automatiques — zéro dispute au coucher.</p>
      <span class="feat-card__tag feat-card__tag--premium">Premium</span>
    </article>

    <article class="feat-card animate-on-scroll">
      <div class="feat-card__icon" style="background:var(--blue-light);">📚</div>
      <h3 class="feat-card__title">Suivi Pronote intégré</h3>
      <p class="feat-card__desc">Notes et devoirs synchronisés automatiquement. Les bonnes performances débloquent des bonus dans l'app enfant.</p>
      <span class="feat-card__tag feat-card__tag--premium">Premium</span>
    </article>

  </div>
</div>
```

- [ ] **Step 3 : Ajouter les styles proof-band + features dans `css/style.css`**

```css
/* 4. PROOF BAND
   ============================================================ */
.proof-band {
  background: var(--purple);
  padding: 18px 0;
}

.proof-band__list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.proof-band__item {
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.88rem;
  font-weight: 600;
}

.proof-band__num {
  font-weight: 900;
  color: var(--white);
}

.proof-band__sep {
  color: rgba(255, 255, 255, 0.35);
  font-size: 1.2rem;
}

/* 5. FEATURES
   ============================================================ */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 56px;
}

.feat-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 32px;
  border: 1.5px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--purple), var(--purple-dark));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.feat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(102, 126, 234, 0.2);
}

.feat-card:hover::before {
  transform: scaleX(1);
}

.feat-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin-bottom: 18px;
}

.feat-card__title {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 10px;
  color: var(--text);
}

.feat-card__desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.65;
}

.feat-card__tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
  margin-top: 14px;
}

.feat-card__tag--essential {
  background: var(--green-light);
  color: #065f46;
}

.feat-card__tag--premium {
  background: var(--purple-light);
  color: var(--purple-dark);
}
```

- [ ] **Step 4 : Vérifier dans le navigateur**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Vérifier : bande violette avec 5 éléments proof, grille 3×2 de features avec icons colorés, hover sur les cards (translateY + ombre + barre top).

- [ ] **Step 5 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html css/style.css
git commit -m "feat: proof band + features grid"
```

---

## Task 7 : Section Split parent/enfant + Gamification

**Files:**
- Modify: `index.html` (sections split + gamification)
- Modify: `css/style.css` (styles split + gamification)

- [ ] **Step 1 : Remplir la section split dans `index.html`**

Remplacer `<!-- Task 7 -->` par :

```html
<div class="container">
  <div class="split__inner">
    <div class="split__text">
      <span class="section__label">Deux apps, une famille</span>
      <h2 class="section__title">Parents sereins.<br>Enfants motivés.</h2>
      <p class="section__sub">FamilyApp, c'est un dashboard parent puissant ET une app enfant qui donne vraiment envie de participer.</p>
      <ul class="split__features">
        <li>Dashboard parent avec vue globale sur toute la famille</li>
        <li>Validation des tâches en un clic depuis le mobile</li>
        <li>App Fammily avec interface adaptée à chaque âge</li>
        <li>Mode kiosque pour l'écran de la cuisine</li>
        <li>Notifications intelligentes, pas de spam</li>
      </ul>
    </div>
    <div class="split__visual" aria-hidden="true">
      <div class="split-card">
        <div class="split-card__icon">👨‍👩‍👧‍👦</div>
        <div class="split-card__name">Dashboard parent</div>
        <div class="split-card__desc">Vue complète · Contrôle total</div>
      </div>
      <div class="split-arrow">⟷</div>
      <div class="split-card">
        <div class="split-card__icon">🎮</div>
        <div class="split-card__name">App Fammily</div>
        <div class="split-card__desc">Fun · Motivant · Autonomisant</div>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2 : Remplir la section gamification dans `index.html`**

Remplacer `<!-- Task 8 -->` par :

```html
<div class="container">
  <div class="section--center">
    <span class="section__label">Gamification</span>
    <h2 class="section__title">Vos corvées deviennent<br><span class="gamif-accent">des quêtes quotidiennes</span></h2>
    <p class="section__sub">Notre système unique transforme les habitudes en aventures. Les enfants adorent — les parents aussi.</p>
  </div>
  <div class="gamif-grid">
    <div class="gamif-card animate-on-scroll">
      <div class="gamif-card__icon">🔥</div>
      <h3 class="gamif-card__title">Séries de régularité</h3>
      <p class="gamif-card__desc">Chaque jour accompli prolonge la série. La régularité devient une fierté partagée.</p>
    </div>
    <div class="gamif-card animate-on-scroll">
      <div class="gamif-card__icon">⭐</div>
      <h3 class="gamif-card__title">Points & badges</h3>
      <p class="gamif-card__desc">Chaque tâche rapporte des points. Débloquez des badges et montez en niveau.</p>
    </div>
    <div class="gamif-card animate-on-scroll">
      <div class="gamif-card__icon">💰</div>
      <h3 class="gamif-card__title">Cagnotte virtuelle</h3>
      <p class="gamif-card__desc">Les points se transforment en argent de poche réel. Fixer des objectifs, les atteindre.</p>
    </div>
    <div class="gamif-card animate-on-scroll">
      <div class="gamif-card__icon">🎓</div>
      <h3 class="gamif-card__title">Bonus scolaires</h3>
      <p class="gamif-card__desc">Bonnes notes = bonus surprise dans l'app. L'effort scolaire est récompensé.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 3 : Ajouter les styles split + gamification dans `css/style.css`**

```css
/* 6. SPLIT PARENT / ENFANT
   ============================================================ */
.split-section {
  padding: var(--section-py) 0;
  background: linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 60%, #f093fb 100%);
  color: var(--white);
}

.split-section .section__label {
  background: rgba(255, 255, 255, 0.2);
  color: var(--white);
}

.split-section .section__title {
  color: var(--white);
}

.split-section .section__sub {
  color: rgba(255, 255, 255, 0.85);
}

.split__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.split__features {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.split__features li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  line-height: 1.5;
}

.split__features li::before {
  content: '✓';
  background: rgba(255, 255, 255, 0.2);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 1px;
}

.split__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.split-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius);
  padding: 28px 24px;
  text-align: center;
  transition: transform 0.3s ease;
}

.split-card:hover {
  transform: translateY(-4px);
}

.split-card__icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.split-card__name {
  font-weight: 800;
  color: var(--white);
  margin-bottom: 4px;
  font-size: 0.95rem;
}

.split-card__desc {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.75);
}

.split-arrow {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.8rem;
  flex-shrink: 0;
}

/* 7. GAMIFICATION
   ============================================================ */
.gamif-accent {
  color: var(--purple);
}

.gamif-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 56px;
}

.gamif-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 28px 20px;
  text-align: center;
  border: 1.5px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gamif-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.gamif-card__icon {
  font-size: 2.2rem;
  margin-bottom: 14px;
}

.gamif-card__title {
  font-size: 0.98rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text);
}

.gamif-card__desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
}
```

- [ ] **Step 4 : Vérifier dans le navigateur**

Vérifier : section violette avec gradient, deux cards glassmorphisme côte à côte, 4 gamification cards sur fond crème.

- [ ] **Step 5 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html css/style.css
git commit -m "feat: sections split parent/enfant + gamification"
```

---

## Task 8 : Section Pricing

**Files:**
- Modify: `index.html` (section pricing)
- Modify: `css/style.css` (styles pricing)

- [ ] **Step 1 : Remplir la section pricing dans `index.html`**

Remplacer `<!-- Task 9 pricing HTML -->` par :

```html
<div class="container">
  <div class="section--center">
    <span class="section__label">Tarifs</span>
    <h2 class="section__title">Commencez gratuitement,<br>évoluez à votre rythme</h2>
    <p class="section__sub">30 jours d'essai gratuit sur tous les plans. Sans carte bancaire requise.</p>
  </div>

  <!-- Toggle mensuel/annuel -->
  <div class="pricing-toggle">
    <button class="pricing-toggle__btn pricing-toggle__btn--active" id="toggle-monthly" aria-pressed="true">Mensuel</button>
    <button class="pricing-toggle__btn" id="toggle-annual" aria-pressed="false">Annuel <span class="pricing-toggle__save">−2 mois offerts</span></button>
  </div>

  <div class="pricing-grid">

    <!-- Plan Essentiel -->
    <div class="pricing-card animate-on-scroll">
      <div class="pricing-card__name">Essentiel</div>
      <div class="pricing-card__price">
        <span class="pricing-card__amount" data-monthly="3,90€" data-annual="39€">3,90€</span>
        <span class="pricing-card__period" data-monthly="/mois" data-annual="/an">/mois</span>
      </div>
      <div class="pricing-card__save">
        <span class="pricing-card__save-monthly">ou 39€/an — économisez 10€</span>
        <span class="pricing-card__save-annual" hidden>soit 3,25€/mois — vous économisez 10€</span>
      </div>
      <ul class="pricing-card__list">
        <li>Tâches & routines illimitées</li>
        <li>Calendrier partagé (Google & Outlook)</li>
        <li>Dashboard parent</li>
        <li>App Fammily pour les enfants</li>
        <li>Cagnotte virtuelle & récompenses</li>
        <li>Jusqu'à 4 profils enfants</li>
        <li>Support par email</li>
      </ul>
      <a href="register.html" class="btn btn--outline pricing-card__cta">Démarrer gratuitement</a>
    </div>

    <!-- Plan Premium -->
    <div class="pricing-card pricing-card--popular animate-on-scroll">
      <div class="pricing-card__badge">⭐ Plus populaire</div>
      <div class="pricing-card__name">Premium</div>
      <div class="pricing-card__price">
        <span class="pricing-card__amount" data-monthly="7,90€" data-annual="79€">7,90€</span>
        <span class="pricing-card__period" data-monthly="/mois" data-annual="/an">/mois</span>
      </div>
      <div class="pricing-card__save">
        <span class="pricing-card__save-monthly">ou 79€/an — économisez 20€</span>
        <span class="pricing-card__save-annual" hidden>soit 6,58€/mois — vous économisez 20€</span>
      </div>
      <ul class="pricing-card__list">
        <li><strong>Tout Essentiel +</strong></li>
        <li>Temps d'écran intelligent (boîtier requis)</li>
        <li>Suivi Pronote+ & bonus scolaires</li>
        <li>Profils enfants illimités</li>
        <li>Rapports mensuels détaillés</li>
        <li>Mode kiosque famille</li>
        <li>Support prioritaire</li>
      </ul>
      <a href="register.html" class="btn btn--primary pricing-card__cta">Démarrer gratuitement</a>
    </div>

  </div>
  <p class="pricing-note">💡 Tous les forfaits incluent 30 jours d'essai gratuit, sans carte bancaire requise</p>
</div>
```

- [ ] **Step 2 : Ajouter les styles pricing dans `css/style.css`**

```css
/* 8. PRICING
   ============================================================ */
.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 40px 0 0;
  background: var(--border);
  border-radius: var(--radius-pill);
  padding: 4px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.pricing-toggle__btn {
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  border: none;
  background: transparent;
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--text-muted);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pricing-toggle__btn--active {
  background: var(--white);
  color: var(--text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.pricing-toggle__save {
  background: var(--green-light);
  color: #065f46;
  font-size: 0.7rem;
  padding: 2px 7px;
  border-radius: 20px;
  font-weight: 800;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  max-width: 760px;
  margin: 40px auto 0;
}

.pricing-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 36px;
  border: 2px solid var(--border);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pricing-card--popular {
  border-color: var(--purple);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.08);
}

.pricing-card__badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--purple), var(--purple-dark));
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 800;
  padding: 5px 16px;
  border-radius: var(--radius-pill);
  white-space: nowrap;
}

.pricing-card__name {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--text);
}

.pricing-card__price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 4px;
}

.pricing-card__amount {
  font-size: 2.6rem;
  font-weight: 900;
  letter-spacing: -1px;
  color: var(--purple);
}

.pricing-card__period {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 500;
}

.pricing-card__save {
  color: var(--green);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.pricing-card__list {
  margin-bottom: 24px;
}

.pricing-card__list li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 9px 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 0.88rem;
  color: #444;
  line-height: 1.4;
}

.pricing-card__list li::before {
  content: '✓';
  color: var(--green);
  font-weight: 900;
  font-size: 0.8rem;
  margin-top: 1px;
  flex-shrink: 0;
}

.pricing-card__cta {
  width: 100%;
  padding: 14px;
  font-size: 0.95rem;
}

.pricing-note {
  text-align: center;
  margin-top: 32px;
  color: var(--text-muted);
  font-size: 0.88rem;
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

Vérifier : toggle mensuel/annuel visible et centré, 2 plans côte à côte, plan Premium avec badge violet et border colorée.

- [ ] **Step 4 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html css/style.css
git commit -m "feat: pricing section avec toggle mensuel/annuel"
```

---

## Task 9 : Témoignages + FAQ + CTA Final + Footer

**Files:**
- Modify: `index.html` (4 sections restantes)
- Modify: `css/style.css` (styles témoignages, FAQ, CTA, footer)

- [ ] **Step 1 : Remplir les 4 sections dans `index.html`**

Remplacer `<!-- Task 10 -->` (témoignages) par :

```html
<div class="container">
  <div class="section--center">
    <span class="section__label">Témoignages</span>
    <h2 class="section__title">Des familles qui ont retrouvé<br>leur <span style="color:var(--purple);">sérénité</span></h2>
  </div>
  <div class="testi-grid">
    <article class="testi-card animate-on-scroll">
      <div class="testi-stars" aria-label="5 étoiles">⭐⭐⭐⭐⭐</div>
      <blockquote class="testi-text">"Mes enfants se battent maintenant pour faire leurs tâches ! Le système de points a tout changé. Et moi, je ne cours plus après personne."</blockquote>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">SM</div>
        <div><div class="testi-name">Sophie Martin</div><div class="testi-loc">Maman de 3 enfants · Paris</div></div>
      </div>
    </article>
    <article class="testi-card animate-on-scroll">
      <div class="testi-stars" aria-label="5 étoiles">⭐⭐⭐⭐⭐</div>
      <blockquote class="testi-text">"L'intégration Pronote est un game-changer. Je suis les devoirs en temps réel et ma fille est ultra motivée par les bonus de bonnes notes."</blockquote>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">JD</div>
        <div><div class="testi-name">Julien Dubois</div><div class="testi-loc">Papa de 2 ados · Lyon</div></div>
      </div>
    </article>
    <article class="testi-card animate-on-scroll">
      <div class="testi-stars" aria-label="5 étoiles">⭐⭐⭐⭐⭐</div>
      <blockquote class="testi-text">"La gestion du temps d'écran a sauvé nos soirées. On fixe les limites ensemble, l'app les applique. Fini les disputes au coucher !"</blockquote>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">AK</div>
        <div><div class="testi-name">Amina Khalid</div><div class="testi-loc">Maman de 2 enfants · Strasbourg</div></div>
      </div>
    </article>
    <article class="testi-card animate-on-scroll">
      <div class="testi-stars" aria-label="5 étoiles">⭐⭐⭐⭐⭐</div>
      <blockquote class="testi-text">"Mon fils a une routine du matin bien ancrée. Sa série de 45 jours, c'est sa fierté. Plus besoin de le répéter 10 fois !"</blockquote>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">MB</div>
        <div><div class="testi-name">Marc Bernard</div><div class="testi-loc">Papa solo · Toulouse</div></div>
      </div>
    </article>
    <article class="testi-card animate-on-scroll">
      <div class="testi-stars" aria-label="5 étoiles">⭐⭐⭐⭐⭐</div>
      <blockquote class="testi-text">"Mes jumeaux adorent leur cagnotte virtuelle. On gagne au moins 2h par semaine en organisation. Enfin une app qui comprend les familles !"</blockquote>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">CB</div>
        <div><div class="testi-name">Céline Bertrand</div><div class="testi-loc">Maman de jumeaux · Bordeaux</div></div>
      </div>
    </article>
    <article class="testi-card animate-on-scroll">
      <div class="testi-stars" aria-label="5 étoiles">⭐⭐⭐⭐⭐</div>
      <blockquote class="testi-text">"Simple, ludique et vraiment efficace. On a testé plusieurs apps, FamilyApp est la seule qui tient ses promesses. Nos enfants sont autonomes !"</blockquote>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">LR</div>
        <div><div class="testi-name">Laura & Romain</div><div class="testi-loc">Parents de 4 enfants · Nantes</div></div>
      </div>
    </article>
  </div>
</div>
```

Remplacer `<!-- Task 11 -->` (FAQ) par :

```html
<div class="container">
  <div class="section--center">
    <span class="section__label">FAQ</span>
    <h2 class="section__title">Questions fréquentes</h2>
  </div>
  <div class="faq-list" role="list">

    <div class="faq-item" role="listitem">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-1">
        L'essai gratuit de 30 jours est-il vraiment sans engagement ?
        <span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-a" id="faq-1" hidden>
        Oui, complètement. Pas de carte bancaire requise, pas d'engagement. À la fin des 30 jours, vous choisissez si vous continuez. Si non, votre compte s'arrête automatiquement.
      </div>
    </div>

    <div class="faq-item" role="listitem">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-2">
        Combien d'enfants peut-on ajouter ?
        <span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-a" id="faq-2" hidden>
        Le plan Essentiel supporte jusqu'à 4 profils enfants. Le plan Premium est illimité. Chaque enfant a son propre profil, ses tâches, sa cagnotte et son espace dans l'app Fammily.
      </div>
    </div>

    <div class="faq-item" role="listitem">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-3">
        Comment fonctionne l'intégration Pronote ?
        <span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-a" id="faq-3" hidden>
        Avec le plan Premium, FamilyApp se synchronise avec Pronote pour récupérer automatiquement les notes et les devoirs. Les bonnes notes déclenchent des bonus dans l'app enfant.
      </div>
    </div>

    <div class="faq-item" role="listitem">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-4">
        Le module temps d'écran nécessite-t-il du matériel ?
        <span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-a" id="faq-4" hidden>
        Oui, le suivi précis du temps d'écran nécessite notre boîtier Raspberry Pi (vendu séparément). Il se connecte à votre réseau Wi-Fi et permet un contrôle par appareil et par enfant.
      </div>
    </div>

    <div class="faq-item" role="listitem">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-5">
        Mes données sont-elles sécurisées ?
        <span class="faq-icon" aria-hidden="true"></span>
      </button>
      <div class="faq-a" id="faq-5" hidden>
        Absolument. FamilyApp est hébergé en Europe, RGPD compliant, et vos données ne sont jamais revendues. Nous prenons la protection des données des mineurs très au sérieux.
      </div>
    </div>

  </div>
</div>
```

Remplacer `<!-- Task 12 -->` (CTA final) par :

```html
<div class="container">
  <h2 class="final-cta__title">Prêt à transformer votre quotidien familial ?</h2>
  <p class="final-cta__sub">Rejoignez 2 000+ familles qui ont retrouvé sérénité et harmonie</p>
  <a href="register.html" class="btn btn--white btn--lg">🚀 Démarrer mon essai gratuit</a>
  <p class="final-cta__note">✓ 30 jours gratuit &nbsp;·&nbsp; ✓ Sans CB &nbsp;·&nbsp; ✓ Installation en 2 minutes</p>
</div>
```

Remplacer `<!-- Task 13 -->` (footer) par :

```html
<div class="container">
  <div class="footer__grid">
    <div class="footer__brand">
      <a href="#accueil" class="header__logo">
        <div class="header__logo-mark" aria-hidden="true">🏠</div>
        <span class="header__logo-text" style="color:var(--white);">Family<span>App</span></span>
      </a>
      <p class="footer__tagline">L'organisation familiale gamifiée. Parents sereins, enfants motivés.</p>
    </div>
    <div class="footer__col">
      <h3 class="footer__heading">Produit</h3>
      <ul>
        <li><a href="#fonctionnalites">Fonctionnalités</a></li>
        <li><a href="#tarifs">Tarifs</a></li>
        <li><a href="#temoignages">Témoignages</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h3 class="footer__heading">Entreprise</h3>
      <ul>
        <li><a href="#">À propos</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="mailto:contact@family-app.fr">Contact</a></li>
        <li><a href="#">Support</a></li>
      </ul>
    </div>
    <div class="footer__col">
      <h3 class="footer__heading">Légal</h3>
      <ul>
        <li><a href="/terms/">Conditions d'utilisation</a></li>
        <li><a href="/privacy/">Politique de confidentialité</a></li>
        <li><a href="#">Mentions légales</a></li>
        <li><a href="#">Cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <span>© 2026 FamilyApp — Tous droits réservés</span>
    <span>🇫🇷 Made in France with ❤️</span>
  </div>
</div>
```

- [ ] **Step 2 : Ajouter les styles dans `css/style.css`**

```css
/* 9. TESTIMONIALS
   ============================================================ */
.testi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 56px;
}

.testi-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 28px;
  border: 1.5px solid var(--border);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testi-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.testi-card::before {
  content: '\201C';
  position: absolute;
  top: 14px;
  left: 20px;
  font-size: 3.5rem;
  color: rgba(102, 126, 234, 0.1);
  font-family: Georgia, serif;
  line-height: 1;
  pointer-events: none;
}

.testi-stars {
  color: #fbbf24;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.testi-text {
  font-size: 0.9rem;
  color: #444;
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 20px;
}

.testi-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.testi-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--purple), var(--purple-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 800;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.testi-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text);
}

.testi-loc {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* 10. FAQ
   ============================================================ */
.faq-list {
  max-width: 700px;
  margin: 48px auto 0;
}

.faq-item {
  border-bottom: 1.5px solid var(--border);
}

.faq-q {
  width: 100%;
  text-align: left;
  padding: 20px 0;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  transition: color 0.2s;
}

.faq-q:hover {
  color: var(--purple);
}

.faq-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--purple-light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  transition: background 0.2s, transform 0.3s;
}

.faq-icon::before,
.faq-icon::after {
  content: '';
  position: absolute;
  background: var(--purple-dark);
  border-radius: 2px;
}

.faq-icon::before {
  width: 10px;
  height: 2px;
}

.faq-icon::after {
  width: 2px;
  height: 10px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.faq-q[aria-expanded="true"] .faq-icon::after {
  transform: rotate(90deg);
  opacity: 0;
}

.faq-q[aria-expanded="true"] .faq-icon {
  background: var(--purple);
}

.faq-q[aria-expanded="true"] .faq-icon::before {
  background: var(--white);
}

.faq-a {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.7;
  padding-bottom: 20px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.3s ease;
  opacity: 0;
}

.faq-a:not([hidden]) {
  max-height: 300px;
  opacity: 1;
}

/* 11. FINAL CTA
   ============================================================ */
.final-cta {
  padding: var(--section-py) 0;
  background: linear-gradient(135deg, #34d399 0%, var(--green) 50%, var(--green-dark) 100%);
  text-align: center;
  color: var(--white);
}

.final-cta__title {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.final-cta__sub {
  font-size: 1.15rem;
  opacity: 0.92;
  margin-bottom: 36px;
}

.final-cta__note {
  margin-top: 24px;
  font-size: 0.85rem;
  opacity: 0.82;
}

/* 12. FOOTER
   ============================================================ */
.footer {
  background: var(--dark-bg);
  color: rgba(255, 255, 255, 0.7);
  padding: 64px 0 32px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer__tagline {
  font-size: 0.88rem;
  line-height: 1.6;
  max-width: 240px;
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.footer__heading {
  color: var(--white);
  font-weight: 800;
  font-size: 0.88rem;
  margin-bottom: 16px;
}

.footer__col ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__col a {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer__col a:hover {
  color: var(--white);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.82rem;
  flex-wrap: wrap;
  gap: 12px;
}
```

- [ ] **Step 3 : Vérifier dans le navigateur**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Vérifier : 6 témoignages en grid 3×2, FAQ accordéon cliquable (pas de JS encore, on s'assure que le HTML est correct), CTA vert avec bouton blanc, footer dark 4 colonnes.

- [ ] **Step 4 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html css/style.css
git commit -m "feat: témoignages, FAQ, CTA final, footer"
```

---

## Task 10 : JavaScript — toutes les interactions

**Files:**
- Create: `js/main.js`

- [ ] **Step 1 : Écrire `js/main.js` complet**

```js
'use strict';

/* ============================================================
   FamilyApp Landing — main.js
   Interactions : header scroll · menu mobile · FAQ accordion
                  pricing toggle · IntersectionObserver · smooth scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. HEADER SCROLL
     ---------------------------------------- */
  const header = document.getElementById('header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // état initial
  }


  /* 2. MENU MOBILE (hamburger)
     ---------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const headerNav    = document.getElementById('header-nav');

  if (hamburgerBtn && headerNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
      headerNav.classList.toggle('header__nav--open', !isOpen);
    });

    // Fermer le menu au clic sur un lien
    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        headerNav.classList.remove('header__nav--open');
      });
    });

    // Fermer au clic en dehors
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        headerNav.classList.remove('header__nav--open');
      }
    });
  }


  /* 3. FAQ ACCORDION
     ---------------------------------------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const panel   = document.getElementById(targetId);

      if (!panel) return;

      // Fermer tous les autres
      document.querySelectorAll('.faq-q').forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherId  = otherBtn.getAttribute('aria-controls');
          const otherPanel = otherId ? document.getElementById(otherId) : null;
          if (otherPanel) otherPanel.hidden = true;
        }
      });

      // Toggle l'item courant
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });


  /* 4. PRICING TOGGLE (mensuel / annuel)
     ---------------------------------------- */
  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleAnnual  = document.getElementById('toggle-annual');

  if (toggleMonthly && toggleAnnual) {
    const setMode = (mode) => {
      const isAnnual = mode === 'annual';

      // Boutons actifs
      toggleMonthly.classList.toggle('pricing-toggle__btn--active', !isAnnual);
      toggleAnnual.classList.toggle('pricing-toggle__btn--active',   isAnnual);
      toggleMonthly.setAttribute('aria-pressed', String(!isAnnual));
      toggleAnnual.setAttribute('aria-pressed',  String(isAnnual));

      // Montants
      document.querySelectorAll('.pricing-card__amount').forEach(el => {
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });

      // Période
      document.querySelectorAll('.pricing-card__period').forEach(el => {
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });

      // Lignes "économies"
      document.querySelectorAll('.pricing-card__save-monthly').forEach(el => {
        el.hidden = isAnnual;
      });
      document.querySelectorAll('.pricing-card__save-annual').forEach(el => {
        el.hidden = !isAnnual;
      });
    };

    toggleMonthly.addEventListener('click', () => setMode('monthly'));
    toggleAnnual.addEventListener('click',  () => setMode('annual'));
  }


  /* 5. INTERSECTION OBSERVER — animations au scroll
     ---------------------------------------- */
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // une seule fois
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback : tout afficher immédiatement (navigateurs sans IntersectionObserver)
    animatedEls.forEach(el => el.classList.add('is-visible'));
  }


  /* 6. SMOOTH SCROLL avec offset header
     ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

}); // DOMContentLoaded
```

- [ ] **Step 2 : Ajouter les styles CSS du menu mobile ouvert dans `css/style.css`**

```css
/* Menu mobile — état ouvert (géré par JS)
   ============================================================ */
@media (max-width: 768px) {
  .header__nav--open {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 253, 249, 0.98);
    backdrop-filter: blur(12px);
    padding: 20px 24px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    gap: 12px;
    border-top: 1px solid var(--border);
  }

  .header__nav--open .btn {
    width: 100%;
    justify-content: center;
  }
}
```

- [ ] **Step 3 : Vérifier toutes les interactions dans le navigateur**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Vérifier point par point :
- Header devient shadow quand on scroll > 50px
- Clic sur un lien d'ancre → scroll smooth avec offset
- FAQ : clic ouvre/ferme, un seul item ouvert à la fois
- Pricing toggle : les prix et périodes changent (Mensuel/Annuel)
- Les cards entrent en fondu en scrollant (IntersectionObserver)

- [ ] **Step 4 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add js/main.js css/style.css
git commit -m "feat: javascript interactions — scroll, FAQ, pricing toggle, animations"
```

---

## Task 11 : SEO — meta tags + Schema.org JSON-LD

**Files:**
- Modify: `index.html` (head section + JSON-LD avant `</body>`)

- [ ] **Step 1 : Remplacer le `<head>` de `index.html` par la version SEO complète**

Remplacer tout le contenu entre `<head>` et `</head>` par :

```html
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- SEO Primary -->
  <title>FamilyApp — L'organisation familiale gamifiée | Essai gratuit 30 jours</title>
  <meta name="description" content="Gérez les tâches, le calendrier, Pronote et le temps d'écran de toute la famille. Parents sereins, enfants motivés. Essai gratuit 30 jours sans CB.">
  <meta name="keywords" content="organisation familiale, application famille, tâches enfants, calendrier familial, pronote, temps écran, argent de poche, éducation positive">
  <meta name="author" content="FamilyApp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://family-app.fr/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="https://family-app.fr/">
  <meta property="og:title"       content="FamilyApp — L'organisation familiale gamifiée">
  <meta property="og:description" content="Tâches gamifiées, calendrier partagé, suivi Pronote et temps d'écran. Essai gratuit 30 jours, sans carte bancaire.">
  <meta property="og:image"       content="https://family-app.fr/images/og-image.jpg">
  <meta property="og:locale"      content="fr_FR">
  <meta property="og:site_name"   content="FamilyApp">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:url"         content="https://family-app.fr/">
  <meta name="twitter:title"       content="FamilyApp — L'organisation familiale gamifiée">
  <meta name="twitter:description" content="Tâches gamifiées, calendrier partagé, suivi Pronote et temps d'écran. Essai gratuit 30 jours, sans CB.">
  <meta name="twitter:image"       content="https://family-app.fr/images/og-image.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/images/favicon.png">
  <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
  <link rel="apple-touch-icon" href="/images/favicon.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="css/style.css">
```

- [ ] **Step 2 : Ajouter le JSON-LD Schema.org juste avant `</body>` dans `index.html`**

```html
<!-- Schema.org JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "FamilyApp",
      "description": "Application d'organisation familiale gamifiée. Tâches, calendrier partagé, suivi Pronote, gestion du temps d'écran et cagnotte virtuelle pour enfants.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web, iOS, Android",
      "url": "https://family-app.fr",
      "offers": [
        {
          "@type": "Offer",
          "name": "Plan Essentiel",
          "price": "3.90",
          "priceCurrency": "EUR",
          "billingIncrement": "P1M"
        },
        {
          "@type": "Offer",
          "name": "Plan Premium",
          "price": "7.90",
          "priceCurrency": "EUR",
          "billingIncrement": "P1M"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "2000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "inLanguage": "fr"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "L'essai gratuit de 30 jours est-il vraiment sans engagement ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, complètement. Pas de carte bancaire requise, pas d'engagement. À la fin des 30 jours, vous choisissez si vous continuez. Si non, votre compte s'arrête automatiquement."
          }
        },
        {
          "@type": "Question",
          "name": "Combien d'enfants peut-on ajouter ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le plan Essentiel supporte jusqu'à 4 profils enfants. Le plan Premium est illimité. Chaque enfant a son propre profil, ses tâches, sa cagnotte et son espace dans l'app Fammily."
          }
        },
        {
          "@type": "Question",
          "name": "Comment fonctionne l'intégration Pronote ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avec le plan Premium, FamilyApp se synchronise avec Pronote pour récupérer automatiquement les notes et les devoirs. Les bonnes notes déclenchent des bonus dans l'app enfant."
          }
        },
        {
          "@type": "Question",
          "name": "Le module temps d'écran nécessite-t-il du matériel ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, le suivi précis du temps d'écran nécessite notre boîtier Raspberry Pi (vendu séparément). Il se connecte à votre réseau Wi-Fi et permet un contrôle par appareil et par enfant."
          }
        },
        {
          "@type": "Question",
          "name": "Mes données sont-elles sécurisées ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolument. FamilyApp est hébergé en Europe, RGPD compliant, et vos données ne sont jamais revendues. Nous prenons la protection des données des mineurs très au sérieux."
          }
        }
      ]
    }
  ]
}
</script>
```

- [ ] **Step 3 : Valider le HTML avec le W3C validator**

Ouvrir : https://validator.w3.org/#validate_by_upload — uploader `index.html`

Résultat attendu : 0 erreur, warnings acceptables (ex : type="application/ld+json" est valide).

- [ ] **Step 4 : Tester le schema.org avec Rich Results Test**

Ouvrir : https://search.google.com/test/rich-results — coller le JSON-LD

Résultat attendu : "FAQPage" et "SoftwareApplication" détectés valides.

- [ ] **Step 5 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add index.html
git commit -m "feat: SEO meta tags + schema.org JSON-LD (SoftwareApplication + FAQPage)"
```

---

## Task 12 : Responsive CSS (mobile & tablette)

**Files:**
- Modify: `css/style.css` (ajouter media queries à la fin)

- [ ] **Step 1 : Ajouter les media queries à la fin de `css/style.css`**

```css
/* ============================================================
   RESPONSIVE
   ============================================================ */

/* Tablette (640px – 1024px) */
@media (max-width: 1024px) {
  :root {
    --section-py: 72px;
  }

  .hero__title {
    font-size: 2.4rem;
  }

  .section__title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gamif-grid {
    grid-template-columns: repeat(2, 2fr);
  }

  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .testi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  :root {
    --section-py: 56px;
  }

  /* Header */
  .header__nav {
    display: none;
  }

  .header__hamburger {
    display: flex;
  }

  .header {
    position: sticky;
  }

  /* Hero */
  .hero {
    padding: 48px 0 40px;
  }

  .hero__inner {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero__title {
    font-size: 2rem;
    letter-spacing: -1px;
  }

  .hero__sub {
    margin-left: auto;
    margin-right: auto;
  }

  .hero__ctas {
    justify-content: center;
  }

  .hero__trust {
    justify-content: center;
  }

  .hero__visual {
    flex-direction: column;
    align-items: center;
  }

  /* Cacher la tablette sur mobile, garder le téléphone */
  .mockup-tablet {
    display: none;
  }

  .mockup-phone {
    width: 220px;
  }

  /* Proof band */
  .proof-band__sep {
    display: none;
  }

  .proof-band__list {
    gap: 10px 20px;
  }

  /* Features */
  .features-grid {
    grid-template-columns: 1fr;
  }

  /* Split */
  .split__inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .split__visual {
    flex-direction: column;
    gap: 12px;
  }

  .split-arrow {
    transform: rotate(90deg);
  }

  /* Gamification */
  .gamif-grid {
    grid-template-columns: 1fr 1fr;
  }

  /* Pricing */
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  /* Testimonials */
  .testi-grid {
    grid-template-columns: 1fr;
  }

  /* Final CTA */
  .final-cta__title {
    font-size: 2rem;
  }

  /* Footer */
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  /* Sections */
  .section__title {
    font-size: 1.8rem;
  }
}

/* Très petit (< 480px) */
@media (max-width: 480px) {
  .gamif-grid {
    grid-template-columns: 1fr;
  }

  .footer__grid {
    grid-template-columns: 1fr;
  }

  .pricing-toggle {
    flex-direction: column;
    border-radius: var(--radius);
  }
}
```

- [ ] **Step 2 : Tester en mode responsive dans le navigateur**

```bash
open /Users/admin/Developpement/familiapp-landing/index.html
```

Dans les DevTools du navigateur (F12 → icône mobile) :
- **375px (iPhone SE)** : 1 colonne, menu hamburger, tablette cachée, téléphone visible, footer 1 colonne
- **768px (iPad)** : features 2 colonnes, gamif 2 colonnes, testi 2 colonnes
- **1024px (laptop)** : features 2 colonnes, footer 2 colonnes

- [ ] **Step 3 : Commit**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add css/style.css
git commit -m "feat: responsive CSS — mobile, tablette, desktop"
```

---

## Task 13 : Vérification finale & image placeholder OG

**Files:**
- Create: `images/og-image.jpg` (placeholder)
- Verify: Lighthouse audit

- [ ] **Step 1 : Créer une image OG placeholder**

Copier le favicon comme placeholder temporaire (à remplacer par une vraie image 1200×630) :

```bash
cp /Users/admin/Developpement/familiapp-landing/images/favicon.png \
   /Users/admin/Developpement/familiapp-landing/images/og-image.jpg 2>/dev/null || \
   echo "Créer manuellement images/og-image.jpg (1200×630px recommandé)"
```

Note pour l'équipe : créer une vraie capture du mockup hero en 1200×630px.

- [ ] **Step 2 : Vérifier l'absence de liens cassés**

Ouvrir `index.html` dans le navigateur et vérifier dans la console (F12 → Console) :
- 0 erreur 404 sur les ressources CSS/JS
- 0 erreur JavaScript

- [ ] **Step 3 : Audit Lighthouse**

Dans Chrome DevTools (F12 → Lighthouse) :
- Cocher : Performance, Accessibility, Best Practices, SEO
- Cliquer "Analyze page load"

Seuils attendus (fichier local, scores légèrement différents en prod) :
- Performance : > 90
- Accessibility : > 90
- Best Practices : > 90
- SEO : > 95

Si Accessibility < 90 : vérifier les contrastes de couleur et les attributs `aria-*`.

- [ ] **Step 4 : Vérifier le HTML final**

```bash
wc -l /Users/admin/Developpement/familiapp-landing/index.html
wc -l /Users/admin/Developpement/familiapp-landing/css/style.css
wc -l /Users/admin/Developpement/familiapp-landing/js/main.js
```

- [ ] **Step 5 : Commit final**

```bash
cd /Users/admin/Developpement/familiapp-landing
git add -A
git commit -m "feat: landing page complète — prête pour déploiement Infomaniak"
```

- [ ] **Step 6 : Résumé du livrable**

Structure finale à uploader sur Infomaniak via FTP ou git :
```
familiapp-landing/
├── index.html       ← landing page principale
├── register.html    ← redirect vers app
├── robots.txt
├── sitemap.xml
├── css/style.css
├── js/main.js
├── images/
│   ├── favicon.png
│   ├── favicon.ico
│   └── og-image.jpg (⚠️ à remplacer par vraie image 1200×630)
└── terms/ et privacy/ (à compléter avec vrai contenu légal)
```

---

## Auto-review du plan

### Couverture de la spec

| Section spec | Tâche(s) |
|---|---|
| Header sticky + hamburger | Task 3 |
| Hero texte + CTA | Task 4 |
| Mockups CSS phone + tablet | Task 5 |
| Social proof band | Task 6 |
| Features 6 cards + badges plan | Task 6 |
| Split parent/enfant | Task 7 |
| Gamification 4 cards | Task 7 |
| Pricing + toggle mensuel/annuel | Task 8 |
| Témoignages 6 cards | Task 9 |
| FAQ accordéon | Task 9 |
| CTA final vert | Task 9 |
| Footer dark 4 colonnes | Task 9 |
| JS : header scroll | Task 10 |
| JS : menu mobile | Task 10 |
| JS : FAQ accordion | Task 10 |
| JS : pricing toggle | Task 10 |
| JS : IntersectionObserver | Task 10 |
| JS : smooth scroll avec offset | Task 10 |
| Meta SEO + Open Graph | Task 11 |
| Schema.org JSON-LD (FAQ + SoftwareApplication) | Task 11 |
| Responsive 3 breakpoints | Task 12 |
| sitemap.xml + robots.txt | Task 1 |
| register.html redirect | Task 1 |
| Vérification Lighthouse | Task 13 |

**Couverture : 100% de la spec couverte.**

### Cohérence des classes CSS

| Classe | Définie | Utilisée |
|---|---|---|
| `.header__nav--open` | Task 10 CSS | Task 10 JS (`classList.toggle`) |
| `.animate-on-scroll` | Task 2 CSS (base) | Tasks 6, 7, 8, 9 HTML |
| `.is-visible` | Task 2 CSS (base) | Task 10 JS (IntersectionObserver) |
| `.is-scrolled` | Task 3 CSS | Task 10 JS |
| `.pricing-toggle__btn--active` | Task 8 CSS | Task 10 JS |
| `.faq-q[aria-expanded="true"]` | Task 9 CSS | Task 10 JS |
| `.faq-a:not([hidden])` | Task 9 CSS | Task 10 JS (`hidden` attr) |

Toutes les classes utilisées dans le JS sont définies dans le CSS. Aucune incohérence.
