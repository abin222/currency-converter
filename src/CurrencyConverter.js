import React, { useState, useEffect } from "react";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import HistoricalChart from "./HistoricalChart";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(
    () => localStorage.getItem("fromCurrency") || "USD"
  );
  const [toCurrency, setToCurrency] = useState(
    () => localStorage.getItem("toCurrency") || "EUR"
  );
  const [amount, setAmount] = useState(
    () => localStorage.getItem("amount") || 1
  );
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_9FMK0TUx87dDNpA43lJYavN1n5TdQjYaeaWAlJhS"
  ); // Replace with your API key

  useEffect(() => {
    // Fetch available currencies
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

  useEffect(() => {
    localStorage.setItem("fromCurrency", fromCurrency);
  }, [fromCurrency]);

  useEffect(() => {
    localStorage.setItem("toCurrency", toCurrency);
  }, [toCurrency]);

  useEffect(() => {
    localStorage.setItem("amount", amount);
  }, [amount]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleConvert();
    }, 10 * 60 * 1000); // Every 10 minutes

    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency, amount]);

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

  const addFavorite = () => {
    const pair = `${fromCurrency}_${toCurrency}`;
    if (!favorites.includes(pair)) {
      setFavorites([...favorites, pair]);
    }
  };

  const removeFavorite = (pair) => {
    setFavorites(favorites.filter((fav) => fav !== pair));
  };

  const isFavorite = favorites.includes(`${fromCurrency}_${toCurrency}`);

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    // Add more as needed
  };

  return (
    <div className={`container mt-5 ${darkMode ? "bg-dark text-white" : ""}`}>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <h1 className="text-center mb-4">Currency Converter</h1>
      <div className="card p-4">
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
        <div>
          {isFavorite ? (
            <button
              className="btn btn-warning"
              onClick={() => removeFavorite(`${fromCurrency}_${toCurrency}`)}
            >
              Remove Favorite
            </button>
          ) : (
            <button className="btn btn-outline-primary" onClick={addFavorite}>
              Add to Favorites
            </button>
          )}
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {convertedAmount && (
          <div className="alert alert-success mt-3">
            {currencySymbols[fromCurrency] || fromCurrency} {amount}{" "}
            {fromCurrency} = {currencySymbols[toCurrency] || toCurrency}{" "}
            {convertedAmount.toFixed(2)} {toCurrency}
          </div>
        )}
        {/* Favorites Section */}
        <div className="mt-4">
          <h3>Favorites</h3>
          {favorites.length === 0 ? (
            <p>No favorites added.</p>
          ) : (
            <ul className="list-group">
              {favorites.map((pair) => {
                const [favFrom, favTo] = pair.split("_");
                return (
                  <li
                    key={pair}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {favFrom} to {favTo}
                    <div>
                      <button
                        className="btn btn-sm btn-info mr-2"
                        onClick={() => {
                          setFromCurrency(favFrom);
                          setToCurrency(favTo);
                          handleConvert();
                        }}
                      >
                        Convert
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFavorite(pair)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {/* Conversion History */}
      {/* Implement as needed */}
      {/* Historical Chart */}
      {fromCurrency && toCurrency && (
        <div className="mt-5">
          <HistoricalChart base={fromCurrency} target={toCurrency} />
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
