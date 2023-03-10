import { useEffect, useState } from "react";
import "./design.css";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { convert } from "exchange-rates-api";
import axios from "axios";

const firstContributionOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const purposeOfFunding = [
  "Строительная техника",
  "Дорожная техника",
  "Автомобильная техника",
  "Сельсохозяйственная техника",
  "Коммерческий транспорт",
];

const yearOptions = [1, 2, 3, 4, 5, 6, 7];
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

const minValueInDollars = 5000;
const maxValueInDollars = 150000;

export const Spec = () => {
  const [count, setCount] = useState(0);
  // const [price, setPrice] = useState("5000");
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

  // console.log(selectedPurposeOfFunding[2], "sdvd");

  return (
    <>
      <div className="home">
        <div className="home-content">
          <div className="left">
            <h1>Спец. техника</h1>
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

            <div>
              <div className=" minmax">
                {selectedCurrency === "сом"
                  ? price < 437090 &&
                    `Минимальная сумма должна составлять от 437090 сом`
                  : ""}
                {selectedCurrency === "сом"
                  ? price > 13112000 &&
                    "Максимальная сумма должна составлять до 13113000.00 сом"
                  : ""}
              </div>

              <div className=" minmax">
                {selectedCurrency === "доллар"
                  ? price < 5000 &&
                    `Минимальная сумма должна составлять от 5000 долларов`
                  : ""}
                {selectedCurrency === "доллар"
                  ? price > 150000 &&
                    "Максимальная сумма должна составлять до 150000 долларов"
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
                  ? price < 2234680 &&
                    `Минимальная сумма должна составлять от 2234680 тенге`
                  : ""}
                {selectedCurrency === "тенге"
                  ? price > 67113690 &&
                    "Максимальная сумма должна составлять до 67113690 тенге"
                  : ""}
              </div>
              <div className=" minmax">
                {selectedCurrency === "рубль"
                  ? price < 374325 &&
                    `Минимальная сумма должна составлять от 374325 рубль`
                  : ""}
                {selectedCurrency === "рубль"
                  ? price > 11214750 &&
                    "Максимальная сумма должна составлять до 11214750  рубль"
                  : ""}
              </div>
            </div>
            {/* цель */}
            <div>Цель финансирования </div>
            <Form.Select
              className="select select-cel"
              style={{ width: "100% !important", display: "flex" }}
              name="% Цель"
              onChange={(event) =>
                setSelectedPurposeOfFunding(event.target.value)
              }
            >
              {purposeOfFunding.map((purposeFunding) => (
                <option key={purposeFunding}>{purposeFunding}</option>
              ))}
            </Form.Select>

            <div>
              <div className="content-price">
                <div className="content-price-block">{selectedCurrency}</div>
                <div className="content-price-block">{price}</div>
              </div>

              {/* <Form.Control
                value={price}
                type="number"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              /> */}
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

              {/* <input
                type="range"
                className="range"
                min={`${minValueInChosenCurrency}`}
                max={`${maxValueInChosenCurrency}`}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              /> */}
            </div>
            {/*  */}

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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Название </th>
                  <th>Результат</th>
                  <th>Валюта</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>3</td>
                  <td>{selectedYearOption}</td>
                  <td>{selectedCurrency} </td>
                </tr> */}
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
                  <td> </td>
                </tr>
                {/* <tr>
                  <td className="td">Срок накопления:</td>
                  <td>{selectedYearOption}</td>
                  <td>{selectedCurrency} </td>
                </tr> */}
              </tbody>
            </Table>

            <div>
              {selectedPurposeOfFunding === "Коммерческий транспорт" ? (
                <div
                  style={{
                    color: "green",
                    fontSize: "22px",
                    fontWeight: "800",
                  }}
                >
                  "Коммерческий транспорт, выводимый за пределы страны юрисдиции
                  кооператива обеспечивается залоговым имуществом"
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              {total < 75 && (
                <>
                  <div class="error">
                    {`ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 75 долларов `}
                    {/* ${currency.title} */}
                  </div>
                </>
              )}

              <div className="error">
                {selectedCurrency === "сом"
                  ? total < 6556 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 6556 сом по курсу 87.42`
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
                  ? total < 33520 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 33520 тенге по курсу 446.94`
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
                  ? total < 5607 &&
                    `ЕЖЕМЕСЯЧНЫЙ ПЛАЖЕТ ДОЛЖЕН СОДЕРЖАТЬ НЕ МЕНЕЕ 5607 рубль по курсу 74.76`
                  : ""}
              </div>
            </div>
            <div className="text-infoo">
              * Срок ожидания зависит от размера первоначального взноса <br />
              * Год выпуска спецтехники не должен быть старше 2000 г <br />*
              Авто и спец технику могут получить только совершеннолетние
              резиденты <br />
              * Имущество не должно находиться в залоге или аресте <br />
              * Имущество не должно находиться в аварийном состоянии <br />
              {/* * На авто и спец технику могут получать только совершеннолетние */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
