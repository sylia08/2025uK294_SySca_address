import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AddressLibrary from "./components/AddressLibrary";
import Address from "./components/Address";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/address" element={<AddressLibrary />} />
        <Route path="/address/:id" element={<Address />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
