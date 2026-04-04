# FamilyApp — Landing Page Refonte · Design Spec

**Date :** 2026-04-04
**Projet :** familiapp-landing
**Hébergement :** Infomaniak (site statique séparé de l'app React)
**Stack :** HTML5 · CSS3 vanilla · JavaScript vanilla

---

## 1. Contexte & Objectifs

### Situation actuelle
Le site marketing actuel (`download.zip`) est une landing page HTML/CSS/JS statique avec :
- Hero gradient violet basique
- Grille de 6 features avec emojis
- Section gamification
- Pricing 2 plans
- Témoignages
- Footer

**Problèmes identifiés :**
- Aucun visuel de l'app réelle (pas de screenshots)
- Emojis bruts comme icônes (non professionnel)
- Pas de FAQ (impact SEO négatif)
- Pas de section "bande preuve sociale"
- Structure SEO insuffisante (pas de schema.org, pas de FAQ structurée)
- Design générique, pas mémorable

### Objectifs de la refonte
1. **Visuel "top"** — design chaleureux et moderne qui donne envie de s'inscrire
2. **En phase avec l'app** — montrer le vrai produit via des mockups CSS fidèles
3. **SEO top** — structure sémantique, schema.org, FAQ balisée, meta optimisées, performance maximale

---

## 2. Direction Visuelle

### Style choisi : Ludique & Chaleureux (style B)
Inspiré de Duolingo / Notion / Todoist :
- **Fond** : crème chaud `#fffdf9` → dégradé subtil vers `#f0f4ff`
- **Accent principal** : violet `#667eea` → `#764ba2`
- **CTA principal** : vert émeraude `#10b981` (contraste et confiance)
- **Typographie** : Inter (400, 600, 700, 800, 900)
- **Border-radius** : généreux (20px cards, 50px boutons)
- **Ombres** : douces, teintées violet

### CSS Custom Properties (design system)
```css
--purple: #667eea;
--purple-dark: #764ba2;
--purple-light: #ede9fe;
--green: #10b981;
--text: #1a1a2e;
--text-muted: #6b7280;
--bg: #fffdf9;
--border: #f0ece6;
--radius: 20px;
```

---

## 3. Structure de la Page

### Section 1 — Header fixe
- Logo (icône violet + texte "FamilyApp")
- Nav : Fonctionnalités · Tarifs · Témoignages · FAQ
- Bouton "Connexion" (outline violet)
- Bouton "Essai gratuit" (gradient violet, box-shadow)
- Sticky avec `backdrop-filter: blur(12px)` au scroll
- Menu hamburger mobile

### Section 2 — Hero
**Layout :** 2 colonnes (texte gauche, visuals droite)

**Texte :**
- Badge social proof : "⭐ +2 000 familles organisées en France"
- H1 : "L'organisation familiale **enfin fun** pour petits et grands"
- Sous-titre : 2 lignes max, liste des features clés
- CTA primaire vert : "🎁 Essai gratuit 30 jours"
- CTA secondaire ghost : "Voir une démo ▶"
- Trust : "✓ Sans engagement · ✓ Sans CB · ✓ 🇫🇷 Made in France"

**Visuals (CSS pur, pas d'images) :**
- **Tablette** (gauche, bas) : mockup dashboard parent avec 4 cartes enfants (Emma, Lucas, Léa + prochain événement), barres de progression colorées
- **Téléphone** (droite, premier plan) : mockup app Fammily avec salutation, liste de tâches cochables, cagnotte avec barre de progression, dernière note Pronote avec bonus

### Section 3 — Bande preuve sociale (fond violet)
- 🏠 2 000+ familles
- ⭐ 4,9/5 de moyenne
- 🎁 30 jours d'essai gratuit
- 🇫🇷 Made in France
- 🔒 RGPD compliant

### Section 4 — Features (6 cards)
Grid 3×2, fond blanc/crème.

| Feature | Icône couleur | Badge plan |
|---|---|---|
| Tâches & routines | Violet `#ede9fe` | Essentiel |
| Calendrier partagé | Vert `#d1fae5` | Essentiel |
| Cagnotte virtuelle | Ambre `#fef3c7` | Essentiel |
| App Fammily (enfants) | Rose `#fce7f3` | Essentiel |
| Temps d'écran intelligent | Rouge `#fee2e2` | Premium |
| Suivi Pronote intégré | Bleu `#dbeafe` | Premium |

**Comportement card :** hover → `translateY(-4px)` + ombre + barre top violet en `scaleX(1)`

### Section 5 — Split Parent / Enfant (fond gradient violet)
- Fond : `linear-gradient(135deg, #667eea, #764ba2, #f093fb)`
- Texte blanc : "Parents sereins. Enfants motivés."
- Liste de 5 features avec checkmarks blancs
- Visuel : 2 cards glassmorphisme "Dashboard parent" ↔ "App Fammily"

### Section 6 — Gamification (fond dégradé crème)
4 cards horizontales :
- 🔥 Séries de régularité
- ⭐ Points & badges
- 💰 Cagnotte virtuelle
- 🎓 Bonus scolaires

### Section 7 — Pricing
- Titre : "Commencez gratuitement, évoluez à votre rythme"
- Toggle mensuel / annuel (JS)
- 2 plans côte à côte, max-width 760px centré
- Plan "Premium" : badge "⭐ Plus populaire", border violet, ring violet subtil

| | Essentiel | Premium |
|---|---|---|
| Mensuel | 3,90€/mois | 7,90€/mois |
| Annuel | 39€/an (-10€) | 79€/an (-20€) |

### Section 8 — Témoignages
- 6 cards en grid 3×2
- Guillemet décoratif en fond (CSS `::before`)
- Avatar initiales colorées (gradient violet)
- Stars en doré `#fbbf24`

### Section 9 — FAQ (accordéon)
**Objectif SEO :** balisage `schema.org/FAQPage` en JSON-LD

5 questions :
1. L'essai gratuit est-il vraiment sans engagement ?
2. Combien d'enfants peut-on ajouter ?
3. Comment fonctionne l'intégration Pronote ?
4. Le module temps d'écran nécessite-t-il du matériel ?
5. Mes données sont-elles sécurisées ?

### Section 10 — CTA Final
- Fond : gradient vert `#34d399 → #10b981 → #059669`
- H2 : "Prêt à transformer votre quotidien ?"
- Bouton blanc avec texte vert
- Note : "✓ 30 jours gratuit · ✓ Sans CB · ✓ Installation en 2 minutes"

### Section 11 — Footer
- Fond : `#0f0f1a` (dark navy)
- Grid 4 colonnes : Brand + tagline · Produit · Entreprise · Légal
- Bottom bar : copyright + "🇫🇷 Made in France with ❤️"

---

## 4. SEO

### Balises meta
```html
<title>FamilyApp — L'organisation familiale gamifiée | Essai gratuit 30 jours</title>
<meta name="description" content="Gérez les tâches, le calendrier, Pronote et le temps d'écran de toute la famille. Parents sereins, enfants motivés. Essai gratuit 30 jours sans CB.">
```

### Open Graph & Twitter Cards
Balises OG complètes avec image dédiée `og-image.jpg` (1200×630px).

### Schema.org JSON-LD
Deux blocs :
1. `SoftwareApplication` — nom, description, prix, rating agrégé
2. `FAQPage` — toutes les questions de la section FAQ

### Structure sémantique
- 1 seul `<h1>` dans le hero
- `<h2>` pour chaque titre de section
- `<h3>` pour les titres de cards
- `<nav>` sémantique dans le header
- `<main>`, `<header>`, `<footer>`, `<section>`, `<article>` appropriés
- `alt` descriptif sur toutes les images

### Performance (Lighthouse cible : 95+)
- Pas de framework JS, pas de dépendances externes hormis Google Fonts
- Google Fonts avec `preconnect` + `display=swap`
- CSS minifié pour la production
- JS minimal et non-bloquant (`defer`)
- Images optimisées (WebP avec fallback JPG)
- Pas de render-blocking resources

### Fichiers SEO supplémentaires
- `sitemap.xml` — index du site
- `robots.txt` — `Allow: /`, `Sitemap:` pointer
- `/.well-known/` si nécessaire

---

## 5. Structure des Fichiers

```
/Users/admin/Developpement/familiapp-landing/
├── index.html              # Landing page principale
├── register.html           # Page d'inscription (redirect vers l'app)
├── terms/
│   └── index.html          # CGU
├── privacy/
│   └── index.html          # Politique de confidentialité
├── sitemap.xml
├── robots.txt
├── css/
│   ├── style.css           # Styles principaux (CSS custom properties)
│   └── style.min.css       # Version minifiée (prod)
├── js/
│   ├── main.js             # Interactions : header scroll, FAQ accordion, pricing toggle, mobile menu
│   └── main.min.js         # Version minifiée (prod)
├── images/
│   ├── favicon.png
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.jpg        # 1200×630 pour Open Graph
│   └── ...
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-04-landing-page-design.md
```

---

## 6. JavaScript — Comportements Interactifs

### Header scroll
```js
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});
```

### Menu mobile (hamburger)
Toggle de classe `.mobile-active` sur `<nav>`, fermeture au clic sur un lien.

### FAQ accordéon
Clic sur `.faq-q` → toggle `.open` sur `.faq-item`, animation CSS `max-height`.

### Toggle pricing mensuel/annuel
Deux boutons (`#toggle-monthly` / `#toggle-annual`) swappent les prix affichés via `data-monthly` et `data-annual` sur les éléments `.price-amount`.

### Smooth scroll
`scroll-behavior: smooth` en CSS + gestion JS pour l'offset du header fixe.

### CTA → App
Tous les boutons "Essai gratuit" et "Connexion" redirigent vers l'URL de l'app (`https://app.family-app.fr` ou subdomain approprié).

---

## 7. Responsive Design

| Breakpoint | Layout |
|---|---|
| `< 640px` (mobile) | 1 colonne, menu hamburger, phone mockup seul visible |
| `640px–1024px` (tablet) | 2 colonnes hero simplifiées, grid features 2×3 |
| `> 1024px` (desktop) | Layout complet tel que décrit |

Pas de media query overrides complexes — layout CSS Grid/Flexbox adaptatif par défaut.

---

## 8. Animations CSS

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- Hero content : `fadeInUp` 0.5s au chargement
- Cards features : `fadeInUp` au scroll via `IntersectionObserver` (JS)
- Hover sur cards : `transform: translateY(-4px)`, `box-shadow` — transition 0.3s
- FAQ accordéon : `max-height` + `opacity` transition

---

## 9. Décisions explicites

| Décision | Choix | Raison |
|---|---|---|
| Framework | Aucun (vanilla) | Performance max, déploiement simple FTP/Infomaniak, 0 dépendance |
| Mockups app | CSS pur (pas de screenshots) | Pas de setup photo requis, reproductible, responsive |
| Icônes features | Emojis dans des `div` colorés | Compatibilité universelle, pas de dépendance icon library |
| CSS | Custom properties + classes BEM light | Maintenable sans build step |
| Animations au scroll | IntersectionObserver | Performant, pas de bibliothèque tierce |
| Minification | Manuelle ou via script simple | Pas de bundler nécessaire |
