import { useEffect, useRef, useState } from "react";
import "./design.css";
import "./print.css";
import { Button, InputGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import Form from "react-bootstrap/Form";
import { convert } from "exchange-rates-api";
import axios from "axios";

const firstContributionOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const purposeOfFunding = [
  "Покупка квартиры",
  "Покупка дома",
  "Покупка коммерческой недвижимости ",
  "Строительство",
  "Ремонт",
];

const yearOptions = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];
// const currencySelect = ["сом", "сум", "рубль", "usd", "тенге"];
const currencySelect = [
  {
    title: "сом",
    currency: "KGZ",
  },
  {
    title: "usd",
    currency: "USD",
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
  // {
  //   title: "евро",
  //   currency: "EUR",
  // },
  {
    title: "рубль",
    currency: "RUB",
  },
  {
    title: "тенге",
    currency: "KZT",
  },
  // {
  //   title: "сум",
  //   currency: "UZS",
  // },

  //
];

const minValueInDollars = 10000;
const maxValueInDollars = 150000;

export const Ned = () => {
  async () => {
    const minAmount = await convert(10000, "USD", currency, "2018-01-01");
    console.log(minAmount);
  };

  function printEl() {
    var body = document.body.html(),
      el = document.querySelector(".print");
    document.body.html(el);
    window.print();
    document.body.html(body);
  }

  const [totalError, setTotalError] = useState("er");

  const [count, setCount] = useState(0);
  // const [price, setPrice] = useState("10000");
  const [srok, setSrok] = useState("6");
  // const edin = 5000;
  const edinPercent = 5;
  const [currency, setCurrency] = useState(currencySelect[0]);

  const [selectedFirstContributionOption, setSelectedFirstContributionOption] =
    useState(firstContributionOptions[0]);

  const [selectedPurposeOfFunding, setSelectedPurposeOfFunding] = useState(
    purposeOfFunding[0]
  );
  const [selectedYearOption, setSelectedYearOption] = useState(yearOptions[0]);
  const [toPurposeOfFunding, setToPurposeOfFunding] = useState(
    purposeOfFunding[0]
  );

  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //

  const [selectedCurrency, setSelectedCurrency] = useState(
    CurrencyOptions[0].title
  );
  const [price, setPrice] = useState(`${minValueInDollars}`);
  const [conversionRates, setConversionRates] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios(
          // .get<{
          //   conversion_rates: Record<string, number>;
          // }>
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
  const percent = 15;
  const month = selectedYearOption * 12;

  let res = Number(price * percent) / 100;
  let result = res / month;

  let res2 = Number(result * 100) / percent;

  const finish = price - res;

  //

  const som = 10000;

  const dollar = 10000;
  const minRange = 10000;
  const maxRange = 150000;

  const firstContribution =
    (Number(price) * selectedFirstContributionOption) / 100;

  const leftover = Number(price) - firstContribution;

  // const resultEdinPercent = ((price / 100) * edinPercent).toFixed(3);
  const resultEdinPercent = (price / 100) * edinPercent;

  const newResulEdinPercent = resultEdinPercent.toFixed(0);
  const summaPvEv = (firstContribution + resultEdinPercent).toFixed(0);

  // ежемесячный платеж
  const total = (leftover / month).toFixed(0);

  //

  if (selectedCurrency === "сом") {
    if (total < 8000) {
      console.log("8000");
    } else {
      console.log("no");
    }
  }

  //

  const getErrorTotal = () => {
    if (total <= "100") {
      return "egr";
      totalError;
    } else {
      // console.log("e");
    }
  };
  getErrorTotal();

  //valuta

  const Valuta = () => {
    setCurrency();
  };

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

  // console.log(price * 86, "max");
  return (
    <>
      <div className="home">
        <div className="home-content">
          <div className="left">
            <h1>Недвижимость</h1>

            <div>Сумма</div>
            <Form.Control
              value={price}
              className="summa-select"
              min={`${minValueInChosenCurrency}`}
              max={`${maxValueInChosenCurrency}`}
              type="number"
              onChange={(event) => setPrice(event.target.value)}

              // onChange={(e) => console.log(e ===)}
            />
            {/* {CurrencyOptions === "сом"
              ? price > 8000 && <div className="error">oshibka</div>
              : ""} */}

            <div className=" minmax">
              {selectedCurrency === "сом"
                ? price < 874100 &&
                  `Минимальная сумма должна составлять от 874200.00 сом`
                : ""
                ? price > 13112000 &&
                  "Максимальная сумма должна составлять до 13113000.00 сом"
                : ""}
            </div>

            <div className=" minmax">
              {selectedCurrency === "доллар"
                ? price < 10000 &&
                  `Минимальная сумма должна составлять от 10000 долларов`
                : ""
                ? price > 150000 &&
                  "Максимальная сумма должна составлять до 150000 долларов"
                : ""}
            </div>

            <div className=" minmax">
              {selectedCurrency === "сумм"
                ? price < 113306900 &&
                  `Минимальная сумма должна составлять от 113306900.00 сум`
                : ""
                ? price > 1699603500 &&
                  "Максимальная сумма должна составлять до 1699603500.00 сум"
                : ""}
            </div>
            <div className=" minmax">
              {selectedCurrency === "тенге"
                ? price < 4474246 &&
                  `Минимальная сумма должна составлять от 4474246 тенге`
                : ""
                ? price > 67113690 &&
                  "Максимальная сумма должна составлять до 67113690 тенге"
                : ""}
            </div>
            <div className=" minmax">
              {selectedCurrency === "тенге"
                ? price < 747650 &&
                  `Минимальная сумма должна составлять от 747650 рубль`
                : ""
                ? price > 11214750 &&
                  "Максимальная сумма должна составлять до 11214750  рубль"
                : ""}
            </div>

            {/* цель */}
            <div>Цель финансирования </div>
            <Form.Select
              className="select select-cel"
              style={{ width: "50% !important", display: "flex" }}
              name="% Цель"
              onChange={(event) =>
                setSelectedPurposeOfFunding(event.target.value)
              }
            >
              {purposeOfFunding.map((purposeFunding) => (
                <option key={purposeFunding}>{purposeFunding}</option>
              ))}
            </Form.Select>

            <div style={{ display: "flex", padding: " 20px 0" }}></div>

            <div>
              <div className="content-price">
                <div className="content-price-block">{selectedCurrency}</div>
                <div
                  className="content-price-block"
                  // onChange={(event) => setPrice(event.target.value)}
                >
                  {price}
                </div>
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

              <input
                type="range"
                className="range"
                min={`${minValueInChosenCurrency}`}
                max={`${maxValueInChosenCurrency}`}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "15px 0",
              }}
            >
              <div>Первоначальный взнос</div>
              <Form.Select
                className="select"
                name="% Первоначальный взнос"
                onChange={(event) =>
                  setSelectedFirstContributionValue(event.target.value)
                }
              >
                {firstContributionOptions.map((firstContributionOption) => (
                  <option key={firstContributionOption}>
                    {firstContributionOption}
                  </option>
                ))}
              </Form.Select>
            </div>

            {/*   2*/}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "15px 0",
              }}
            >
              <div>Срок финансирования</div>
              <Form.Select
                className="select"
                name="Срок"
                onChange={(event) => setSelectedYearOption(event.target.value)}
              >
                {yearOptions.map((yearOption) => (
                  <option key={yearOption}>{yearOption}</option>
                ))}
              </Form.Select>
            </div>

            {/*  */}
          </div>
          <div className="right print  table-responsive">
            <Table striped bordered hover className="table">
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
                  {/* <td colSpan={2}>{newResulEdinPercent}</td> */}
                  <td>{newResulEdinPercent}</td>
                  <td>{selectedCurrency} </td>
                </tr>
                <tr>
                  <td className="td">Сумма ПВ и ЕВ:</td>
                  <td>{summaPvEv}</td>
                  <td>{selectedCurrency} </td>
                </tr>

                <tr>
                  <td className="td">Сумма финансирования:</td>
                  <td>{leftover}</td>
                  <td>{selectedCurrency} </td>
                </tr>
                <tr>
                  <td className="td">Ежемесячный платеж:</td>
                  <td>{total}</td>
                  <td>{selectedCurrency} </td>
                </tr>
                <tr>
                  <td className="td">Срок ожидания:</td>
                  <td>{srok}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>

            <div>
              {total < 100 && (
                <>
                  <div class="error">
                    {`ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 100  usd `}
                    {/* ${currency.title} */}
                  </div>
                </>
              )}

              <div className="error">
                {selectedCurrency === "сом"
                  ? total < 8600 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 8800 сом`
                  : ""}
              </div>
              <div className="error">
                {selectedCurrency === "евро"
                  ? total < 95 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 94 евро`
                  : ""}
              </div>
              <div className="error">
                {selectedCurrency === "тенге"
                  ? total < 45000 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 44500 тенге`
                  : ""}
              </div>
              <div className="error">
                {selectedCurrency === "сум"
                  ? total < 1142000 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 114100 сум`
                  : ""}
              </div>
              <div className="error">
                {selectedCurrency === "рубль"
                  ? total < 7500 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 7500 рубль`
                  : ""}
              </div>
            </div>

            <div>
              {selectedPurposeOfFunding === "Строительство" ? (
                <div
                  style={{
                    color: "green",
                    fontSize: "22px",
                    fontWeight: "800",
                  }}
                >
                  Строительство обеспечивается залоговым имуществом
                </div>
              ) : (
                // selectedPurposeOfFunding
                ""
              )}
            </div>
            <div>
              {selectedPurposeOfFunding === "Ремонт" ? (
                <div
                  style={{
                    color: "green",
                    fontSize: "22px",
                    fontWeight: "800",
                  }}
                >
                  Ремонт обеспечивается залоговым имуществом
                </div>
              ) : (
                // selectedPurposeOfFunding
                ""
              )}
            </div>

            <div className="text-infoo">
              * Недвижимость должна быть сдана в эксплуатацию и иметь
              технический паспорт <br />
              * В случае желания приобрести на одну семью несколько
              недвижимостей - предоставить справку о составе семьи <br />
              * Год постройки не должен превышать 1965 г <br />
              * Имущество не должно находиться в залоге или аресте <br />
              * Имущество не должно находиться в аварийном состоянии <br />*
              Строительство и ремонт финансируется поэтапно (по графику)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
