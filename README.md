# romain-dal-farra.com

Site portfolio de **Romain Dal Farra** — réalisateur, directeur de la photographie et photographe freelance basé à Metz (Grand Est, France).

**[Voir le site en ligne](https://maxriggi.github.io/romain-dal-farra.com/)**

## Stack

- [Astro 5](https://astro.build) (static)
- Vanilla CSS & JS
- [Sharp](https://sharp.pixelplumbing.com) pour l'optimisation d'images
- [Formspree](https://formspree.io) pour le formulaire de contact
- GitHub Pages + GitHub Actions pour le déploiement

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview
```

## Structure du projet

```
src/
├── assets/         # Images optimisées (WebP)
├── components/     # Composants Astro (Nav, Hero, About, Services, etc.)
├── data/           # Contenu en YAML (projets, services, compétences, galeries)
├── layouts/        # Layout de base
├── pages/          # Pages du site
│   ├── index.astro          # Accueil
│   └── photographie.astro   # Portfolio photo
└── styles/         # CSS globaux
```

## Gestion du contenu

Le contenu est séparé du code dans des fichiers YAML :

| Fichier | Contenu |
|---------|---------|
| `src/data/projects.yaml` | Filmographie (titre, année, catégorie, lien vidéo) |
| `src/data/services.yaml` | Services proposés |
| `src/data/skills.yaml` | Compétences + logiciels maîtrisés |
| `src/data/partners.yaml` | Logos partenaires |
| `src/data/galleries.yaml` | Galeries photo |
| `src/data/about.yaml` | Texte de la section À propos |

## Ajouter des photos

1. Déposer les originaux dans `assets/Réalisation/<nom-du-projet>/`
2. Lancer `npm run optimize-images` pour convertir en WebP
3. Ajouter l'entrée dans `src/data/galleries.yaml`
4. Commit & push — le site se déploie automatiquement

## Déploiement

Chaque push sur `main` déclenche un build Astro via GitHub Actions et déploie sur GitHub Pages.
