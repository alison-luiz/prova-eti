import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import VeiculosPage from "./pages/VeiculosPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/veiculos" replace />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
