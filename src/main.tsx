import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initUtmCapture } from "./utils/utmHelper";
import "./index.css";

// Captura UTMs o mais cedo possível (antes de navegação interna do SPA)
initUtmCapture();

createRoot(document.getElementById("root")!).render(<App />);
