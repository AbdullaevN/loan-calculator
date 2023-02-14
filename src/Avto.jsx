import { useState } from "react";
import "./design.css";
import { InputGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import Form from "react-bootstrap/Form";
const firstContributionOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const purposeOfFunding = ["Покупка квартиры", "Аренда офиса", "Один", "Два"];

const yearOptions = [1, 2, 3, 4, 5];
const currencySelect = ["сом", "сум", "рубль", "usd"];

export const Avto = () => {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState("4000");
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
  return (
    <>
      <div className="home">
        <div className="home-content">
          <div className="left">
            <h1>Авто</h1>

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
              <ul>
                <li>
                  * Срок ожидания зависит от размера первоначального взноса
                </li>
                <li>* Год выпуска автомашины не должен быть старше 2000 г</li>
                <li>
                  * Авто и спец технику могут получить только совершеннолетние
                </li>
                <li>* Имущество не должно находиться в залоге или аресте</li>
                <li>* Имущество не должно находиться в аварийном состоянии</li>
              </ul>
            </div>

            {/* <div>Результат</div>
            <div>{`  : ${selectedYearOption}`}</div>

            <div className="div">
              {`Сумма финансирования: ${price} `}
              <div>{currency}</div>
            </div>
            <div className="div">
              {`Первоначальный взнос: ${firstContribution} `}
              <div>{currency}</div>
            </div>
            <div className="div">
              {`Единаразовый взнос: ${newResulEdinPercent} `}
              <div>{currency}</div>
            </div>
            <div className="div">
              {`Сумма ПВ и ЕВ: ${summaPvEv} `}
              <div>{currency}</div>
            </div>
            <div>{`Срок ожидания: ${srok} `}</div>
            <div className="div">
              {`Сумма финансирования: ${leftover}  `}
              <div>{currency}</div>
            </div>
            <div className="div">{`Ежемесячный платеж: ${total} `}</div> */}
            <div>
              {/* <div>{`Срок накопления:  ${selectedYearOption}`}</div>

              <div>{result2}</div> */}
              {/* <ol
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                {[...Array(Number(selectedYearOption)).keys()].map((id) => (
                  <li key={id}>{result2 / selectedYearOption}</li>
                ))}
              </ol> */}
            </div>
            {/* <div>{` Цель:  ${toPurposeOfFunding}`}</div> */}
          </div>
        </div>
      </div>
    </>
  );
};
