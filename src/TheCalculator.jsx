import { useState } from "react";
import "./design.css";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const firstContributionOptions = [9, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const yearOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];
const currencySelect = ["сом", "сум", "рубль", "usd", "тенге"];
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Ned } from "./Ned";
// import { Auto } from "./Avto";
import { Spec } from "./Spec";

import ned from "./assets/dom.png";
import auto from "./assets/auto.png";
import spec from "./assets/spec.png";
import nak from "./assets/nak.png";

import autoWhite from "./assets/auto-white.png";
import domWhite from "./assets/dom-white.png";
import specWhite from "./assets/track-white.png";
import nakWhite from "./assets/nak-white.png";

import bulbon from "./assets/dom.png";
import { Avto } from "./Avto";
import { Nako } from "./Nak";

function Button({ color }) {
  return <button style={{ backgroundColor: color }}>Click me</button>;
}

export const TheCalculator = () => {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState("10000");
  const [srok, setSrok] = useState("0");
  const edin = 5000;
  const edinPercent = 5;
  const [currency, setCurrency] = useState(currencySelect[0]);

  //
  const [monthlyPayment, setMonthlyPayment] = useState("0");

  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const [img, setImg] = useState(false);

  const imgChangeHandler = () => {
    if (!img) {
      setImg(true);
    } else {
      setImg(false);
    }
  };

  // let anInitialFee;

  const [selectedFirstContributionOption, setSelectedFirstContributionOption] =
    useState(firstContributionOptions[0]);
  const [selectedYearOption, setSelectedYearOption] = useState(yearOptions[0]);

  const firstContribution =
    (Number(price) * selectedFirstContributionOption) / 100;

  const leftover = Number(price) - firstContribution;

  const resultEdinPercent = (price / 100) * edinPercent;
  const summaPvEv = firstContribution + resultEdinPercent;

  //valuta

  const Valuta = () => {
    setCurrency();
  };

  // срок ожидания
  const setSelectedFirstContributionValue = (val) => {
    setSelectedFirstContributionOption(val);
    getSrok(val);
  };

  const srokOptions = {
    9: "6 месяцев",
    10: "7 месяцев",
    15: "5.5 месяцев",
    20: "5 месяцев",
    25: "4.5 месяцев",
    30: "4 месяцев",
    35: "3,5 месяцев",
    40: "3 месяцев",
    45: "2,5 месяцев",
    50: "2 месяцев",
  };

  const getSrok = (val) => {
    setSrok(srokOptions[val] || "");
  };

  return (
    <>
      <div>
        <ul
          className="nav nav-pills mb-3 glav"
          id="pills-tab"
          role="tablist"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Недвижимость
              <img
                src={!img ? domWhite : ned}
                alt=""
                className="dom"
                style={{ width: "20px" }}
              />
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Авто
              <img src={!img ? autoWhite : bulbon} alt="" className="dom" />
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Спец. Техника
              <img src={!img ? specWhite : bulbon} alt="" className="dom" />
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-nak-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-nak"
              type="button"
              role="tab"
              aria-controls="pills-nak"
              aria-selected="false"
            >
              Накопительная
              <img src={!img ? nakWhite : bulbon} alt="" className="dom" />
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <Ned />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Avto />
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <Spec />
          </div>
          <div
            className="tab-pane fade"
            id="pills-nak"
            role="tabpanel"
            aria-labelledby="pills-nak-tab"
          >
            <Nako />
          </div>
        </div>
      </div>
    </>
  );
};
//

// ежемесячный платеж не менее 100$  недвижимость.
// ежемесячный платеж не менее 50$  авто.
// ежемесячный платеж не менее 75$  спец техника.

// выводить красный текст если не подходит по условиям

//авто убираю выборку

// первоначальный взнос от 10%
// срок фин до 5
// срок накопления убираю

//спец техника выборка техники перечисление
// коммер или
// срок накопления
// срок фин 7
// первоначальный 10

//срок ожидания вниз спустить

// убрать желаемый процент - первоначальный взнос
// срок финансирования добавить

// 3 6 9 12 18 24
