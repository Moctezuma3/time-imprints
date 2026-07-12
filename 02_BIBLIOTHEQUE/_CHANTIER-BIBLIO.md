# Chantier bibliothèque — journal des changements

> Fichier de suivi temporaire. On corrige la biblio « au marteau » (suppressions / fusions / déplacements / refontes), puis on fera **une passe de peaufinage** : MANIFEST.json, métadonnées `lib:*` internes (`id`, `categorie`, `path`), dossiers vides.
> Dernière mise à jour : 2026-07-07

---

## 🏛️ Taxonomie cible (décidée) — orga PAR COMPOSANT TECHNIQUE

> Cible de la migration : `SECTIONS/nvl-orga/` a vocation à **remplacer** `SECTIONS/milieu-du-site/` (à terme : finir migration → supprimer l'ancien → renommer `nvl-orga` en `milieu-du-site`).

### ⭐ Règle d'or (convention anti-doublon)
**Une seule maison par section. En cas d'ambiguïté, la catégorie « type de CONTENU » l'emporte sur la catégorie « MISE EN PAGE ».**
- **Contenu (prioritaire)** : faq · tarifs · avant-apres · comparatif · stats · testimonials · galerie · timeline · partenaires-logo · carte-localisation · formulaire · quiz-configurateur · blog-reseaux-sociaux · citations(NON créée)
- **Mise en page (par défaut, si aucun contenu ne matche)** : accordeon · carrousel · grid · tabs · bento · split-texte-media · bandeau · bandeau-defilant · separateur · listes

### Arbitrages actés (croisements)
- **image dans un slider** (gallery-carousel, gallery-cover-flow) → **galerie** (carrousel = seulement services/produits/avis en slider)
- **FAQ en liste/table** (faq-table-minimal) → **faq** (pas listes)
- **pricing en onglets/table** → **tarifs** (pas tabs/comparatif)
- `listes` = liste verticale d'items (puces/coches/lignes), **sans cartes** (→ grid) **ni panneaux dépliables** (→ accordeon). Définition stricte = 0 croisement.

### Décisions de catégories
- ❌ `citations` : NON créée (trop peu utilisée)
- ✅ `listes` : créée, définition stricte (3 fichiers : anti-services, guarantees-checklist, values-ecogestures-checked)
- 🆕 créés dans nvl-orga : `faq`, `tarifs`, `quiz-configurateur`, `bandeau-defilant`, `listes`
- `grid` et `tabs` : noms conservés tels quels (EN)
- Nommage : règle « EN court si terme dev reconnu (grid, tabs, bento, stats, faq), FR sinon » — **à figer** ; renommages en attente : `partenaires-logo`→`logos-partenaires` ? / `testimonials`→`temoignages` ? (non tranché)

### ⚠️ Conséquence : les métadonnées deviennent la pièce maîtresse
Le rangement étant technique, le *sens* (services, équipe, garanties…) n'est plus dans l'arbo → il DOIT vivre dans `lib:intention` + un tag « rôle » de chaque fichier, sinon la recherche par usage à l'assemblage ne tient pas. **→ audit métadonnées obligatoire au peaufinage.**

---

## 🔧 À corriger dans la passe de peaufinage (résumé actionnable)

- [ ] **MANIFEST.json** : retirer toutes les entrées des fichiers **supprimés** (voir liste ci-dessous).
- [ ] **MANIFEST.json** : mettre à jour `path` + `categorie` des 14 fichiers **déplacés** `bandeaux-logos → bandeaux-defilants`.
- [ ] **Fichiers déplacés** : décider si on renomme `id`/fichier `bandeaux-logos_*` → `bandeaux-defilants_*` (+ `lib:categorie`), ou si on garde l'`id` d'origine.
- [ ] **Dossier `bandeaux-logos/`** : désormais **vide** → à supprimer.
- [ ] **MANIFEST.json** : resynchroniser `tags`/`utilite`/`anatomie` des 4 fichiers **avant/après** refondus (comparateur à poignée). Les métas *internes* des fichiers sont déjà à jour.
- [x] ~~**Migration nvl-orga** : ventiler `A PLACER` selon la règle d'or ; dissoudre le doublon `milieu-du-site/accordeons`~~ ✅ FAIT (voir §« Croisements résolus » plus bas)
- [x] ~~supprimer les dossiers vides `milieu-du-site` + `nvl-orga/A PLACER`~~ ✅ FAIT (22 dossiers vides supprimés)
- [ ] **`_backup-cartes-en-grille-avant-sortieB` (27 fichiers)** : seul résidu dans `milieu-du-site/` — décision en attente (garder / déplacer hors biblio / supprimer).
- [x] ~~**Métadonnées** : MAJ `id`/`categorie` pour tous les fichiers déplacés vers nvl-orga~~ ✅ FAIT — 143 fichiers : `lib:id` + `lib:categorie` alignés sur le dossier réel, 135 fichiers renommés (règle « swap simple » : ancien préfixe → nom du dossier). 0 incohérence, `lib:groupe`=milieu-du-site partout, tous champs clés présents.
- [x] ~~**Métadonnées (pass 2)** : ajouter un rôle sémantique sur chaque section milieu~~ ✅ FAIT — champ `<meta name="lib:role">` sur les **143 fichiers milieu** (vocabulaire de 26 rôles : services, équipe-apropos, garanties, avis, tarifs, produits, valeurs, audiences, réalisations, chiffres, process, contact-localisation, faq, comparatif, quiz-estimateur, blog-medias, galerie, cta, formulaire, logos, avant-apres, bénéfices, problème, pédagogie, citation, séparateur). Classification auto par mots-clés (scripts `scratchpad/classify_roles.py` + `apply_roles.py`) + 10 corrections manuelles. MANIFEST régénéré avec le champ `role`. NB : haut/bas/interactions non taggés (leur catégorie = leur rôle).
- [ ] **MANIFEST.json** : régénérer entièrement à partir des nouveaux `path`/`id`/`categorie`.
- [x] ~~**Promotion** : renommer `SECTIONS/nvl-orga` → `SECTIONS/milieu-du-site`~~ ✅ FAIT — ancien `milieu-du-site` vidé (backup conservé, riding), contenu déplacé, `nvl-orga` supprimé. `milieu-du-site` = 21 catégories (143) + `_backup` (27). `lib:groupe`=milieu-du-site était déjà bon partout.
- [x] ~~**MANIFEST.json** : régénérer~~ ✅ FAIT — générateur Python (`scratchpad/gen_manifest.py`) qui scanne l'arbo (hors `_backup`) et reconstruit le JSON au schéma d'origine (+ champ `auteur` quand présent). **247 sections** (bas 15 · haut 31 · interactions 58 · milieu 143), 0 réf morte, JSON validé. Ancien sauvegardé en `MANIFEST.json.bak-20260708`. `split-texte-media_services-stack-images` → `grid`.
- [ ] **Nommage** : trancher `partenaires-logo`→`logos-partenaires` et `testimonials`→`temoignages` (ou garder EN).

---

## ✅ Croisements résolus (règle d'or appliquée) — migration nvl-orga

Doublon `milieu-du-site/accordeons` supprimé. `A PLACER` vidé. Déplacements effectués :
- **→ faq** : 6 accordeons_faq-* (+ pricing-faq) + onglets_faq-categorized + listes_faq-table-minimal = **8**
- **→ tarifs** : 3 tableaux-comparatifs_pricing-* = **3**
- **→ quiz-configurateur** : audience-quiz, estimator-pack-selector, configurator-quizz, estimator-budget-slider, estimator-options-checklist = **5**
- **→ testimonials** : carrousels_testimonials-split-auto, blog-medias_testimonials-video, citations_about-founder-quote *(compromis : quote fondateur, pas un avis client — à réévaluer)*, citations_casestudy-quote-result
- **→ partenaires-logo** : bandeaux-logos_awards-badges, guarantees-seals
- **→ bandeau-defilant** : social-marquee, area-banner-cities, divider-marquee
- **→ galerie** : carrousels_gallery-cover-flow
- **→ blog-reseaux-sociaux** : social-feed-grid, social-wall-ugc, blog-medias_team-video
- **→ comparatif** : onglets_compare-toggle-columns
- **→ grid** : cartes-en-grille_benefits-sticky-stacking
- **→ listes** : anti-services, guarantees-checklist, values-ecogestures-checked
- **→ split-texte-media** *(dossier créé)* : services-stack-images

Conservés en place (recos §3 validées) : `bento/gallery-bento`, `bandeau/trust-rating-summary`, `bandeau/trust-reviews-mini`, `timeline/problem-scroll-reveal`.

**Fusion `bandeau-defilant` (dossier supprimé)** : `social-marquee` + `area-banner-cities` → `bandeau` ; `divider-marquee` → `separateur`. Tag `defilant` ajouté aux 3. Principe : le marquee est un tag, pas un dossier (cf. dissolution de `tabs`). → `bandeau` = 15, `separateur` = 4. **La taxo milieu passe à 22 catégories.**

**Catégorie `tabs` dissoute** : `onglets_services-tabs` → `carrousel`, dossier `tabs` supprimé. ⚠️ à retenir : un onglet rangé dans carrousel (mismatch technique assumé par Nicolas) → **le tag pattern `onglets` doit rester dans les métadonnées**.

**Compromis founder-quote → testimonials : validé par Nicolas** (ne le gêne pas).

**État après migration (143 fichiers)** — catégories fines à surveiller : `split-texte-media` (1), `bento` (2), `accordeon` (4), `bandeau-defilant` (3), `listes` (3), `tarifs` (3), `separateur` (3).

---

## 🗑️ Suppressions

### haut-du-site/heros
- heros_hero-split-media.html
- heros_hero-interactive-3d.html
- heros_hero-split-screen-scroll.html
- heros_hero-text-reveal-sequential.html
- heros_hero-video-scrub.html
- heros_hero-split-screen-overlay.html
- heros_hero-centered-minimal.html
- heros_hero-cursor-lerp.html
- heros_hero-image-accordion.html

### haut-du-site/navbars
- navbars_nav-sticky-hide.html
- navbars_nav-scrollspy.html

### milieu-du-site/accordeons
- accordeons_audience-accordion-profiles.html
- accordeons_faq-accordion.html
- accordeons_problem-accordion.html
- accordeons_guarantees-accordion.html
- accordeons_pedagogy-faq-learn.html
- accordeons_faq-objections.html
- accordeons_faq-cards-icon-header.html

### milieu-du-site/bandeaux-confiance
- bandeaux-confiance_trust-badges.html

### milieu-du-site/bandeaux-logos
- bandeaux-logos_integrations-hub.html
- bandeaux-logos_values-partners-solidarity.html
- bandeaux-logos_certifications-badges.html

### milieu-du-site/bandeaux-cta
- bandeaux-cta_solution-single-focus.html
- bandeaux-cta_urgency-hours-status.html
- bandeaux-cta_urgency-sticky-call.html
- bandeaux-cta_cta-growth-band.html
- bandeaux-cta_cta-marquee-vertical.html
- bandeaux-cta_cta-split-marquee.html
- bandeaux-cta_social-cta-follow.html

### milieu-du-site/bandeaux-defilants
- bandeaux-defilants_manifesto-keywords-marquee.html

### milieu-du-site/carrousels
- carrousels_services-spotlight-single.html
- carrousels_testimonials-people-slider.html
- carrousels_gallery-carousel.html

### milieu-du-site/cartes-en-grille (15 supprimés, 12 restants)
- cartes-en-grille_about-values-grid.html
- cartes-en-grille_values-pillars-columns.html
- cartes-en-grille_benefits-grid-icons.html
- cartes-en-grille_urgency-cards.html
- cartes-en-grille_team-departments.html
- cartes-en-grille_solution-3-pillars.html
- cartes-en-grille_services-numbered-media.html
- cartes-en-grille_services-feature-cards-image.html
- cartes-en-grille_services-cards-hover.html
- cartes-en-grille_services-cards-3col.html
- cartes-en-grille_services-bouncy-cards.html
- cartes-en-grille_products-grid.html
- cartes-en-grille_manifesto-numbered-credo.html
- cartes-en-grille_problem-cards.html
- cartes-en-grille_benefits-hover-cards.html

### milieu-du-site/cartes-localisation (8 supprimés, 5 restants)
- cartes-localisation_location-contact-compact.html
- cartes-localisation_location-directions.html
- cartes-localisation_location-hours-grid.html
- cartes-localisation_area-communes-grid.html
- cartes-localisation_area-list-cantons.html
- cartes-localisation_area-radius.html
- cartes-localisation_location-banner-based.html
- cartes-localisation_location-cards.html

### milieu-du-site/chiffres-cles (14 supprimés, 12 restants)
- chiffres-cles_divider-stats-strip.html
- chiffres-cles_pedagogy-stat-callouts.html
- chiffres-cles_casestudy-live-results.html
- chiffres-cles_casestudy-featured.html
- chiffres-cles_stats-kpi-cards.html
- chiffres-cles_stats-decorative-bg.html
- chiffres-cles_stats-countup.html
- chiffres-cles_stats-activity-bars.html
- chiffres-cles_solution-benefit-proof.html
- chiffres-cles_social-counters.html
- chiffres-cles_benefits-stat-cards.html
- chiffres-cles_urgency-countdown.html
- chiffres-cles_team-join-cta.html
- chiffres-cles_stats-progress.html

### milieu-du-site/citations (10 supprimés, 3 restants)
- citations_about-manifesto.html
- citations_divider-pinned-statement.html
- citations_divider-quote-fullwidth.html
- citations_manifesto-bigtext.html
- citations_manifesto-founder-quote.html
- citations_manifesto-fullscreen-statement.html
- citations_manifesto-word-reveal.html
- citations_problem-quote-pull.html
- citations_solution-statement.html
- citations_testimonials-featured.html

### milieu-du-site/formulaires (6 supprimés, 8 restants)
- formulaires_contact-booking.html
- formulaires_area-zipcode-check.html
- formulaires_urgency-callback-form.html
- formulaires_newsletter-inline.html
- formulaires_newsletter-band.html
- formulaires_cta-with-form.html

### milieu-du-site/galeries-images (2 supprimés, 6 restants)
- galeries-images_gallery-music-portfolio.html
- galeries-images_gallery-masonry-lightbox.html

### milieu-du-site/grilles-bento (4 supprimés, 2 restants)
- grilles-bento_services-bento.html
- grilles-bento_cta-split-gallery-bento.html
- grilles-bento_testimonials-mosaic.html
- grilles-bento_testimonials-bento-logo.html

### milieu-du-site/listes-et-checklists (9 supprimés, 5 restants)
- listes-et-checklists_pedagogy-glossary.html
- listes-et-checklists_pricing-quote-cta.html
- listes-et-checklists_pricing-single-highlight.html
- listes-et-checklists_problem-list-checks.html
- listes-et-checklists_services-numbered-list.html
- listes-et-checklists_team-list-rows.html
- listes-et-checklists_values-charter-credo.html
- listes-et-checklists_benefits-numbered.html
- listes-et-checklists_manifesto-values-list.html

### milieu-du-site/onglets (5 supprimés, 3 restants)
- onglets_casestudy-tabs.html
- onglets_pedagogy-concept-tabs.html
- onglets_problem-vs-solution-toggle.html
- onglets_audience-tabs.html
- onglets_audience-toggle-content.html

### milieu-du-site/quiz-configurateurs (6 supprimés, 5 restants)
- quiz-configurateurs_estimator-express-3clicks.html
- quiz-configurateurs_estimator-price-calculator.html
- quiz-configurateurs_estimator-surface-calculator.html
- quiz-configurateurs_pricing-addons.html
- quiz-configurateurs_problem-cost-of-inaction.html
- quiz-configurateurs_configurator-multistep.html

### milieu-du-site/split-texte-media (17 supprimés, 1 restant)
- split-texte-media_manifesto-split-image.html
- split-texte-media_pedagogy-explainer.html
- split-texte-media_problem-breakdown-split.html
- split-texte-media_problem-split-empathy.html
- split-texte-media_products-featured-split.html
- split-texte-media_products-showcase-3d.html
- split-texte-media_solution-diagram.html
- split-texte-media_solution-image-text-alt.html
- split-texte-media_solution-problem-to-solution.html
- split-texte-media_values-commitment-split.html
- split-texte-media_about-complete.html
- split-texte-media_audience-split-paths.html
- split-texte-media_audience-two-columns.html
- split-texte-media_benefits-alternating.html
- split-texte-media_casestudy-cards.html
- split-texte-media_cta-split-image.html
- split-texte-media_gallery-parallax-feature.html

### milieu-du-site/tableaux-comparatifs (7 supprimés, 6 restants)
- tableaux-comparatifs_products-compare-models.html
- tableaux-comparatifs_compare-before-after-table.html
- tableaux-comparatifs_guarantees-promises-compare.html
- tableaux-comparatifs_compare-us-vs-them.html
- tableaux-comparatifs_compare-tradeoff-split.html
- tableaux-comparatifs_compare-price-table.html
- tableaux-comparatifs_compare-plan-cards.html

### nvl-orga/grid (réorg en cours par Nicolas)
- cartes-en-grille_services-people-cards.html

### milieu-du-site/timelines (10 supprimés, 7 restants)
- timelines_casestudy-timeline.html
- timelines_solution-method-steps.html
- timelines_process-visualization.html
- timelines_process-timeline-vertical.html
- timelines_process-numbered-line.html
- timelines_process-illustrated.html
- timelines_process-grid-icons.html
- timelines_process-cards.html
- timelines_pedagogy-steps-science.html
- timelines_pedagogy-diagram.html

---

## 📦 Déplacements / fusions

### bandeaux-logos → bandeaux-defilants (fusion, fait manuellement par Nicolas)
Dossier `bandeaux-logos/` vidé. Les 14 fichiers suivants sont maintenant dans `bandeaux-defilants/` mais gardent encore leur préfixe/`id`/`categorie` = `bandeaux-logos` :
- bandeaux-logos_awards-badges.html
- bandeaux-logos_casestudy-logos-results.html
- bandeaux-logos_guarantees-seals.html
- bandeaux-logos_logos-grid.html
- bandeaux-logos_logos-hover-label.html
- bandeaux-logos_logos-marquee-double.html
- bandeaux-logos_logos-marquee-slow.html
- bandeaux-logos_logos-perspective-3d.html
- bandeaux-logos_logos-ruler-carousel.html
- bandeaux-logos_partners-featured.html
- bandeaux-logos_press-logos.html
- bandeaux-logos_trust-logos-strip.html
- bandeaux-logos_trust-marquee.html
- bandeaux-logos_trust-press-mentions.html

---

## ➕ Nouvelles sections créées (par Claude, sur demande)

> **Convention de nommage** : les sections générées par Claude sont préfixées `[CLAUDE]_` **uniquement dans le nom de fichier**. Le `lib:id` reste propre (SANS préfixe) — donc ici nom de fichier ≠ id. Provenance aussi tracée via `<meta name="lib:auteur" content="CLAUDE (généré sur demande)">`. → au MANIFEST, référencer par le `lib:id` propre.

### bas-du-site/pieds-de-page (3 footers ajoutés)
- `[CLAUDE]_pieds-de-page_footer-lang-switcher.html` — footer riche + sélecteur de langue FR/DE/IT/EN (met à jour `html lang`), pour la Suisse plurilingue. Sombre.
- `[CLAUDE]_pieds-de-page_footer-contact-hours.html` — contact + horaires d'ouverture (jour courant surligné en JS) + boutons Appeler/Itinéraire, sans carte. Clair.
- `[CLAUDE]_pieds-de-page_footer-trust-badges.html` — bandeau de badges (paiement, certifications, note d'avis, garantie) + colonnes. Sombre.

Style maison respecté : bloc `lib:meta`, police Outfit, tokens `:root`, reveal `.wf-rev` + IntersectionObserver, hover souligné, `prefers-reduced-motion`, responsive.

### haut-du-site/navbars (3 navbars ajoutées, ÉLEVÉES « wow », toutes avec hamburger mobile accessible)
Principe acté : [[feedback-library-wow-only]] — pas de navbar plate. Chacune a un effet signature :
- `[CLAUDE]_navbars_nav-sticky-simple.html` — **pilule de surbrillance glissante** entre les liens (façon Webflow) + CTA à **remplissage circulaire depuis le curseur** + panneau mobile en cascade.
- `[CLAUDE]_navbars_nav-logo-centered.html` — logo **révélé lettre par lettre** + **trait qui se trace** + **liens magnétiques** + CTA encre.
- ~~`[CLAUDE]_navbars_nav-topbar-announce.html`~~ — **supprimée par Nicolas** (finalement retirée).
Hamburger commun : bouton `aria-expanded`/`aria-controls`, fermeture Échap + clic extérieur, liens du panneau en cascade, `prefers-reduced-motion` neutralise pilule/disque/magnétisme/rotation.

### milieu-du-site/grid (1 section ajoutée)
- `[CLAUDE]_grid_features-swap-columns.html` — features à **colonnes qui s'échangent** (FLIP horizontal + fondu-montée), onglets, d'après *Swap Column Features* de hover.dev. role=`services`. NB : c'est techniquement un split-texte-média mais cette catégorie a été supprimée → rangé en `grid` sur choix de Nicolas. → grid=13, MANIFEST=248.

### Audit hamburger mobile des navbars existantes
- OK : nav-breadcrumb, nav-floating-pill, nav-staggered, nav-transparent-solid.
- **Corrigé** : `navbars_nav-megamenu-hover.html` — n'avait PAS de hamburger (les 6 liens passaient à la ligne). Ajout d'un burger accessible + panneau mobile (liens construits en JS depuis les entrées de nav) + MAJ métadonnée responsive.
- **Exception à trancher** : `navbars_nav-sidebar.html` = sidebar portfolio (la liste de projets EST le contenu). Sur mobile elle s'empile. Hamburger forcé ou exemption → **en attente de décision Nicolas**.

---

## ✏️ Refontes de contenu

### milieu-du-site/heros/heros_hero-split-screen-overlay.html — (⚠️ ensuite SUPPRIMÉ)
- Surtitre retiré + passage en niveaux de gris neutres. Fichier supprimé plus tard → sans objet.

### milieu-du-site/avant-apres — 4 fichiers : duo d'images collées → comparateur à poignée glissante
Modèle : `avant-apres_beforeafter-slider.html` (inchangé). Métas *internes* (`tags`/`utilite`/`anatomie`) déjà mises à jour ; reste à resynchroniser le MANIFEST.
- avant-apres_beforeafter-grid.html
- avant-apres_beforeafter-stack-scroll.html
- avant-apres_beforeafter-tabs-cases.html
- avant-apres_beforeafter-carousel-pairs.html
