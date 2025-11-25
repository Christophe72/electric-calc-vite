import { useState } from "react";
import { calibreDisjoncteur, intensite, puissance, resistance, tension } from "../utils/formulas";

export default function Calculator() {
  const [u, setU] = useState<string>("");
  const [i, setI] = useState<string>("");
  const [p, setP] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [cosphi, setCosphi] = useState<string>("1");
  const [phase, setPhase] = useState<"mono" | "tri">("mono");
  const [result, setResult] = useState<string>("Saisissez deux valeurs pour commencer.");

  const parseInput = (val: string): number | null => {
    if (val.trim() === "") return null;
    const parsed = parseFloat(val.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  };

  const formatValue = (val: number, unit: string): string => {
    if (!Number.isFinite(val)) return "";

    let newUnit = unit;
    let display = val;

    if (unit === "W" && Math.abs(val) >= 1000) {
      display = val / 1000;
      newUnit = "kW";
    } else if (unit === "A" && Math.abs(val) < 1) {
      display = val * 1000;
      newUnit = "mA";
    } else if (unit === "V" && Math.abs(val) >= 1000) {
      display = val / 1000;
      newUnit = "kV";
    } else if (unit === "Ω" && Math.abs(val) >= 1000) {
      display = val / 1000;
      newUnit = "kΩ";
    }

    const rounded =
      Math.abs(display - Math.round(display)) < 0.01
        ? Math.round(display).toString()
        : display.toFixed(2);

    return `${rounded} ${newUnit}`;
  };

  const handleCalc = (type: string) => {
    const uVal = parseInput(u);
    const iVal = parseInput(i);
    const pVal = parseInput(p);
    const cosVal = parseInput(cosphi) ?? 1;

    let message = "Valeurs insuffisantes pour ce calcul.";

    switch (type) {
      case "P":
        if (uVal !== null && iVal !== null) {
          const val = puissance(uVal, iVal, cosVal, phase);
          message = `P = ${formatValue(val, "W")}`;
        }
        break;
      case "I":
        if (pVal !== null && uVal !== null) {
          const val = intensite(pVal, uVal, cosVal, phase);
          message = `I = ${formatValue(val, "A")}`;
        }
        break;
      case "U":
        if (pVal !== null && iVal !== null) {
          const val = tension(pVal, iVal, cosVal, phase);
          message = `U = ${formatValue(val, "V")}`;
        }
        break;
      case "R":
        if (uVal !== null && iVal !== null) {
          const val = resistance(uVal, iVal);
          message = `R = ${formatValue(val, "Ω")}`;
        }
        break;
      case "D":
        if (pVal !== null && uVal !== null) {
          const courant = intensite(pVal, uVal, cosVal, phase);
          const calibre = calibreDisjoncteur(courant);
          if (calibre) {
            message = `Disjoncteur → I = ${formatValue(courant, "A")} → calibre ${calibre} A`;
          }
        }
        break;
    }

    setResult(message);
  };

  return (
    <div className="calc card">
      <div className="calc__heading">
        <div>
          <p className="eyebrow">Puissance, intensite, tension, resistance</p>
          <h2>Calculs electriques rapides</h2>
        </div>

        <div className="mode" role="group" aria-label="Selection du regime">
          <label className={phase === "mono" ? "mode__option mode__option--active" : "mode__option"}>
            <input
              type="radio"
              value="mono"
              checked={phase === "mono"}
              onChange={() => setPhase("mono")}
            />
            Monophase
          </label>
          <label className={phase === "tri" ? "mode__option mode__option--active" : "mode__option"}>
            <input
              type="radio"
              value="tri"
              checked={phase === "tri"}
              onChange={() => setPhase("tri")}
            />
            Triphase
          </label>
        </div>
      </div>

      <div className="inputs">
        <label className="field">
          <span>U (V)</span>
          <input placeholder="230" value={u} onChange={e => setU(e.target.value)} />
        </label>
        <label className="field">
          <span>I (A)</span>
          <input placeholder="10" value={i} onChange={e => setI(e.target.value)} />
        </label>
        <label className="field">
          <span>P (W)</span>
          <input placeholder="2000" value={p} onChange={e => setP(e.target.value)} />
        </label>
        <label className="field">
          <span>R (Ω)</span>
          <input placeholder="10" value={r} onChange={e => setR(e.target.value)} />
        </label>
        <label className="field">
          <span>cos φ</span>
          <input placeholder="1" value={cosphi} onChange={e => setCosphi(e.target.value)} />
        </label>
      </div>

      <div className="buttons">
        <button className="btn btn-primary" onClick={() => handleCalc("P")}>
          Calculer P
        </button>
        <button className="btn" onClick={() => handleCalc("I")}>
          Calculer I
        </button>
        <button className="btn" onClick={() => handleCalc("U")}>
          Calculer U
        </button>
        <button className="btn" onClick={() => handleCalc("R")}>
          Calculer R
        </button>
        <button className="btn btn-ghost" onClick={() => handleCalc("D")}>
          Choisir disjoncteur
        </button>
      </div>

      <p className="result card card--ghost" role="status">
        {result}
      </p>
    </div>
  );
}
