import ReactDOM from "react-dom/client";
import React from 'react';
import './App.css';
import { PFICCalculator } from './Components/PFICCalculator';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { Layout } from "./layout";
import { License } from "./Components/License";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div />} />
          <Route path="Section1291" element={<PFICCalculator />} />
          <Route path="License" element={<License/>} />
          <Route path="*" element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
