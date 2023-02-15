import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TheCalculator } from "./TheCalculator";
// import { Nakopitelniy } from "./Nakopitelniy";
import { Ned } from "./Ned";
import ExchangeRate from "./Exchange";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TheCalculator />} />

          <Route path="/ned" element={<Ned />} />
          <Route path="/exchange" element={<ExchangeRate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
//
export default App;
