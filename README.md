
# Prompt Builder IA

https://hypijump31.github.io/Prompt-Assistant

> Un assistant moderne pour créer, structurer et sauvegarder vos prompts IA, avec une interface responsive, élégante et ultra-rapide.

---

## Fonctionnalités principales

- **Génération de prompts structurés** pour IA (GPT, Claude, etc.)
- **Formulaire dynamique** : ajoutez, éditez, réinitialisez vos champs facilement
- **Copie en un clic** du prompt généré
- **Sauvegarde locale** des champs (cookie)
- **Responsive Design** : expérience fluide sur mobile, tablette et desktop
- **Design moderne** avec Bootstrap 5, icônes, et Google Fonts
- **Internationalisation prête** (structure compatible avec next-i18next)
- **Thème clair/sombre** (WIP)
- **Tests unitaires** avec Jest & React Testing Library

---

## Aperçu

![Aperçu Prompt Builder](https://user-images.githubusercontent.com/placeholder/preview-prompt-builder.png)

---

## Démarrage rapide

1. **Clonez le repo**
   ```bash
   git clone https://github.com/votre-utilisateur/prompt-builder.git
   cd prompt-builder/next-app
   ```
2. **Installez les dépendances**
   ```bash
   npm install
   ```
3. **Lancez le serveur de dev**
   ```bash
   npm run dev
   ```
   Rendez-vous sur [http://localhost:3000](http://localhost:3000)

---

## Stack technique

- [Next.js](https://nextjs.org/) + TypeScript
- [Bootstrap 5](https://getbootstrap.com/) & [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/)
- [Tailwind CSS](https://tailwindcss.com/) (pour la base de styles)
- [Lucide Icons](https://lucide.dev/)
- [next-i18next](https://github.com/i18next/next-i18next) (optionnel, pour l'i18n)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

---

## Internationalisation (i18n)

Le projet est prêt à accueillir plusieurs langues grâce à `next-i18next`. Ajoutez vos fichiers de traduction dans `/public/locales/`.

---

## Arborescence simplifiée

```
next-app/
├── public/              # Statics, images, icônes
├── src/
│   ├── components/      # Composants React réutilisables
│   ├── lib/             # Fonctions utilitaires
│   ├── pages/           # Pages Next.js (dont index.tsx)
│   └── styles/          # Feuilles de style globales
├── package.json         # Dépendances et scripts
├── next.config.ts       # Configuration Next.js
└── ...
```

---

## Philosophie & bonnes pratiques

- Raisonnement étape par étape (voir guide GPT dans le code)
- Feedback utilisateur clair et immédiat
- Code typé, composants réutilisables, UI moderne
- Tests unitaires pour chaque composant clé

---

## Scripts utiles

- `npm run dev` – Lancer le serveur de développement
- `npm run build` – Build de production
- `npm run start` – Lancer le serveur en mode production
- `npm run lint` – Analyse statique du code

---

## Tests

Lancez tous les tests unitaires avec :
```bash
npm test
```

---

## Contribution

1. Forkez le repo
2. Créez une branche (`feature/ma-feature`)
3. Commitez vos modifications
4. Ouvrez une Pull Request

Merci pour vos contributions !

---

## Licence

Ce projet est open-source sous licence MIT.

---

## Remerciements

- [shadcn/ui](https://ui.shadcn.com/) pour l’inspiration UI
- [Bootstrap](https://getbootstrap.com/), [Lucide](https://lucide.dev/), et la communauté open-source

---

> _Pour toute question ou suggestion, ouvrez une issue sur GitHub !_
