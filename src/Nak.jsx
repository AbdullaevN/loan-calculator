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

export const Nako = () => {
  const [pers, setPers] = useState();
  const [price, setPrice] = useState("3000000");
  const [srok, setSrok] = useState("2");
  const [currency, setCurrency] = useState(currencySelect[0]);
  const [firstF, setFirstF] = useState("kk");

  // const [perc, setPerc] = useState("5");
  let edinPercent = 4;
  // const percentFunc = (event) => {
  //   setSelectedYearOption(event.target.value);
  //   const value = parseInt(event.target.value);

  //   let ed = 0;
  //   switch (ed) {
  //     case 3:
  //       ed = 5;
  //       break;
  //     case 6:
  //       ed = 4;
  //       break;
  //     default:
  //       "log";
  //   }

  //   setPerc(ed);
  // };

  const mal = 420;

  var money = 3000000;
  var tallage = 14;

  const [selectedFirstContributionOption, setSelectedFirstContributionOption] =
    useState(savingPercentage[2]);
  const [selectedYearOption, setSelectedYearOption] = useState(monthOptions[0]);

  const firstContribution =
    (Number(price) * selectedFirstContributionOption) / 100;

  // console.log(firstContribution);
  const leftover = (Number(price) - firstContribution).toFixed(1);

  // const [selectValue, setSelectValue] = useState("");
  // let edinPercent = 0;
  // switch (selectedYearOption) {
  //   case 3:
  //     edinPercent = 4;
  //   case 9:
  //     edinPercent = 5;
  //   default:
  //     "ff";
  // }
  // setSelectValue(edinPercent);
  // sele = edinPercent;

  // console.log(selectedYearOption, "first");
  // if (selectedYearOption === 3) {
  //   edinPercent = 5;
  // }

  const resultEdinPercent = (price / 100) * edinPercent;
  console.log(edinPercent, "edinP");

  const newResulEdinPercent = resultEdinPercent.toFixed(1);

  const summaPvEv = firstContribution + resultEdinPercent;

  //

  const [selectedCurrency, setSelectedCurrency] = useState(
    CurrencyOptions[0].title
  );
  // const [price, setPrice] = useState(`${minValueInDollars}`);
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
  const percent = 5;
  const month = selectedYearOption * 12;

  let res = Number(price * percent) / 100;
  let result = res / month;

  let res2 = Number(result * 100) / percent;

  const finish = price - res;

  // const resultEdinPercent = ((price / 100) * edinPercent).toFixed(3);
  // const resultEdinPercent = (price / 100) * edinPercent;

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

  const options = [3, 6, 9, 18, 24];
  const [selectedOption, setSelectedOption] = useState("");
  const [waitTime, setWaitTime] = useState("5");

  // const [edinPerc, setEdinPerc] = useState("4800");

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
    // setEdinPerc(time);
  };
  // const resultEdinPercent = (price / 100) * edinPerc;
  // const newResulEdinPercent = resultEdinPercent.toFixed(1);

  // const summaPvEv = firstContribution + resultEdinPercent;

  const calculateOneTimePayment = () => {
    switch (selectValue) {
      case "3":
        return sum * 0.04;
      case "6":
        return sum * 0.05;
      case "9":
        return sum * 0.06;
      case "12":
        return sum * 0.07;
      default:
        return 0;
    }
  };

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

              {/* <input
                    type="range"
                    className="range"
                    min={`${minValueInChosenCurrency}`}
                    max={`${maxValueInChosenCurrency}`}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  /> */}
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

            {/*     2*/}
            <div>Срок накопления</div>
            <Form.Select
              className="select"
              name="Срок"
              onChange={(event) => handleChosenPeriod(event)}
              // onClick={(e) => percentFunc(e)}
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
                  {/* <td colSpan={2}>{newResulEdinPercent}</td> */}
                  <td>
                    {/* {newResulEdinPercent} */}
                    {console.log(
                      selectedYearOption,

                      "yearOption"
                    )}

                    {selectedYearOption == 3 ? Number(price / 100) * 4 : ""}
                    {selectedYearOption == 6 ? Number(price / 100) * 4 : ""}

                    {selectedYearOption == 9 ? Number(price / 100) * 3.5 : ""}
                    {selectedYearOption == 12 ? Number(price / 100) * 3.5 : ""}
                    {selectedYearOption == 18 ? Number(price / 100) * 3 : ""}
                    {selectedYearOption == 24 ? Number(price / 100) * 3 : ""}
                  </td>
                  <td>{selectedCurrency} </td>
                </tr>
                {/* <tr>
                  <td className="td">Ежемесячный платеж:</td>
                  <td>{total}</td>
                  <td>{selectedCurrency} </td>
                </tr> */}
                <tr>
                  <td className="td">Сумма ПВ и ЕВ:</td>
                  <td>{summaPvEv}</td>
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

            {/* <div>
              <label>
                Выберите значение:
                <select value={selectedOption} onChange={handleOptionChange}>
                  <option value="">--Выберите--</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              {waitTime > 0 && (
                <p>Ваш срок ожидания составляет {waitTime} месяцев.</p>
              )}
            </div> */}
            <div>
              <ol>
                {[...Array(Number(selectedYearOption)).keys()].map((id) => (
                  <li key={id}>
                    {(summaPvEv / selectedYearOption).toFixed(2)}
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
