import { useState } from "react";
import "./design.css";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";

const savingPercentage = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const monthOptions = [3, 6, 9, 12, 24];
const currencySelect = ["сом", "сум", "рубль", "usd"];

export const Nako = () => {
  const [price, setPrice] = useState("3000000");
  const [srok, setSrok] = useState("2");
  const [currency, setCurrency] = useState(currencySelect[0]);

  const edinPercent = 5;

  const mal = 420;

  var money = 3000000;
  var tallage = 14;

  const [selectedFirstContributionOption, setSelectedFirstContributionOption] =
    useState(savingPercentage[2]);
  const [selectedYearOption, setSelectedYearOption] = useState(monthOptions[0]);

  const firstContribution =
    (Number(price) * selectedFirstContributionOption) / 100;

  console.log(firstContribution);
  const leftover = Number(price) - firstContribution;

  const resultEdinPercent = (price / 100) * edinPercent;
  const summaPvEv = firstContribution + resultEdinPercent;

  //ежемесячный платеж
  const percent = 15;
  const month = selectedYearOption * 12;

  let res = Number(price * percent) / 100;
  let result = res / month;

  let res2 = Number(result * 100) / percent;

  const finish = price - res;

  // const resultEdinPercent = ((price / 100) * edinPercent).toFixed(3);
  // const resultEdinPercent = (price / 100) * edinPercent;

  // ежемесячный платеж
  const total = (leftover / month).toFixed(3);
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

  return (
    <>
      <>
        <>
          <div className="home">
            <div className="home-content">
              <div className="left">
                <h1>Накопительная</h1>
                <div></div>
                <div style={{ display: "flex", padding: " 20px 0" }}>
                  <div style={{}}>
                    <div>Сумма</div>
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
                <div>Срок накполения</div>
                <Form.Select
                  className="select"
                  name="Срок"
                  onChange={(event) =>
                    setSelectedYearOption(event.target.value)
                  }
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
                    {/* <tr>
                      <td>3</td>
                      <td>{selectedYearOption}</td>
                      <td>{currency} </td>
                    </tr> */}
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
                      <td className="td">Ежемесячный платеж:</td>
                      <td>{total}</td>
                      <td>{currency} </td>
                    </tr>
                    <tr>
                      <td className="td">Сумма ПВ и ЕВ:</td>
                      <td>{summaPvEv}</td>
                      <td>{currency} </td>
                    </tr>
                    <tr>
                      <td className="td">Срок ожидания:</td>
                      <td>{srok}</td>
                      <td>{currency} </td>
                    </tr>
                    <tr>
                      <td className="td">Сумма финансирования:</td>
                      <td>{leftover}</td>
                      <td>{currency} </td>
                    </tr>
                    <tr>
                      <td className="td">Срок накопления:</td>
                      <td>{selectedYearOption}</td>
                      <td>{currency} </td>
                    </tr>
                  </tbody>
                </Table>

                <div>
                  <ol>
                    {[...Array(Number(selectedYearOption)).keys()].map((id) => (
                      <li key={id}>{result / selectedYearOption}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </>
  );
};