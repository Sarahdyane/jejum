import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initUtmCapture } from "./utils/utmHelper";
import "./index.css";

// Inicializa tema: padrão é claro; aplica escuro apenas se o usuário salvou essa preferência
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

// Captura UTMs o mais cedo possível (antes de navegação interna do SPA)
initUtmCapture();

createRoot(document.getElementById("root")!).render(<App />);
