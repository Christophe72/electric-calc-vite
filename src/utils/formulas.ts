// Formules electriques de base
export const puissance = (u: number, i: number, cosphi = 1, phase = "mono") => {
  return phase === "tri" ? Math.sqrt(3) * u * i * cosphi : u * i * cosphi;
};

export const intensite = (p: number, u: number, cosphi = 1, phase = "mono") => {
  return phase === "tri" ? p / (Math.sqrt(3) * u * cosphi) : p / (u * cosphi);
};

export const tension = (p: number, i: number, cosphi = 1, phase = "mono") => {
  return phase === "tri" ? p / (Math.sqrt(3) * i * cosphi) : p / (i * cosphi);
};

export const resistance = (u: number, i: number) => u / i;

const CALIBRE_STEPS = [2, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];

export const calibreDisjoncteur = (i: number) => {
  if (!isFinite(i) || i <= 0) return null;
  for (const calibre of CALIBRE_STEPS) {
    if (i <= calibre) return calibre;
  }
  return CALIBRE_STEPS[CALIBRE_STEPS.length - 1];
};
