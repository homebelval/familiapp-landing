# AUDIT-LANDING.md — family-app.fr
> Audit pré-commercialisation · 11 juin 2026 · Lecture seule

---

## 0. STACK & STRUCTURE

**Type :** Site statique HTML/CSS/JS vanilla (aucun framework front-end détecté)  
**Build :** npm + PostCSS/cssnano (CSS) + Terser (JS)  
**Hébergement déclaré :** Infomaniak Network SA, Genève (Suisse)  
**Backend app :** Firebase / Google Cloud (Belgique, selon politique de conf.)  
**CDN traceurs :** Google Tag Manager `GTM-MDLG8DBD` (conditionnel au consentement)  
**Fonts externes :** Google Fonts (Inter) — chargées directement, voir finding #13  

```
/
├── index.html              Landing principale (775 lignes)
├── robots.txt
├── sitemap.xml             6 URLs réelles (≠ 38 indiqué par l'agent — le fichier en contient 6)
├── package.json
├── og-image-TODO.txt       ⚠ TODO non résolu (voir #17)
├── css/style.css           (1 816 lignes)
├── js/main.js + cookie-consent.js
├── images/                 og-image.svg, app-screenshot.png, favicon, logo…
├── legal/index.html        Mentions légales
├── privacy/index.html      Politique de confidentialité (màj 11/02/2026)
├── terms/index.html        CGU (màj 11/02/2026)
├── blog/                   Index + 4 articles
├── beta/index.html         (noindex/nofollow)
├── waitlist/ + register.html  Redirections vers hub.family-app.fr
└── docs/superpowers/       Plans & specs internes (exposés publiquement)
```

---

## 1. VERDICT GLOBAL

**Note : 4 / 10 — Non prête pour la commercialisation**

Plusieurs bloquants juridiques et commerciaux doivent être corrigés avant toute mise en vente : des sous-traitants réels (Cloudflare, Stripe, Google Analytics) sont absents de la politique de confidentialité, les déclarations cookies sont inexactes dans deux documents légaux, un témoignage décrit une feature marquée « Bientôt disponible », le calcul des tarifs annuels est erroné pour trois plans sur quatre, et le document `og-image-TODO.txt` confirme que l'image Open Graph n'est pas finalisée. La partie technique (HTTPS, accessibilité de base, consentement conditionnel GTM) est solide ; ce sont les dimensions conformité et cohérence promesses/réalité qui bloquent.

---

## 2. FINDINGS PAR DIMENSION

| ID | Dim. | Sév. | Fichier:ligne | Description | Recommandation |
|----|------|------|---------------|-------------|----------------|
| F01 | Conformité | 🔴 | `privacy/index.html:299-303` | **Sous-traitants manquants.** La section 7.1 ne liste que Firebase et Google OAuth. Cloudflare (USA, DNS réel selon contexte produit), Stripe (USA, paiement réel) et Google Analytics/GTM ne figurent pas. Art. 13 & 28 RGPD imposent la liste exhaustive des sous-traitants. | Ajouter Cloudflare, Stripe et Google Analytics (GTM-MDLG8DBD) dans la section 7 avec leur rôle, leur pays et un lien vers leurs propres garanties RGPD. |
| F02 | Conformité | 🔴 | `legal/index.html:210-211` `privacy/index.html:360` | **Déclaration cookies mensongère.** Les deux documents affirment catégoriquement « Aucun cookie publicitaire ou de tracking n'est utilisé. » GTM-MDLG8DBD est pourtant chargé (conditionnel, mais bien tracking analytics). L'affirmation absolue est factuellement fausse. | Remplacer par : « Nous n'utilisons aucun cookie publicitaire ou de tracking *sans votre consentement préalable*. Si vous acceptez, Google Analytics (via GTM) est activé. » |
| F03 | Promesses/Réalité | 🔴 | `index.html:522-526` | **Témoignage impossible.** Julien Dubois (Lyon) décrit l'intégration Pronote comme fonctionnelle (« L'intégration Pronote est un game-changer »). Or Pronote est marqué **« 🕐 Bientôt disponible »** dans les plans (`index.html:477,491`). Le produit n'étant pas disponible, ce témoignage ne peut pas être authentique. Pratique commerciale trompeuse (Art. L. 121-2 Code de la consommation). | Supprimer ou remplacer ce témoignage. Ne publier que des témoignages vérifiables d'utilisateurs réels de features disponibles. |
| F04 | Promesses/Réalité | 🔴 | `index.html:248` | **Microsoft Outlook annoncé sans base.** La carte Calendrier indique « Synchronisé Google & Outlook ». Ni la politique de confidentialité ni les CGU ne mentionnent Microsoft/Outlook ni de scope OAuth Microsoft. Si l'intégration n'existe pas, c'est une allégation fausse. À vérifier. | Si non implémenté : retirer « & Outlook » de la carte feature. Si implémenté : documenter le scope Microsoft OAuth dans privacy/terms et ajouter Microsoft parmi les sous-traitants. |
| F05 | Tarifs | 🔴 | `index.html:433,437` | **Calcul tarifaire erroné — Family Plus.** 5,99 €/mois × 12 = 71,88 €. Le prix annuel affiché est **79,90 €/an**, soit 11 % *plus cher* que le mensuel × 12. L'affichage « −2 mois offerts » sur le toggle (`index.html:400`) est donc faux pour ce plan. | Corriger le prix annuel Family Plus à ≤ 59,90 € (2 mois offerts réels) ou supprimer l'affirmation « 2 mois offerts » de ce plan. |
| F06 | Conformité | 🟠 | `legal/index.html:171-177` | **Mentions légales incomplètes (LCEN).** HUXA est identifié sans SIRET/SIREN, sans forme juridique, sans capital social, sans adresse précise. La LCEN (art. 6 III-1) exige ces informations pour toute personne morale éditant un site commercial. L'email de contact légal est une adresse Gmail (`app.familiale@gmail.com`). | Ajouter : numéro SIRET, forme juridique (SASU, SAS…), capital, RCS d'immatriculation, adresse complète. Utiliser une adresse email en `@family-app.fr` pour le contact légal. |
| F07 | Promesses/Réalité | 🟠 | `index.html:125-127` | **Hero présente des features non disponibles comme actuelles.** « Tâches gamifiées, calendrier partagé, **suivi Pronote et temps d'écran** — tout ce qu'il faut » (above the fold). Ces deux features sont marquées « Bientôt disponible » dans les tarifs. Un visiteur peut légitimement croire qu'elles sont incluses dans l'essai. | Reformuler ou conditionner cette phrase ; indiquer clairement quelles features sont disponibles aujourd'hui dans l'essai gratuit. |
| F08 | Promesses/Réalité | 🟠 | `index.html:589` vs `index.html:417` | **Contradiction nombre d'enfants Family Start.** La carte tarifaire indique « 1 parent + **2 enfants** » (l. 417). La FAQ indique « jusqu'à **4 profils enfants** » (l. 589). | Aligner les deux sources sur la limite réelle du plan. |
| F09 | Promesses/Réalité | 🟠 | `index.html:597-601` vs `index.html:491` | **Pronote attribué au mauvais plan dans la FAQ.** FAQ-3 répond : « Avec le plan **Family Premium**, FamilyApp se synchronise avec Pronote. » Dans les tarifs, Pronote apparaît dans **Family Premium+** (l. 491), pas dans Family Premium (l. 464-473 — absent). | Corriger la FAQ pour citer Family Premium+. |
| F10 | Conformité | 🟠 | `index.html:704-768` (JSON-LD) | **Schema.org FAQPage incohérent avec l'UI.** L. 728-731 : mentionne « un plan Gratuit complet » — inexistant dans les tarifs visibles (seulement 30 jours d'essai). L. 744-748 : « plan Gratuit jusqu'à 4 membres, Family Plus jusqu'à 8 membres » — contredit le pricing (pas de Gratuit ; Family Plus = illimité). L. 752-755 : « hébergées en Europe (Infomaniak) » — les données app sont sur Firebase/Belgique, Infomaniak n'héberge que le site vitrine. | Réécrire le JSON-LD FAQPage en cohérence avec l'UI réelle et les CGU. |
| F11 | Conformité | 🟠 | `privacy/index.html:353-360` | **Section cookies de la politique de conf. incomplète.** Ne mentionne que cookies de session, sécurité, préférence. Google Analytics (GTM) n'est pas cité. Or la section 4 mentionne « statistiques anonymisées d'usage » sans nommer l'outil. | Ajouter une ligne « Cookies analytiques (Google Analytics via GTM) : chargés uniquement après votre consentement. » |
| F12 | Conformité | 🟠 | `index.html:65-67` | **Google Fonts chargées sans consentement.** `fonts.googleapis.com` est appelé dans le `<head>`, *avant* l'affichage de la bannière de consentement. La CNIL (décision 2022, suivi par la CJUE) considère ce transfert d'adresse IP vers Google (USA) comme un traitement nécessitant consentement ou auto-hébergement. | Auto-héberger la police Inter (voir `npm i fontsource-inter`) ou charger la requête Google Fonts uniquement après consentement. |
| F13 | Promesses/Réalité | 🟠 | `index.html:275` | **École Direct annoncé sans documentation.** La carte « Suivi scolaire » indique « (Pronote, École direct…) ». École Direct n'est mentionné ni dans les CGU ni dans la politique de confidentialité. Si non implémenté, retirer cette mention. | Vérifier la réalité de l'intégration ; si absente, supprimer. Si présente, documenter comme sous-traitant. |
| F14 | Conformité | 🟠 | `index.html:619` (FAQ-5) | **Allégation « hébergé en Europe » partiellement exacte.** La FAQ répond « FamilyApp est hébergé en Europe, RGPD compliant ». Firebase (Google Cloud Platform) est une entité américaine soumise au Cloud Act US. Les serveurs sont en Belgique mais Google peut être contraint de livrer les données aux autorités US. Ce risque résiduel n'est pas mentionné. À vérifier juridiquement. | Reformuler : « hébergé sur des serveurs en Europe (Firebase/Google Cloud, Belgique). Google Cloud est soumis au droit américain (Cloud Act) — nous évaluons régulièrement l'impact sur vos données. » |
| F15 | Technique | 🟠 | `legal/index.html:247-251,259` `privacy/index.html:409-413,421` | **Liens `#` dans les footers des pages légales.** « À propos », « Support », « Cookies » pointent vers `#`. « Blog » pointe vers `#` alors que `/blog/` existe. Ces liens apparaissent dans les footers de legal/, privacy/ et terms/. | Corriger « Blog » → `/blog/`. Supprimer ou implémenter « À propos » et « Support ». Remplacer `#` pour Cookies par l'appel JS (`onclick="window.faResetCookieConsent()"`), déjà fonctionnel dans le footer principal. |
| F16 | SEO | 🟠 | `index.html:19,27` | **og:image en format SVG.** Twitter/X et plusieurs crawlers ne supportent pas les SVG pour les cartes de partage. `og-image-TODO.txt` confirme que c'est un placeholder non finalisé. | Générer une image 1 200 × 630 px en PNG/JPG (le script `scripts/generate-og.js` et `og-image-source.html` existent). |
| F17 | Technique | 🟠 | `og-image-TODO.txt` (racine) | **Fichier de travail interne exposé publiquement** dans le répertoire web racine. Indique explicitement que l'image OG est temporaire. | Supprimer du repo déployé (`.gitignore` ou dossier hors webroot). |
| F18 | Tarifs | 🟠 | `index.html:457,462` `index.html:479,484` | **« 2 mois offerts » inexact pour Family Premium et Premium+.** Premium : 9,99 × 12 = 119,88 € vs 119 €/an → économie de 0,88 € (≈ 1 jour). Premium+ : 14,99 × 12 = 179,88 € vs 167 €/an → économie de 12,88 € (≈ 0,86 mois). Le badge global « −2 mois offerts » est trompeur pour ces plans. | Recalculer les prix annuels à ≤ prix mensuel × 10 (2 mois offerts réels) ou ne pas utiliser l'accroche « −2 mois offerts » pour ces plans. |
| F19 | Promesses/Réalité | 🟠 | `index.html:512-560` | **Témoignages non vérifiables.** 6 témoignages, tous 5 étoiles, aucune identité rattachée (initiales seulement, noms génériques, pas de photo, pas de profil public). L'application est en lancement 2026 (proof band l. 216). Combiné à F03, le risque de pratique commerciale trompeuse est réel. | Soit obtenir des témoignages vérifiables (photo, lien public, accord écrit), soit signaler clairement qu'il s'agit de témoignages beta, soit les supprimer avant commercialisation publique. |
| F20 | Technique | 🟡 | `legal/index.html:129` `privacy/index.html:151` `terms/index.html` | **`cookie-consent.js` chargé sans `defer`** sur les pages légales. Render-blocking léger mais inutile. Sur la landing principale (`index.html:71`), il est correctement en `defer`. | Ajouter `defer` sur tous les `<script src="/js/cookie-consent.js">`. |
| F21 | SEO/Tech | 🟡 | `sitemap.xml:1-39` | **Sitemap ne contient que 6 URLs.** Correct (les pages légales et beta sont en noindex, donc hors sitemap est juste). Aucun bug — noter simplement que la dernière date de modification de la homepage (`2026-04-05`) est ancienne alors que des commits récents ont modifié le contenu. | Mettre à jour `<lastmod>` à chaque déploiement (intégrer dans le workflow CI). |
| F22 | SEO | 🟡 | `index.html:290` | **Stat « 8 parents sur 10 » sans source directe.** L'étude IFOP est mentionnée dans les articles de blog mais pas sur la landing (ni lien, ni date). | Ajouter la source en note ou en lien : « Source : IFOP pour [commanditaire], [année] ». |
| F23 | Performance | 🟡 | `images/` | **Images en PNG uniquement.** Aucun format WebP/AVIF. Pas de `srcset` pour les images responsives. `app-screenshot.png` a bien `loading="lazy"` mais reste en PNG. | Convertir les images en WebP (outil : `npm i sharp` ou Squoosh). Ajouter `srcset` pour les breakpoints mobiles. |
| F24 | Accessibilité | 🟡 | `index.html:82,664` | **Logo `aria-hidden="true"` avec alt vide.** Correct pour les logos décoratifs en lien (`<a>` avec texte adjacent). Vérifier que le texte du lien adjacent (« FamilyApp ») est bien rendu pour les lecteurs d'écran — ce qui est le cas ici. Pas de bug, noter pour vérification. | Aucune action requise si le lien parent a un texte accessible. |
| F25 | Promesses/Réalité | 🟡 | `index.html:629` | **FAQ-6 : « nos utilisateurs rapportent gagner 2 à 3 heures ».** Allégation non sourcée sur une app en lancement. | Indiquer la base (test beta, n= ?) ou reformuler en conditionnel. |
| F26 | Technique | 🟡 | `docs/superpowers/` | **Plans et specs internes exposés publiquement** dans le répertoire web (`/docs/superpowers/plans/`, `/docs/superpowers/specs/`). Ces fichiers décrivent la roadmap et les décisions de design. | Déplacer hors webroot ou ajouter dans `robots.txt` : `Disallow: /docs/`. |
| F27 | Conformité | 🟡 | `privacy/index.html:193-197` | **Pas de DPO désigné.** Pour une app traitant des données de mineurs, la CNIL recommande fortement la désignation d'un DPO (obligatoire si traitement à grande échelle de données sensibles). Contact actuel = email gmail non dédié. | Désigner un DPO ou référent données (peut être interne) et publier ses coordonnées. |

---

## 3. BLOQUANTS COMMERCIALISATION

Ces points doivent être résolus **avant** de débuter toute acquisition payante ou tout contrat commercial.

| Priorité | ID | Description courte |
|----------|----|--------------------|
| 1 | F01 | Sous-traitants Cloudflare, Stripe, Google Analytics absents de la politique de conf. |
| 2 | F02 | Affirmation « aucun cookie de tracking » factuellement fausse dans deux documents légaux |
| 3 | F03 | Témoignage Pronote impossible (feature non disponible) = pratique commerciale trompeuse |
| 4 | F04 | Microsoft Outlook annoncé comme feature : vérifier existence et documenter ou retirer |
| 5 | F05 | Family Plus annuel (79,90 €) est plus cher que mensuel × 12 (71,88 €) — erreur de tarif |
| 6 | F06 | Mentions légales incomplètes (LCEN) : SIRET/SIREN manquant |
| 7 | F18 | « 2 mois offerts » faux pour Premium et Premium+ |
| 8 | F19 | Témoignages tous 5 étoiles, non identifiables, app en lancement |

---

## 4. QUICK WINS (corrections rapides)

| ID | Action | Effort |
|----|--------|--------|
| F15 | Corriger liens `#` footer pages légales : Blog → `/blog/`, Cookies → `onclick=faResetCookieConsent()`, supprimer À propos / Support | 15 min |
| F16 | Générer og-image 1 200 × 630 px PNG (script existant) + mettre à jour `og:image` | 30 min |
| F17 | Supprimer `og-image-TODO.txt` du dépôt déployé | 2 min |
| F08 | Aligner FAQ et tarifs sur le nombre d'enfants Family Start | 5 min |
| F09 | Corriger FAQ-3 : remplacer « Family Premium » par « Family Premium+ » | 2 min |
| F20 | Ajouter `defer` sur `<script src="/js/cookie-consent.js">` dans les pages légales | 5 min |
| F21 | Mettre à jour `<lastmod>` de la homepage dans sitemap.xml | 5 min |
| F26 | Ajouter `Disallow: /docs/` dans robots.txt | 2 min |

---

## 5. COHÉRENCE PROMESSES LANDING vs RÉALITÉ PRODUIT

| Feature annoncée | Présence landing | Plan affiché | Disponibilité réelle | Écart |
|------------------|-----------------|--------------|---------------------|-------|
| Tâches & routines gamifiées | ✅ Hero + section features | Family Start | ✅ Disponible | Aucun |
| Calendrier partagé (Google) | ✅ Section features | Family Start | ✅ Documenté OAuth readonly | Aucun |
| **Calendrier Outlook/Microsoft** | ✅ `index.html:248` | Family Start | ❓ Non documenté dans CGU/privacy | **À vérifier — F04** |
| Cagnotte virtuelle / argent de poche | ✅ Section features | Family Start | ✅ Mentionné dans CGU | Aucun |
| App enfant Kidly | ✅ Section features | Family Start | ✅ Screenshot présent | Aucun |
| Temps d'écran (Pi/DNS) | ✅ Hero + features | Family Plus | 🕐 « Bientôt disponible » | **Feature non dispo mais présentée dès le hero — F07** |
| Suivi scolaire Pronote | ✅ Hero + features + FAQ | Family Premium / Premium+ | 🕐 « Bientôt disponible » | **Non dispo, contradictions FAQ vs tarifs — F07, F09** |
| **École Direct** | ✅ `index.html:275` | Family Premium | ❓ Non documenté | **À vérifier — F13** |
| Capsule/Capsule+ (hardware Pi) | ✅ Tarifs | Premium / Premium+ | 🕐 Plans non disponibles | Mentionné mais plans bloqués |
| **Google Analytics** | Cookie consent JS | — | ✅ Implémenté (GTM-MDLG8DBD) | **Non déclaré dans politique cookies — F01, F02, F11** |
| **Stripe (paiement)** | Non visible en landing | — | ✅ Sous-traitant réel | **Absent politique de conf. — F01** |
| **Cloudflare (DNS)** | Non visible en landing | — | ✅ Sous-traitant réel | **Absent politique de conf. — F01** |
| Hébergement Europe | ✅ FAQ, proof band | — | ✅ Firebase Belgique + Infomaniak CH | Vrai mais Cloud Act non mentionné — F14 |
| Chiffrement données | ✅ Privacy section 8 | — | ✅ TLS + Firebase at-rest | Aucun |
| RGPD compliant | ✅ Multiple | — | Partiel (sous-traitants manquants) | **Allégation incomplète — F01** |
| 2FA | ✅ Privacy section 8.2 | — | 🔜 « En développement » | Clairement signalé comme futur — OK |
| Sans carte bancaire (essai) | ✅ Hero, FAQ | Tous plans | À vérifier côté hub.family-app.fr | Non vérifiable depuis le code landing |
| « Made in France » | ✅ Hero, footer, proof band | — | ✅ HUXA, France | Aucun |

---

## 6. NOTES COMPLÉMENTAIRES

### Éléments corrects / positifs (pour mémoire)
- HTTPS strict, aucun mixed content détecté.
- GTM chargé **après** consentement explicite (implémentation cookie-consent.js correcte).
- Bouton « Tout refuser » aussi visible que « Tout accepter » — conforme CNIL.
- `robots` : landing en `index,follow` ; pages légales/beta en `noindex` — correct.
- Skip link, ARIA labels, hamburger accessible, FAQ accordion ARIA : bonne base accessibilité.
- `canonical` présent sur toutes les pages.
- Open Graph + Twitter Cards présents (hors format SVG — F16).
- Schema.org Organization + SoftwareApplication + FAQPage + BlogPosting (contenu à corriger — F10).

### Ce qui n'a pas pu être vérifié depuis le code source seul
- Existence réelle et fonctionnement de `hub.family-app.fr` (signup/login).
- Conformité effective de Stripe dans les flux de paiement.
- Si Cloudflare est réellement actif sur le DNS de `family-app.fr` (non visible dans le code HTML).
- Conditions réelles de l'essai 30 jours côté hub (renouvellement automatique ou non).
- Identité et consentement des 6 témoins (impossible à vérifier depuis le code).

---

*Rapport généré par audit statique du dépôt `/home/user/familiapp-landing` — 11 juin 2026.*  
*Aucun fichier modifié. Toutes les références sont vérifiables aux fichiers:lignes indiqués.*
