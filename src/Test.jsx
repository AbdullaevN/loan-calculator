import React, { useState, useEffect } from "react";
import axios from "axios";

function Converter() {
  const [sum, setSum] = useState(0);
  const [selectValue, setSelectValue] = useState(3);

  const handleChangeSum = (e) => {
    setSum(e.target.value);
  };

  const handleChangeSelect = (e) => {
    setSelectValue(e.target.value);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = sum - calculateOneTimePayment();
    alert(
      `Сумма: ${sum}, Единоразовый взнос: ${calculateOneTimePayment()}, Итого: ${result}`
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Сумма:
          <input type="number" value={sum} onChange={handleChangeSum} />
        </label>
        <br />
        <label>
          Выберите срок:
          <select value={selectValue} onChange={handleChangeSelect}>
            <option value="3">3 месяца</option>
            <option value="6">6 месяцев</option>
            <option value="9">9 месяцев</option>
            <option value="12">12 месяцев</option>
          </select>
        </label>
        <br />
        <button type="submit">Рассчитать</button>
      </form>
    </div>
  );
}

export default Converter;
