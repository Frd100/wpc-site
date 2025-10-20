# Documentation Technique - West Paris Consulting

## Introduction

Ce document a pour objectif de fournir une analyse technique complète du site web de **West Paris Consulting (WPC)**. Il s'adresse aux développeurs, aux responsables techniques et à toute personne souhaitant comprendre l'architecture, les technologies et les bonnes pratiques mises en œuvre.

## 1. Architecture Générale

Le site de West Paris Consulting est un **site statique responsive**, conçu avec une approche **Mobile First**. Il est composé de plusieurs pages HTML, d'une feuille de style CSS unique et d'un fichier JavaScript pour l'interactivité. Le site intègre également un **système de gestion de contenu (CMS)** via Pages CMS pour la gestion des actualités.

### 1.1. Arborescence des fichiers

```
wpc-site/
├── index.html                    # Page d'accueil
├── actualites.html              # Page des actualités (avec CMS)
├── article.html                 # Template pour les articles individuels
├── contact.html                 # Page de contact
├── domaines.html                # Page des domaines d'intervention
├── equipe.html                  # Page de l'équipe
├── nous-rejoindre.html          # Page de candidature
├── confidentialite.html         # Politique de confidentialité
├── exercer-mes-droits.html      # Exercice des droits RGPD
├── mentions-legales.html        # Mentions légales
├── nav.html                     # Navigation réutilisable
├── style.css                    # Feuille de style principale
├── main.js                      # JavaScript principal
├── .pages.yml                   # Configuration Pages CMS
├── robots.txt                   # Fichier pour les robots
├── sitemap.xml                  # Plan du site
├── favicon.ico                  # Icône du site
├── favicon.png                  # Icône PNG
├── apple-touch-icon.png         # Icône Apple
├── logo.svg                     # Logo vectoriel
├── linkedin.svg                 # Icône LinkedIn
├── home1.webp                   # Image d'accueil desktop
├── home2.webp                   # Image d'accueil alternative
├── homepage.webp                # Image d'accueil principale
├── homepage-mobile.webp         # Image d'accueil mobile
├── ladefense.webp               # Image La Défense
├── assets/
│   └── images/
│       └── ladefense.webp       # Images dans le dossier assets
└── content/
    └── actualites/              # Articles Markdown
        ├── 2024-09-05-decarbonation-industrie-francaise.md
        ├── 2024-09-17-transition-energetique-francaise.md
        ├── 2025-01-15-grandes-entreprises-competitivite.md
        ├── 2025-01-20-simulation-neuronale-industrie.md
        └── 2025-10-20-{slug}.md
```

### 1.2. Technologies utilisées

-   **HTML5** : Utilisation de balises sémantiques (`<header>`, `<main>`, `<nav>`, `<footer>`) pour une structure claire et accessible.
-   **CSS3** : Styles modernes avec variables CSS, Flexbox et Grid pour des mises en page complexes et responsives.
-   **JavaScript (ES6+)** : Interactivité côté client, gestion du menu mobile et chargement dynamique de la navigation.
-   **Markdown** : Format pour les articles d'actualités avec front matter YAML.
-   **Pages CMS** : Système de gestion de contenu pour les actualités.

### 1.3. Outils et services

-   **Tally** : Gestion des formulaires de contact et de candidature via des iframes.
-   **Google Fonts** : Police "Inter" pour une typographie moderne et lisible.
-   **Material Icons** : Icônes vectorielles pour l'interface.
-   **GitHub Pages** : Hébergement du site statique.
-   **Pages CMS** : Interface d'administration pour la gestion des actualités.
-   **GitHub API** : Récupération dynamique du contenu des articles.

## 2. Analyse détaillée des pages

### 2.1. Page d'accueil (`index.html`)

-   **Hero Section** : Utilisation de l'élément `<picture>` pour servir des images optimisées en fonction de la taille de l'écran.
-   **SEO** : Meta tags Open Graph et Twitter Cards, données structurées `Schema.org` pour une meilleure indexation.
-   **Contenu** : Sections claires présentant l'association, ses services et son ancrage à l'Université Paris Nanterre.

### 2.2. Page Actualités (`actualites.html`)

-   **Système CMS** : Intégration de Pages CMS pour la gestion des actualités.
-   **Chargement dynamique** : Les articles sont chargés via l'API GitHub et affichés dans une grille responsive.
-   **Parsing Markdown** : Conversion automatique du Markdown en HTML avec support des images, liens, et formatage.
-   **Filtrage** : Seuls les articles avec `published: true` sont affichés.
-   **Types d'articles** : Support de différents types (Article, Rapport, Étude, Publication, Analyse, Recherche).
-   **Design en cartes** : Affichage en grille avec cartes contenant image, titre, date, type et extrait.

### 2.3. Page Article (`article.html`)

-   **Template dynamique** : Affichage d'un article individuel basé sur les paramètres URL.
-   **Parsing Markdown** : Conversion complète du contenu Markdown en HTML.
-   **Navigation** : Liens vers les autres articles et retour aux actualités.
-   **Responsive** : Design adaptatif avec largeur optimisée pour la lecture.

### 2.4. Page Contact (`contact.html`)

-   **Formulaire Tally** : Intégration d'un formulaire Tally via une `<iframe>` pour la prise de contact.
-   **Informations de contact** : Adresse et email clairement affichés.

### 2.5. Page Domaines (`domaines.html`)

-   **Présentation des pôles** : Mise en page en grille pour présenter les 3 domaines d'intervention (Stratégie, Juridique, Numérique).
-   **Design en cartes** : Cartes avec shadow au hover, design cohérent avec les autres sections.
-   **Processus de collaboration** : Timeline responsive en 5 étapes pour expliquer le déroulement d'une mission.
-   **Ligne de progression** : Ligne bleue centrée avec les chiffres du processus.

### 2.6. Page Équipe (`equipe.html`)

-   **Présentation des membres** : Grille responsive affichant les membres de l'équipe avec leur nom, rôle et un lien LinkedIn.
-   **Design en cartes** : Utilisation de cartes avec un effet de survol pour une présentation dynamique.
-   **Grille responsive** : 3 colonnes sur desktop, 1 colonne sur mobile.
-   **Espacement optimisé** : Gap de 5px entre les cartes pour un design compact.

### 2.7. Page Nous rejoindre (`nous-rejoindre.html`)

-   **Formulaire Tally** : Intégration d'un formulaire Tally via une `<iframe>` pour les candidatures.

### 2.8. Pages légales

- `confidentialite.html`, `mentions-legales.html`, `exercer-mes-droits.html` : Contenu statique informant les utilisateurs sur les aspects légaux et la gestion de leurs données, en conformité avec le RGPD. La page "Exercer mes droits" utilise un lien `mailto` pour pré-remplir un email.

### 2.9. Navigation (`nav.html`)

-   **Module réutilisable** : Le code de la navigation est centralisé dans ce fichier et injecté dynamiquement dans chaque page via JavaScript. Ceci assure une maintenance simplifiée et une cohérence sur tout le site.

## 3. Architecture CSS (`style.css`)

Le fichier `style.css` est structuré de manière modulaire et suit une approche **Mobile First**.

### 3.1. Variables CSS

Un ensemble complet de variables est défini dans `:root` pour garantir une cohérence globale du design system :
-   Couleurs (primaires, neutres, texte)
-   Typographie (familles, graisses, tailles)
-   Espacements
-   Bordures et ombres

```css
:root {
    --wpc-blue: #00AAF4;
    --font-family-primary: 'Inter', sans-serif;
    --spacing-md: 1rem;
}
```

### 3.2. Responsive Design

-   **Mobile First** : Les styles de base sont pour les mobiles.
-   **Media Queries** : Des `media queries` sont utilisées pour adapter la mise en page aux écrans plus larges (tablettes, ordinateurs).
    -   Exemple : la grille de l'équipe passe de 1 à 3 colonnes sur les écrans larges.
    -   La grille d'articles passe de 1 à 4 colonnes selon la taille d'écran.

### 3.3. Classes utilitaires

Des classes utilitaires sont présentes pour gérer les styles répétitifs (marges, paddings, couleurs de fond, etc.), ce qui permet de garder le code CSS concis.

### 3.4. Système de grilles

-   **Articles** : Grille 4 colonnes sur desktop, 2 sur tablette, 1 sur mobile.
-   **Équipe** : Grille 3 colonnes sur desktop, 1 sur mobile.
-   **Domaines** : Grille 3 colonnes avec cartes responsives.

### 3.5. Hero Sections

-   **Design uniforme** : Toutes les pages (sauf accueil) ont des hero sections blanches avec titres noirs alignés à gauche.
-   **Sous-titres** : Chaque page a un sous-titre descriptif.
-   **Mobile** : Centrage des titres et sous-titres sur mobile.

## 4. Architecture JavaScript (`main.js`)

Le fichier `main.js` centralise toute la logique interactive du site.

### 4.1. Fonctionnalités principales

1.  **Chargement de la navigation** :
    -   Une fonction `loadNav()` récupère le contenu de `nav.html` et l'injecte dans un placeholder (`<div id="nav-placeholder"></div>`) présent sur chaque page.
    -   Cela permet de ne maintenir qu'un seul fichier pour la navigation.

2.  **Gestion du menu mobile** :
    -   Logique complète pour l'ouverture/fermeture du menu hamburger sur mobile.
    -   Gestion des états (ouvert/fermé), des attributs ARIA pour l'accessibilité, et blocage du scroll du body lorsque le menu est ouvert.
    -   Suppression des strokes bleus sur mobile pour un design plus épuré.

3.  **Défilement fluide (Smooth Scrolling)** :
    -   Les liens d'ancrage (`<a href="#...">`) bénéficient d'un défilement fluide pour une meilleure expérience utilisateur.

4.  **Gestion des actualités** :
    -   Chargement dynamique des articles depuis l'API GitHub.
    -   Parsing du Markdown avec support des images, liens, et formatage.
    -   Affichage en grille responsive avec cartes.

### 4.2. Fonctions utilitaires (WPCUtils)

Un objet `WPCUtils` contient des fonctions pour optimiser les performances :
-   `debounce` : Pour limiter la fréquence d'appel d'une fonction (ex: redimensionnement de la fenêtre).
-   `throttle` : Pour limiter le nombre d'exécutions d'une fonction dans un intervalle de temps donné.

## 5. Système de Gestion de Contenu (Pages CMS)

### 5.1. Configuration (`.pages.yml`)

Le fichier `.pages.yml` configure Pages CMS pour la gestion des actualités :

```yaml
content:
  - name: actualites
    label: Actualités
    type: collection
    path: content/actualites
    format: yaml-frontmatter
    filename: "{year}-{month}-{day}-{slug}.md"
```

### 5.2. Champs disponibles

-   **Titre** : Titre de l'article
-   **Date** : Date de publication
-   **Auteur** : Nom de l'auteur
-   **Résumé** : Extrait de l'article
-   **Type** : Sélection entre Article, Rapport, Étude, Publication, Analyse, Recherche
-   **Publié** : Boolean pour contrôler la visibilité
-   **Contenu** : Éditeur de texte riche pour le contenu Markdown

### 5.3. Structure des articles

Les articles sont stockés dans `content/actualites/` au format Markdown avec front matter YAML :

```markdown
---
title: "Titre de l'article"
date: 2025-01-20
author: "Nom de l'auteur"
excerpt: "Résumé de l'article"
type: "Article"
published: true
---

Contenu de l'article en Markdown...
```

## 6. Optimisations et Bonnes Pratiques

### 6.1. Performance

-   **Images WebP** : Utilisation du format d'image WebP, plus léger que les formats traditionnels.
-   **Lazy Loading** : L'attribut `loading="lazy"` est utilisé sur les images pour ne les charger que lorsqu'elles deviennent visibles.
-   **Cache busting** : Versioning des fichiers CSS (`?v=2`) pour forcer le rechargement.
-   **API GitHub** : Gestion des limites de taux (60 requêtes/heure) avec fallback.

### 6.2. Accessibilité (A11y)

-   **HTML Sémantique** : Utilisation correcte des balises HTML5.
-   **Attributs ARIA** : `aria-expanded` est utilisé sur le bouton du menu mobile pour indiquer son état.
-   **Focus visible** : Les éléments interactifs ont des états de focus clairs pour la navigation au clavier.
-   **Textes alternatifs** : Les images importantes ont des attributs `alt` descriptifs.

### 6.3. SEO

-   **Meta Tags complets** : `title`, `description`, Open Graph, Twitter Cards sur chaque page.
-   **Données Structurées** : JSON-LD (`Schema.org`) sur la page d'accueil pour décrire l'organisation.
-   **URLs propres** : URLs de pages claires et descriptives.
-   **Robots.txt et Sitemap.xml** : Présence de ces fichiers pour guider les robots d'indexation.

### 6.4. Conformité RGPD

-   **Pages dédiées** : `confidentialite.html` et `exercer-mes-droits.html` pour informer les utilisateurs.
-   **Gestion des données** : L'utilisation de Tally et de liens `mailto` externalise la gestion des données personnelles, simplifiant la conformité.

## 7. Design System

### 7.1. Couleurs

-   **Bleu principal** : `#00AAF4` (WPC Blue)
-   **Bleu navigation** : `#033DCC`
-   **Gris de fond** : `#F5F6FA`
-   **Texte primaire** : `#212529`
-   **Texte secondaire** : `#666666`

### 7.2. Typographie

-   **Police principale** : Inter (Google Fonts)
-   **Tailles** : Système cohérent avec variables CSS
-   **Poids** : 300, 400, 500, 600, 700, 800

### 7.3. Espacements

-   **Système cohérent** : Variables CSS pour tous les espacements
-   **Responsive** : Adaptation automatique selon la taille d'écran

### 7.4. Composants

-   **Cartes** : Design uniforme avec shadow au hover
-   **Boutons** : Styles cohérents avec états hover/focus
-   **Navigation** : Design responsive avec menu mobile

## 8. Maintenance et Déploiement

### 8.1. Maintenance

-   **Code modulaire** : La séparation claire des préoccupations (HTML, CSS, JS) et l'utilisation de composants (navigation) facilitent la maintenance.
-   **Variables CSS** : Permettent de changer rapidement les éléments de design (couleurs, polices) sur tout le site.
-   **CMS intégré** : Pages CMS permet la gestion du contenu sans intervention technique.

### 8.2. Déploiement

-   **Hébergement** : Le site est hébergé sur GitHub Pages, une solution simple et gratuite pour les sites statiques.
-   **Déploiement continu** : Un workflow GitHub Actions pourrait être mis en place pour automatiser le déploiement à chaque `push` sur la branche `main`.
-   **Versioning** : Système de cache busting pour les mises à jour CSS/JS.

### 8.3. Gestion du contenu

-   **Articles** : Gestion via Pages CMS avec interface d'administration
-   **Images** : Stockage dans `assets/images/` avec optimisation WebP
-   **Navigation** : Modification centralisée dans `nav.html`

## 9. Évolutions récentes

### 9.1. Système d'actualités

-   **Ajout de Pages CMS** : Interface d'administration pour la gestion des articles
-   **Parsing Markdown** : Support complet du formatage Markdown
-   **Types d'articles** : Système de catégorisation flexible
-   **Design en cartes** : Interface moderne avec grille responsive

### 9.2. Améliorations UX

-   **Hero sections uniformes** : Design cohérent sur toutes les pages
-   **Navigation mobile** : Menu hamburger optimisé
-   **Responsive design** : Adaptation parfaite sur tous les écrans
-   **Performance** : Optimisations pour le chargement rapide

### 9.3. Accessibilité

-   **Standards WCAG** : Respect des guidelines d'accessibilité
-   **Navigation clavier** : Support complet de la navigation au clavier
-   **Contraste** : Couleurs optimisées pour la lisibilité

## 10. Recommandations futures

### 10.1. Performance

-   **Minification** : Minifier les fichiers CSS et JS en production
-   **CDN** : Utilisation d'un CDN pour les ressources statiques
-   **Compression** : Activation de la compression gzip

### 10.2. Fonctionnalités

-   **Recherche** : Ajout d'une fonction de recherche dans les articles
-   **Filtres** : Filtrage des articles par type ou date
-   **Pagination** : Gestion des grandes listes d'articles

### 10.3. Analytics

-   **Google Analytics** : Intégration pour le suivi des performances
-   **Heatmaps** : Analyse du comportement utilisateur
-   **A/B Testing** : Tests d'optimisation de l'interface

## 11. Structure des articles actuels

### 11.1. Articles publiés

Le site contient actuellement plusieurs articles d'actualités :

1. **"La simulation neuronale avancée au service de l'accélération et de la performance du développement de produits industriels"**
   - Date : 2025-01-30
   - Type : Article
   - Auteur : West Paris Consulting
   - Contenu : Analyse de l'impact de l'IA sur l'industrie manufacturière

2. **"Grandes et petites entreprises : plus de complémentarité pour plus de compétitivité"**
   - Date : 2025-07-03
   - Type : Étude
   - Auteur : West Paris Consulting
   - Contenu : Analyse de la collaboration inter-entreprises

### 11.2. Système de gestion des articles

- **Front Matter YAML** : Métadonnées structurées pour chaque article
- **Parsing automatique** : Conversion Markdown vers HTML
- **Filtrage** : Seuls les articles avec `published: true` sont affichés
- **Types multiples** : Support de différents types de publications

## 12. Conformité et légalité

### 12.1. RGPD

- **Politique de confidentialité** : Page dédiée expliquant la collecte et le traitement des données
- **Exercice des droits** : Page permettant aux utilisateurs d'exercer leurs droits RGPD
- **Externalisation** : Utilisation de Tally pour les formulaires, simplifiant la conformité

### 12.2. Mentions légales

- **Informations complètes** : Nom de l'association, adresse, responsable de publication
- **Hébergement** : Informations sur GitHub Pages
- **Contact** : Coordonnées de l'association

## 13. Optimisations techniques

### 13.1. Chargement des ressources

- **Preconnect** : Optimisation du chargement des polices Google Fonts
- **Lazy loading** : Images chargées uniquement quand nécessaire
- **Cache busting** : Versioning des fichiers CSS pour forcer le rechargement

### 13.2. API GitHub

- **Limites de taux** : Gestion des 60 requêtes/heure de l'API GitHub
- **Fallback** : Gestion des erreurs de chargement
- **Parsing robuste** : Support de différents formats de front matter

---

*Documentation mise à jour le : 20 janvier 2025*
*Version du site : 2.1*
*Dernière modification : Analyse complète et mise à jour de la documentation technique*