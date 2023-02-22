import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TheCalculator } from "./TheCalculator";
// import { Nakopitelniy } from "./Nakopitelniy";
import { Ned } from "./Ned";
import ExchangeRate from "./Exchange";
import Converter from "./Test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TheCalculator />} />

          <Route path="/ned" element={<Ned />} />
          <Route path="/converter" element={<Converter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
//
export default App;
