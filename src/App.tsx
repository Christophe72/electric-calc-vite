import { useEffect, useState } from "react";
import "./styles/main.css";
import Calculator from "./components/Calculator";

type Theme = "light" | "dark";

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__titles">
          <p className="eyebrow">Calculatrice Electrique</p>
          <h1>Electricite — calculs de base</h1>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer de mode">
          <span className="theme-toggle__icon">{theme === "light" ? "🌙" : "☀️"}</span>
          <span>{theme === "light" ? "Mode sombre" : "Mode clair"}</span>
        </button>
      </header>

      <Calculator />
    </div>
  );
}
