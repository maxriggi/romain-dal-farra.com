# Project: romain-dal-farra.com

## Overview
Site portfolio de Romain Dal Farra — réalisateur, directeur de la photographie et photographe freelance basé à Metz (Grand Est). Le site présente ses services, sa filmographie, son portfolio photo et ses compétences.

## Tech Stack
- **Framework** : Astro 5 (static output)
- **CSS** : Vanilla CSS avec custom properties, styles scoped par composant
- **JS** : Vanilla JS (pas de framework frontend)
- **Images** : `astro:assets` + sharp pour l'optimisation (WebP)
- **Données** : Fichiers YAML dans `src/data/`
- **Formulaire** : Formspree
- **Hébergement** : GitHub Pages (build CI/CD via GitHub Actions)
- **Base path** : `/romain-dal-farra.com` (sous-dossier GitHub Pages)

## Structure

```
src/
├── assets/              # Images optimisées (WebP)
│   ├── logos/            # Logo site (5 variantes)
│   ├── partners/         # Logos partenaires
│   ├── portraits/        # Photos perso
│   ├── tournages/        # Photos de tournages
│   ├── dop/              # Samples DOP
│   └── realisations/     # Portfolio photo (6 galeries, 112 photos)
├── components/           # Composants Astro
├── data/                 # Données YAML
│   ├── about.yaml        # Texte à propos
│   ├── galleries.yaml    # Galeries photo (titres, covers)
│   ├── partners.yaml     # Logos partenaires
│   ├── projects.yaml     # Filmographie (22 projets)
│   ├── services.yaml     # Services proposés (7)
│   └── skills.yaml       # Compétences (12) + logiciels (17)
├── layouts/
│   └── BaseLayout.astro  # Layout principal (head, grain, cursor, aperture)
├── pages/
│   ├── index.astro       # Page d'accueil (single-page)
│   └── photographie.astro # Page portfolio photo avec lightbox
└── styles/
    ├── global.css         # Variables, reset, éléments globaux
    ├── typography.css     # Typographie
    └── animations.css     # Keyframes, scroll reveals, reduced-motion
```

## Conventions
- **Branche** : `main`
- **Langue** : Français (contenu), English (code/comments)
- **Commit** : Messages en français, co-authored by Claude
- **Images brutes** : dans `assets/` à la racine (gitignored), optimisées dans `src/assets/`
- **Ajout de contenu** : modifier les fichiers YAML dans `src/data/`, pas le HTML
- **Ajout de photos** : déposer les originaux dans `assets/Réalisation/`, lancer `npm run optimize-images`, puis ajouter l'entrée dans `src/data/galleries.yaml`

## Commandes
```bash
npm run dev           # Dev server (localhost:4321)
npm run build         # Build production → dist/
npm run preview       # Preview du build
npm run optimize-images  # Optimiser les images brutes → src/assets/
```

## Deploy
Push sur `main` → GitHub Actions build Astro → GitHub Pages automatique.
URL : https://maxriggi.github.io/romain-dal-farra.com/

## Notes
- La vidéo hero est un MP4 local (`public/videos/showreel.mp4`, 6.9 MB compressé)
- Le `base` path Astro est `/romain-dal-farra.com` — utiliser `import.meta.env.BASE_URL` pour les chemins statiques
- Les liens nav utilisent des chemins absolus avec base pour fonctionner sur toutes les pages
