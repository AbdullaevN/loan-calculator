import React, { useState, useEffect } from "react";
import axios from "axios";

function Converter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    async function fetchCurrencies() {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const currencyNames = Object.keys(response.data.rates);
      setCurrencies(currencyNames);
      setExchangeRate(response.data.rates[toCurrency]);
    }
    fetchCurrencies();
  }, [toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  }

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
  }

  return (
    <div>
      <select value={fromCurrency} onChange={handleFromCurrencyChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <input type="number" value={amount} onChange={handleAmountChange} />
      <select value={toCurrency} onChange={handleToCurrencyChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <div>{convertedAmount}</div>
    </div>
  );
}

export default Converter;
