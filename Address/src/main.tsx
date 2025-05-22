import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Pages/LoginPage";
import AddressLibrary from "./components/Pages/LibraryPage";
import AddressPage from "./components/Pages/AddressPage";
import Create from "./components/Pages/CreatePage";
import Register from "./components/Pages/RegisterPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="address" element={<AddressLibrary />} />
        <Route path="address/:id" element={<AddressPage />} />
        <Route path="address/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
