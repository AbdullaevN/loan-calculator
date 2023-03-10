import { useEffect, useState } from "react";
import "./design.css";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { convert } from "exchange-rates-api";
import axios from "axios";

const savingPercentage = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const monthOptions = [3, 6, 9, 12, 18, 24];

const edinper = [
  {
    title: "four",
    value: 4,
  },
  {
    title: "uch jarym",
    value: 3.5,
  },
  {
    title: "uch",
    value: 3,
  },
];

const CurrencyOptions = [
  {
    title: "доллар",
    currency: "USD",
  },
  {
    title: "сом",
    currency: "KGS",
  },

  {
    title: "рубль",
    currency: "RUB",
  },
  {
    title: "тенге",
    currency: "KZT",
  },
];

const minValueInDollars = 4000;
const maxValueInDollars = 150000;

export const Nako = () => {
  const [price, setPrice] = useState("150000");
  const [srok, setSrok] = useState("2");

  const [waitTime, setWaitTime] = useState("5");
  let edinPercent = 4;

  const [selectedFirstContributionOption, setSelectedFirstContributionOption] =
    useState(savingPercentage[0]);
  const [selectedYearOption, setSelectedYearOption] = useState(monthOptions[0]);

  const firstContribution =
    (Number(price) * selectedFirstContributionOption) / 100;

  const leftover = (Number(price) - firstContribution).toFixed(1);

  const resultEdinPercent = (price / 100) * edinPercent;

  const newResulEdinPercent = resultEdinPercent.toFixed(1);

  // const summaPvEv = firstContribution + resultEdinPercent;

  //

  const [selectedCurrency, setSelectedCurrency] = useState(
    CurrencyOptions[0].title
  );
  const [conversionRates, setConversionRates] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios(
          "https://v6.exchangerate-api.com/v6/1e7cf64bfbea115cf5c534ee/latest/USD"
        );

        setConversionRates(data.conversion_rates);
      } catch (e) {
        console.log(e);
      }
    }

    getData();
  }, []);

  const selectedCurrencyCode = CurrencyOptions.find(
    ({ title }) => title === selectedCurrency
  )?.currency;

  const minValueInChosenCurrency = selectedCurrencyCode
    ? conversionRates[selectedCurrencyCode] * minValueInDollars
    : minValueInDollars;
  const maxValueInChosenCurrency = selectedCurrencyCode
    ? conversionRates[selectedCurrencyCode] * maxValueInDollars
    : maxValueInDollars;

  //

  //ежемесячный платеж
  const percent = 5;
  const month = selectedYearOption * 12;

  let res = Number(price * percent) / 100;
  let result = res / month;

  // ежемесячный платеж
  const total = (leftover / month).toFixed(1);
  //

  // срок ожидания
  const setSelectedFirstContributionValue = (val) => {
    setSelectedFirstContributionOption(val);
    getSrok(val);
  };
  let result2 = (Number(price) / 100) * Number(selectedFirstContributionOption);

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

  const handleChosenPeriod = (event) => {
    setSelectedYearOption(event.target.value);

    const value = parseInt(event.target.value);

    let time = 0;

    switch (value) {
      case 3:
        time = 5;
        break;
      case 6:
        time = 5;
        break;
      case 9:
        time = 4.5;
        break;
      case 12:
        time = 4.5;
        break;
      case 18:
        time = 4;
        break;
      case 24:
        time = 4;
        break;
      default:
        console.log("Выберите значение 3, 9 или 24.");
    }

    setWaitTime(time);
  };
  const summaPvEv = firstContribution + resultEdinPercent;

  // const [price, setPrice] = useState(100);
  // const [selectedYearOption, setSelectedYearOption] = useState(3);
  const [calculatedPrice, setCalculatedPrice] = useState("");

  function handleCalculatePrice() {
    // useEffect(() => {
    // const newCalculatedPrice = calculatePrice(selectedYearOption, price);
  }
  // }, []);
  function calculatePrice() {
    if (selectedYearOption == 3) {
      return Number(price / 100) * 4;
    } else if (selectedYearOption == 6) {
      return Number(price / 100) * 4;
    } else if (selectedYearOption == 9) {
      return Number(price / 100) * 3.5;
    } else if (selectedYearOption == 12) {
      return Number(price / 100) * 3.5;
    } else if (selectedYearOption == 18) {
      return Number(price / 100) * 3;
    } else if (selectedYearOption == 24) {
      return Number(price / 100) * 3;
    } else {
      return "";
    }
  }
  calculatePrice();
  console.log(calculatePrice(2000, "ll"));
  // setCalculatedPrice(calculatePrice);
  return (
    <>
      <div className="home">
        <div className="home-content">
          <div className="left">
            <h1>Накопительная</h1>
            <div></div>
            <div>Сумма</div>
            <Form.Control
              value={price}
              className="summa-select"
              min={`${minValueInChosenCurrency}`}
              max={`${maxValueInChosenCurrency}`}
              type="number"
              onChange={(event) => setPrice(event.target.value)}
            />

            <div>
              <div className="content-price">
                <div className="content-price-block">{selectedCurrency}</div>
                <div className="content-price-block">{price}</div>
              </div>

              <Form.Select
                onChange={(event) => {
                  console.log("som", event.target.value);

                  setSelectedCurrency(event.target.value);
                }}
              >
                {CurrencyOptions.map(({ title }) => (
                  <option key={title}>{title}</option>
                ))}
              </Form.Select>
            </div>

            {/* */}

            <div>Первоначальный взнос</div>
            <Form.Select
              className="select"
              name="% Первоначальный взнос"
              onChange={(event) =>
                setSelectedFirstContributionValue(event.target.value)
              }
            >
              {savingPercentage.map((firstContributionOption) => (
                <option key={firstContributionOption}>
                  {firstContributionOption}
                </option>
              ))}
            </Form.Select>

            <div>Срок накопления</div>
            <Form.Select
              className="select"
              name="Срок"
              onChange={(event) => handleChosenPeriod(event)}
            >
              {monthOptions.map((yearOption) => (
                <option key={yearOption}>{yearOption}</option>
              ))}
            </Form.Select>
          </div>
          <div className="right table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Название </th>
                  <th>Результат</th>
                  <th>Валюта</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td">Сумма финансирования:</td>
                  <td>{price} </td>
                  <td>{selectedCurrency} </td>
                </tr>
                <tr>
                  <td className="td">Первоначальный взнос:</td>
                  <td>{firstContribution}</td>
                  <td>{selectedCurrency} </td>
                </tr>

                <tr>
                  <td className="td">Единаразовый взнос: </td>
                  <td>
                    {/* {selectedYearOption == 3 ? Number(price / 100) * 4 : ""}
                    {selectedYearOption == 6 ? Number(price / 100) * 4 : ""}
                    {selectedYearOption == 9 ? Number(price / 100) * 3.5 : ""}
                    {selectedYearOption == 12 ? Number(price / 100) * 3.5 : ""}
                    {selectedYearOption == 18 ? Number(price / 100) * 3 : ""}
                    {selectedYearOption == 24 ? Number(price / 100) * 3 : ""} */}
                    {calculatePrice()}
                  </td>
                  <td>{selectedCurrency} </td>
                </tr>

                <tr>
                  <td className="td">Сумма ПВ и ЕВ:</td>
                  <td>{parseInt(firstContribution + calculatePrice())}</td>
                  <td>{selectedCurrency} </td>
                </tr>
                <tr>
                  <td className="td">Срок ожидания:</td>
                  <td>{waitTime > 0 && <div>{waitTime} </div>}</td>
                  <td>месяцa(цев) </td>
                </tr>
                <tr>
                  <td className="td">Сумма финансирования:</td>
                  <td>{leftover}</td>
                  <td>{selectedCurrency} </td>
                </tr>
                <tr>
                  <td className="td">Срок накопления:</td>
                  <td>{selectedYearOption}</td>
                  <td> месяцa(цев) </td>
                </tr>
              </tbody>
            </Table>

            <div>
              <ol>
                {[...Array(Number(selectedYearOption)).keys()].map((id) => (
                  <li key={id}>
                    {(
                      parseInt(firstContribution + calculatePrice()) /
                      selectedYearOption
                    ).toFixed(2)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
