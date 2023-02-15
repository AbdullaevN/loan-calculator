import React, { useEffect, useState } from "react";
import axios from "axios";

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
    title: "евро",
    currency: "EUR",
  },
];

const minValueInDollars = 10000;
const maxValueInDollars = 150000;

const ExchangeRate = () => {
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

  return (
    <div>
      <div>{selectedCurrency}</div>
      <div>{price}</div>

      <input
        value={price}
        type="number"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />
      <select
        onChange={(event) => {
          console.log("som", event.target.value);

          setSelectedCurrency(event.target.value);
        }}
      >
        {CurrencyOptions.map(({ title }) => (
          <option key={title}>{title}</option>
        ))}
      </select>

      <input
        type="range"
        className="range"
        min={`${minValueInChosenCurrency}`}
        max={`${maxValueInChosenCurrency}`}
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
    </div>
  );
};

export default ExchangeRate;
