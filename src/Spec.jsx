import { useState } from "react";
import "./design.css";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const firstContributionOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const purposeOfFunding = [
  "Строительная техника",
  "Дорожная техника",
  "Автомобильная техника",
  "Сельсохозяйственная техника",
  "Коммерческий транспорт",
];

const yearOptions = [1, 2, 3, 4, 5, 6, 7];
const currencySelect = ["сом", "сум", "рубль", "usd"];

export const Spec = () => {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState("5000");
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

  const newResulEdinPercent = resultEdinPercent.toFixed(3);
  const summaPvEv = firstContribution + resultEdinPercent;

  // ежемесячный платеж
  const total = (leftover / month).toFixed(3);

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

  console.log(selectedPurposeOfFunding[2], "sdvd");

  return (
    <>
      <div className="home">
        <div className="home-content">
          <div className="left">
            <h1>Спец. техника</h1>

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

            <div style={{ display: "flex", padding: " 20px 0" }}>
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
            </div>

            <div>
              <input
                type="range"
                className="range"
                min={10000}
                max={150000}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              {/* <p>Value: {price}</p> */}
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
                <tr>
                  <td>3</td>
                  <td>{selectedYearOption}</td>
                  <td>{currency} </td>
                </tr>
                <tr>
                  <td className="td">Сумма финансирования:</td>
                  <td>{price} </td>
                  <td>{currency} </td>
                </tr>
                <tr>
                  <td className="td">Первоначальный взнос:</td>
                  <td>{firstContribution}</td>
                  <td>{currency} </td>
                </tr>
                <tr>
                  <td className="td">Единаразовый взнос: </td>
                  {/* <td colSpan={2}>{newResulEdinPercent}</td> */}
                  <td>{newResulEdinPercent}</td>
                  <td>{currency} </td>
                </tr>
                <tr>
                  <td className="td">Сумма ПВ и ЕВ:</td>
                  <td>{summaPvEv}</td>
                  <td>{currency} </td>
                </tr>

                <tr>
                  <td className="td">Сумма финансирования:</td>
                  <td>{leftover}</td>
                  <td>{currency} </td>
                </tr>
                <tr>
                  <td className="td">Ежемесячный платеж:</td>
                  <td>{total}</td>
                  <td>{currency} </td>
                </tr>
                <tr>
                  <td className="td">Срок ожидания:</td>
                  <td>{srok}</td>
                  <td>{currency} </td>
                </tr>
                {/* <tr>
                  <td className="td">Срок накопления:</td>
                  <td>{selectedYearOption}</td>
                  <td>{currency} </td>
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
                  кооператива облагается залоговым имуществом"
                </div>
              ) : (
                ""
              )}
            </div>

            {/* <div>{purposeOfFundin[2] ? "rt" : "trhet"}</div> */}
            {/* <div>{purposeOfFunding[2] ? "rtbr" : ""}</div> */}
            {/* <div>{selectedPurposeOfFunding` * Коммерческий транспорт, выводимый за пределы страны юрисдиции
              кооператива облагается залоговым имуществом`}</div> */}
            {/* <div>
              {" "}
              * Коммерческий транспорт, выводимый за пределы страны юрисдиции
              кооператива облагается залоговым имуществом{" "}
            </div> */}

            <div></div>
            {/* <div>{` Цель:  ${toPurposeOfFunding}`}</div> */}
          </div>
        </div>
        <div style={{}}>
          * Срок ожидания зависит от размера первоначального взноса <br />
          * Год выпуска спецтехники не должен быть старше 2000 г <br />
          * Имущество не должно находиться в залоге или аресте <br />
          * Имущество не должно находиться в аварийном состоянии <br />
          <br />* На авто и спец технику могут получать только совершеннолетние
        </div>
      </div>
    </>
  );
};
