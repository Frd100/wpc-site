# Documentation Technique - West Paris Consulting

## Introduction

Ce document a pour objectif de fournir une analyse technique complète du site web de **West Paris Consulting (WPC)**. Il s'adresse aux développeurs, aux responsables techniques et à toute personne souhaitant comprendre l'architecture, les technologies et les bonnes pratiques mises en œuvre.

## 1. Architecture Générale

Le site de West Paris Consulting est un **site statique responsive**, conçu avec une approche **Mobile First**. Il est composé de plusieurs pages HTML, d'une feuille de style CSS unique et d'un fichier JavaScript pour l'interactivité.

### 1.1. Arborescence des fichiers

```
wpc-site/
├── index.html
├── contact.html
├── domaines.html
├── equipe.html
├── nous-rejoindre.html
├── confidentialite.html
├── exercer-mes-droits.html
├── mentions-legales.html
├── nav.html
├── style.css
├── main.js
└── assets/
    ├── logo.svg
    ├── homepage.webp
    └── ... (autres images)
```

### 1.2. Technologies utilisées

-   **HTML5** : Utilisation de balises sémantiques (`<header>`, `<main>`, `<nav>`, `<footer>`) pour une structure claire et accessible.
-   **CSS3** : Styles modernes avec variables CSS, Flexbox et Grid pour des mises en page complexes et responsives.
-   **JavaScript (ES6+)** : Interactivité côté client, gestion du menu mobile et chargement dynamique de la navigation.

### 1.3. Outils et services

-   **Tally** : Gestion des formulaires de contact et de candidature via des iframes.
-   **Google Fonts** : Police "Inter" pour une typographie moderne et lisible.
-   **Material Icons** : Icônes vectorielles pour l'interface.
-   **GitHub Pages** : Hébergement du site statique.

## 2. Analyse détaillée des pages

### 2.1. Page d'accueil (`index.html`)

-   **Hero Section** : Utilisation de l'élément `<picture>` pour servir des images optimisées en fonction de la taille de l'écran.
-   **SEO** : Meta tags Open Graph et Twitter Cards, données structurées `Schema.org` pour une meilleure indexation.
-   **Contenu** : Sections claires présentant l'association, ses services et son ancrage à l'Université Paris Nanterre.

### 2.2. Page Contact (`contact.html`)

-   **Formulaire Tally** : Intégration d'un formulaire Tally via une `<iframe>` pour la prise de contact.
-   **Informations de contact** : Adresse et email clairement affichés.

### 2.3. Page Domaines (`domaines.html`)

-   **Présentation des pôles** : Mise en page en grille pour présenter les 3 domaines d'intervention (Stratégie, Juridique, Numérique).
-   **Processus de collaboration** : Timeline responsive en 5 étapes pour expliquer le déroulement d'une mission.

### 2.4. Page Équipe (`equipe.html`)

-   **Présentation des membres** : Grille responsive affichant les membres de l'équipe avec leur nom, rôle et un lien LinkedIn.
-   **Design** : Utilisation de cartes avec un effet de survol pour une présentation dynamique.

### 2.5. Page Nous rejoindre (`nous-rejoindre.html`)

-   **Formulaire Tally** : Intégration d'un formulaire Tally via une `<iframe>` pour les candidatures.

### 2.6. Pages légales

-   `confidentialite.html`, `mentions-legales.html`, `exercer-mes-droits.html` : Contenu statique informant les utilisateurs sur les aspects légaux et la gestion de leurs données, en conformité avec le RGPD. La page "Exercer mes droits" utilise un lien `mailto` pour pré-remplir un email.

### 2.7. Navigation (`nav.html`)

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

### 3.3. Classes utilitaires

Des classes utilitaires sont présentes pour gérer les styles répétitifs (marges, paddings, couleurs de fond, etc.), ce qui permet de garder le code CSS concis.

## 4. Architecture JavaScript (`main.js`)

Le fichier `main.js` centralise toute la logique interactive du site.

### 4.1. Fonctionnalités principales

1.  **Chargement de la navigation** :
    -   Une fonction `loadNav()` récupère le contenu de `nav.html` et l'injecte dans un placeholder (`<div id="nav-placeholder"></div>`) présent sur chaque page.
    -   Cela permet de ne maintenir qu'un seul fichier pour la navigation.

2.  **Gestion du menu mobile** :
    -   Logique complète pour l'ouverture/fermeture du menu hamburger sur mobile.
    -   Gestion des états (ouvert/fermé), des attributs ARIA pour l'accessibilité, et blocage du scroll du body lorsque le menu est ouvert.

3.  **Défilement fluide (Smooth Scrolling)** :
    -   Les liens d'ancrage (`<a href="#...">`) bénéficient d'un défilement fluide pour une meilleure expérience utilisateur.

### 4.2. Fonctions utilitaires (WPCUtils)

Un objet `WPCUtils` contient des fonctions pour optimiser les performances :
-   `debounce` : Pour limiter la fréquence d'appel d'une fonction (ex: redimensionnement de la fenêtre).
-   `throttle` : Pour limiter le nombre d'exécutions d'une fonction dans un intervalle de temps donné.

## 5. Optimisations et Bonnes Pratiques

### 5.1. Performance

-   **Images WebP** : Utilisation du format d'image WebP, plus léger que les formats traditionnels.
-   **Lazy Loading** : L'attribut `loading="lazy"` est utilisé sur les images pour ne les charger que lorsqu'elles deviennent visibles.
-   **Code minifié** : Bien que non observé directement, il est recommandé de minifier les fichiers CSS et JS en production.

### 5.2. Accessibilité (A11y)

-   **HTML Sémantique** : Utilisation correcte des balises HTML5.
-   **Attributs ARIA** : `aria-expanded` est utilisé sur le bouton du menu mobile pour indiquer son état.
-   **Focus visible** : Les éléments interactifs ont des états de focus clairs pour la navigation au clavier.
-   **Textes alternatifs** : Les images importantes ont des attributs `alt` descriptifs.

### 5.3. SEO

-   **Meta Tags complets** : `title`, `description`, Open Graph, Twitter Cards sur chaque page.
-   **Données Structurées** : JSON-LD (`Schema.org`) sur la page d'accueil pour décrire l'organisation.
-   **URLs propres** : URLs de pages claires et descriptives.
-   **Robots.txt et Sitemap.xml** : Présence de ces fichiers pour guider les robots d'indexation.

### 5.4. Conformité RGPD

-   **Pages dédiées** : `confidentialite.html` et `exercer-mes-droits.html` pour informer les utilisateurs.
-   **Gestion des données** : L'utilisation de Tally et de liens `mailto` externalise la gestion des données personnelles, simplifiant la conformité.

## 6. Maintenance et Déploiement

### 6.1. Maintenance

-   **Code modulaire** : La séparation claire des préoccupations (HTML, CSS, JS) et l'utilisation de composants (navigation) facilitent la maintenance.
-   **Variables CSS** : Permettent de changer rapidement les éléments de design (couleurs, polices) sur tout le site.

### 6.2. Déploiement

-   **Hébergement** : Le site est hébergé sur GitHub Pages, une solution simple et gratuite pour les sites statiques.
-   **Déploiement continu** : Un workflow GitHub Actions pourrait être mis en place pour automatiser le déploiement à chaque `push` sur la branche `main`.
