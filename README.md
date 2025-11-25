# Calculatrice Electrique (React + Vite)

Deux outils pour les bases elec : calculs P/U/I/R et selection rapide du calibre disjoncteur, plus un calculateur longueur/section pour verifier la chute de tension et le calibre a prevoir. UI modernisee avec mode clair/sombre.

## Fonctionnalites
- Calculs rapides mono ou tri avec cos phi configurable.
- Formats auto (kW, mA, kV, kOhm) et arrondis lisibles.
- Suggestion de calibre de disjoncteur selon l'intensite calculee.
- Bascule theme clair/sombre et interface responsive.
- Calcul longueur/section : chute de tension estimee, section minimale conseillee, calibre.

## Scripts
- `npm run dev` : serveur de dev Vite.
- `npm run build` : build TypeScript + Vite.
- `npm run preview` : previsualisation du build.
- `npm run lint` : lint du projet.

## Utilisation rapide
1) `npm install`
2) `npm run dev`
3) Ouvre `http://localhost:5173`
4) Calculatrice base : choisis mono/tri, saisis au moins deux valeurs (ex. U et I), clique sur l'operation voulue.
5) Calcul longueur/section : renseigne puissance, tension, longueur, section, resistivite (rho) et chute max %, puis calcule.

## Calculs supportes (base)
- `P = U * I * cos phi` (x sqrt(3) en tri)
- `I = P / (U * cos phi)` (÷ sqrt(3) en tri)
- `U = P / (I * cos phi)` (÷ sqrt(3) en tri)
- `R = U / I`
- Disjoncteur : palier standard le plus proche (2 -> 100 A).

## Calcul longueur/section
- Intensite estimee : `I = P / U`
- Resistance boucle : `R = (rho * longueur * 2) / section`
- Chute estimee : `DeltaU = I * R` et comparaison avec le pourcentage max saisi.
- Suggestion de section minimale parmi les sections standards definies.
- Calibre disjoncteur sur la base de l'intensite calculee.

## Stack
- React 19, TypeScript, Vite 7.
- Styles custom (`src/styles/main.css`), sans framework UI.

## Structure
- `src/App.tsx` : shell, header et toggle de theme, inclusion des deux calculateurs.
- `src/components/Calculator.tsx` : calculs P/U/I/R et disjoncteur de base.
- `src/components/CalculElectriqueLonguer.tsx` : calcul chute de tension / section / disjoncteur.
- `src/utils/formulas.ts` : formules et selection de calibre.
- `src/styles/main.css` : theme clair/sombre et layout.

## Notes
- Les champs acceptent `,` ou `.` pour les decimales.
- Tension pre-remplie : 220 V en mono, 380 V en tri (calculateur base).
- Resultats affiches en direct apres chaque calcul.
