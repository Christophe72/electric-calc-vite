# Calculatrice Électrique (React + Vite)

Petite calculatrice pour les bases élec : puissance, intensité, tension, résistance et choix de calibre de disjoncteur. UI modernisée avec mode clair/sombre.

## Fonctionnalités
- Calculs rapides mono / tri avec cos φ configurable.
- Formats auto (kW, mA, kV, kΩ) et arrondis lisibles.
- Suggestion de calibre de disjoncteur selon l’intensité calculée.
- Bascule thème clair/sombre (toggle dans l’en-tête).
- Interface responsive (cartes, grille de champs, boutons regroupés).

## Scripts
- `npm run dev` : serveur de dev Vite.
- `npm run build` : build TypeScript + Vite.
- `npm run preview` : prévisualisation du build.
- `npm run lint` : lint du projet.

## Utilisation rapide
1) `npm install`
2) `npm run dev`
3) Ouvre `http://localhost:5173`
4) Choisis mono/tri, saisis deux valeurs min (ex. U et I), clique sur l’opération voulue.

## Calculs supportés
- `P = U × I × cos φ` (× √3 en tri)
- `I = P / (U × cos φ)` (÷ √3 en tri)
- `U = P / (I × cos φ)` (÷ √3 en tri)
- `R = U / I`
- Disjoncteur : palier standard le plus proche (2→100 A).

## Stack
- React 19, TypeScript, Vite 7.
- Styles custom (`src/styles/main.css`), sans framework UI.

## Structure
- `src/App.tsx` : shell + toggle de thème.
- `src/components/Calculator.tsx` : logique UI et interactions.
- `src/utils/formulas.ts` : formules et sélection de calibre.
- `src/styles/main.css` : thème clair/sombre et layout.

## Notes
- Les champs acceptent `,` ou `.` pour les décimales.
- Résultat initial : invite à saisir deux valeurs.
