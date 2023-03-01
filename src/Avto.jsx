import { useEffect, useState } from "react";
import "./design.css";
import { InputGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import Form from "react-bootstrap/Form";
import { convert } from "exchange-rates-api";
import axios from "axios";
const firstContributionOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const purposeOfFunding = ["Покупка квартиры", "Аренда офиса", "Один", "Два"];

const yearOptions = [1, 2, 3, 4, 5];
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
];

const minValueInDollars = 4000;
const maxValueInDollars = 150000;

export const Avto = () => {
  const [count, setCount] = useState(0);
  // const [price, setPrice] = useState("4000");
  const [srok, setSrok] = useState("6");
  const edin = 5000;
  const edinPercent = 5;
  const [currency, setCurrency] = useState(currencySelect[0]);

  const [selectedFirstContributionOption, setSelectedFirstContributionOption] =
    useState(firstContributionOptions[0]);

  const [selectedPurposeOfFunding, setSelectedPurposeOfFunding] = useState(
    purposeOfFunding[0]
  );
  const [selectedYearOption, setSelectedYearOption] = useState(yearOptions[0]);

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

  // const total = finish / month;
  // const total = (finish / month).toFixed(3);

  //

  const firstContribution =
    (Number(price) * selectedFirstContributionOption) / 100;

  const leftover = Number(price) - firstContribution;

  // const resultEdinPercent = ((price / 100) * edinPercent).toFixed(3);
  const resultEdinPercent = (price / 100) * edinPercent;

  const newResulEdinPercent = resultEdinPercent.toFixed(1);
  const summaPvEv = firstContribution + resultEdinPercent;

  // ежемесячный платеж
  const total = (leftover / month).toFixed(1);

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
      <div className="home">
        <div className="home-content">
          <div className="left">
            <h1>Авто</h1>
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

            {/* цель */}
            {/* <div>Цель финансирования </div>
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
            </Form.Select> */}

            {/* <div style={{ display: "flex", padding: " 20px 0" }}>
              <div style={{}}>
                <div>Стоимость</div>
                <Form.Control
                  value={price}
                  className="summa-select"
                  type="number"
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>

              <div>
                <div>Валюта</div>
                <Form.Select
                  className="select"
                  onChange={(event) => setCurrency(event.target.value)}
                >
                  {currencySelect.map((currency) => (
                    <option key={currency}>{currency}</option>
                  ))}
                </Form.Select>
              </div>
            </div> */}

            {/* <div>
              <input
                type="range"
                className="range"
                min={10000}
                max={150000}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
             </div> */}
            {/*  */}
            <div>
              <div className=" minmax">
                {selectedCurrency === "сом"
                  ? price < 349672 &&
                    `Минимальная сумма должна составлять от 349672 сом`
                  : ""}
                {selectedCurrency === "сом"
                  ? price > 4370905 &&
                    "Максимальная сумма должна составлять до 4370905 сом"
                  : ""}
              </div>

              <div className=" minmax">
                {selectedCurrency === "доллар"
                  ? price < 4000 &&
                    `Минимальная сумма должна составлять от 4000 долларов`
                  : ""}
                {selectedCurrency === "доллар"
                  ? price > 50000 &&
                    "Максимальная сумма должна составлять до 50000 долларов"
                  : ""}
              </div>

              <div className=" minmax">
                {selectedCurrency === "сум"
                  ? price < 113306900 &&
                    `Минимальная сумма должна составлять от 113306900.00 сум`
                  : ""}
                {selectedCurrency === "сум"
                  ? price > 1699603500 &&
                    "Максимальная сумма должна составлять до 1699603500.00 сум"
                  : ""}
              </div>
              <div className=" minmax">
                {selectedCurrency === "тенге"
                  ? price < 1787744 &&
                    `Минимальная сумма должна составлять от 1787744 тенге`
                  : ""}
                {selectedCurrency === "тенге"
                  ? price > 22346805 &&
                    "Максимальная сумма должна составлять до 22346805 тенге"
                  : ""}
              </div>
              <div className=" minmax">
                {selectedCurrency === "рубль"
                  ? price < 299460 &&
                    `Минимальная сумма должна составлять от 299460 рубль`
                  : ""}
                {selectedCurrency === "рубль"
                  ? price > 3743250 &&
                    "Максимальная сумма должна составлять до 3743250  рубль"
                  : ""}
              </div>
            </div>
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
                  <td> </td>
                </tr>
              </tbody>
            </Table>
            <div>
              {total < 50 && (
                <>
                  <div class="error">
                    {`ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 50  долларов `}
                    {/* ${currency.title} */}
                  </div>
                </>
              )}

              <div className="error">
                {selectedCurrency === "сом"
                  ? total < 4370 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 4370 сом по курсу 87.42`
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
                  ? total < 22346 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 22346 тенге по курсу 446.94`
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
                  ? total < 3738 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 3738 рубль по курсу 74.76`
                  : ""}
              </div>
            </div>
            <div className="text-infoo">
              * Срок ожидания зависит от размера первоначального взноса <br />
              * Год выпуска автомашины не должен быть старше 2000 г <br />* Авто
              и спец технику могут получить только совершеннолетние резиденты{" "}
              <br />
              * Имущество не должно находиться в залоге или аресте <br />
              * Имущество не должно находиться в аварийном состоянии <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
