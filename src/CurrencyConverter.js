import React, { useState, useEffect } from "react";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import HistoricalChart from "./HistoricalChart";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_9FMK0TUx87dDNpA43lJYavN1n5TdQjYaeaWAlJhS"
  ); // Replace with your API key

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await freecurrencyapi.currencies();
        setCurrencies(Object.keys(response.data));
      } catch (err) {
        console.error("Error fetching currencies:", err);
      }
    };
    fetchCurrencies();
  }, [freecurrencyapi]);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    setConvertedAmount(null);
    try {
      const response = await freecurrencyapi.latest({
        base_currency: fromCurrency,
        currencies: toCurrency,
      });
      const rate = response.data[toCurrency];
      setConvertedAmount(rate * amount);
    } catch (err) {
      setError("Failed to convert currency. Please try again.");
      console.error("Error converting currency:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    // Add more as needed
  };

  return (
    <div className="card p-4">
      <h1 className="text-center mb-4">Currency Converter</h1>
      <div className="form-row align-items-center">
        <div className="col-md-3 mb-3">
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-control"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-1 mb-3 text-center">
          <button className="btn btn-secondary" onClick={handleSwap}>
            &#8646;
          </button>
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-control"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <button
            className="btn btn-primary btn-block"
            onClick={handleConvert}
            disabled={loading}
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {convertedAmount && (
        <div className="alert alert-success mt-3">
          {currencySymbols[fromCurrency] || fromCurrency} {amount}{" "}
          {fromCurrency} = {currencySymbols[toCurrency] || toCurrency}{" "}
          {convertedAmount.toFixed(2)} {toCurrency}
        </div>
      )}
    </div>
  );
};

const TimeConverter = () => {
  const [timeZoneOptions] = useState(Intl.supportedValuesOf("timeZone"));
  const [fromTimeZone, setFromTimeZone] = useState("UTC");
  const [toTimeZone, setToTimeZone] = useState("America/New_York");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16)); // ISO format for date and time input
  const [convertedTime, setConvertedTime] = useState(null);

  const handleConvertTime = () => {
    const fromDate = new Date(date);
    const toDate = new Date(
      fromDate.toLocaleString("en-US", { timeZone: toTimeZone })
    );
    setConvertedTime(toDate);
  };

  return (
    <div className="card p-4">
      <h1 className="text-center mb-4">Time Zone Converter</h1>
      <div className="form-row align-items-center">
        <div className="col-md-5 mb-3">
          <input
            type="datetime-local"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-control"
            value={fromTimeZone}
            onChange={(e) => setFromTimeZone(e.target.value)}
          >
            {timeZoneOptions.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-1 mb-3 text-center">
          <span>&#8646;</span>
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-control"
            value={toTimeZone}
            onChange={(e) => setToTimeZone(e.target.value)}
          >
            {timeZoneOptions.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2 mb-3">
          <button
            className="btn btn-primary btn-block"
            onClick={handleConvertTime}
          >
            Convert
          </button>
        </div>
      </div>
      {convertedTime && (
        <div className="alert alert-success mt-3">
          {`Converted Time: ${convertedTime.toLocaleString()}`}
        </div>
      )}
    </div>
  );
};

const ConverterTabs = () => {
  const [activeTab, setActiveTab] = useState("currency");

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "currency" ? "active" : ""}`}
            onClick={() => setActiveTab("currency")}
          >
            Currency Converter
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "time" ? "active" : ""}`}
            onClick={() => setActiveTab("time")}
          >
            Time Zone Converter
          </button>
        </li>
      </ul>

      <div className="tab-content mt-4">
        {activeTab === "currency" && <CurrencyConverter />}
        {activeTab === "time" && <TimeConverter />}
      </div>
    </div>
  );
};

export default ConverterTabs;
