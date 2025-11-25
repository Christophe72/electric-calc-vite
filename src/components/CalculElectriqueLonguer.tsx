import { useState } from "react";
import { calibreDisjoncteur, intensite } from "../utils/formulas";

const SECTIONS = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50];

export default function CalculElectriqueLonguer() {
  const [p, setP] = useState("3000");
  const [u, setU] = useState("220");
  const [length, setLength] = useState("20");
  const [rho, setRho] = useState("0.0175"); // cuivre
  const [section, setSection] = useState("2.5");
  const [dropPct, setDropPct] = useState("5");
  const [result, setResult] = useState("Renseignez les valeurs puis calculez.");

  const parse = (val: string) => {
    if (val.trim() === "") return null;
    const parsed = parseFloat(val.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  };

  const format = (num: number, unit: string) => {
    if (!Number.isFinite(num)) return "-";
    const rounded =
      Math.abs(num - Math.round(num)) < 0.01 ? Math.round(num).toString() : num.toFixed(2);
    return `${rounded} ${unit}`;
  };

  const compute = () => {
    const pVal = parse(p);
    const uVal = parse(u);
    const lVal = parse(length);
    const rhoVal = parse(rho);
    const sectionVal = parse(section);
    const dropLimit = parse(dropPct);

    if (!pVal || !uVal || !lVal || !rhoVal || !sectionVal || !dropLimit) {
      setResult("Valeurs insuffisantes ou invalides.");
      return;
    }

    const current = intensite(pVal, uVal, 1, "mono");
    const resistance = (rhoVal * lVal * 2) / sectionVal;
    const deltaU = current * resistance;
    const maxDrop = (uVal * dropLimit) / 100;
    const dropOk = deltaU <= maxDrop;
    const recommendedSection =
      (rhoVal * lVal * 2 * current) / ((uVal * dropLimit) / 100 || 1e-6);
    const sectionSuggested =
      SECTIONS.find(s => s >= recommendedSection) ?? SECTIONS[SECTIONS.length - 1];
    const breaker = calibreDisjoncteur(current);

    setResult(
      [
        `I ≈ ${format(current, "A")}`,
        `ΔU ≈ ${format(deltaU, "V")} (${((deltaU / uVal) * 100).toFixed(2)} %)`,
        dropOk
          ? "Chute acceptable pour la section saisie."
          : `Chute trop haute : section conseillée ${format(sectionSuggested ?? recommendedSection, "mm²")}`,
        breaker ? `Calibre disjoncteur : ${breaker} A` : "Calibre non defini.",
      ].join(" • ")
    );
  };

  return (
    <div className="calc card">
      <div className="calc__heading">
        <div>
          <p className="eyebrow">Longueur de ligne et chute de tension</p>
          <h2>Calcul disjoncteur / section</h2>
        </div>
      </div>

      <div className="inputs">
        <label className="field">
          <span>Puissance P (W)</span>
          <input value={p} onChange={e => setP(e.target.value)} />
        </label>
        <label className="field">
          <span>Tension U (V)</span>
          <input value={u} onChange={e => setU(e.target.value)} />
        </label>
        <label className="field">
          <span>Longueur (m)</span>
          <input value={length} onChange={e => setLength(e.target.value)} />
        </label>
        <label className="field">
          <span>Section (mm²)</span>
          <input value={section} onChange={e => setSection(e.target.value)} />
        </label>
        <label className="field">
          <span>Resistivite ρ (Ω·mm²/m)</span>
          <input value={rho} onChange={e => setRho(e.target.value)} />
        </label>
        <label className="field">
          <span>Chute max (%)</span>
          <input value={dropPct} onChange={e => setDropPct(e.target.value)} />
        </label>
      </div>

      <div className="buttons">
        <button className="btn btn-primary" onClick={compute}>
          Calculer disjoncteur / chute
        </button>
      </div>

      <p className="result card card--ghost" role="status">
        {result}
      </p>
    </div>
  );
}
