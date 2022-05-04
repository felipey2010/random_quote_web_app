import React, { lazy, Suspense } from "react";
import "./styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppProvider from "./utils/Context";

const Home = lazy(() => import("./pages/home"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="lazy-loading"></div>}>
        <AppProvider>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppProvider>
      </Suspense>
    </BrowserRouter>
  );
}
