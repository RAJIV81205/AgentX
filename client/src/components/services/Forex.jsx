import { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const Forex = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch list of currencies
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setCurrencies(Object.keys(data.rates));
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      const converted = (amount * rate).toFixed(2);
      setExchangeRate(`1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`);
      setConvertedAmount(converted);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="max-w-7xl mx-auto p-4 pt-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 relative">
          <div className="col-span-1 border rounded-md p-4">
            <div className="text-sm text-gray-500">Amount</div>
            <input
              type="number"
              className="text-2xl font-bold focus:outline-0 w-full font-poppins"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">From</div>
            <select
              className="text-2xl font-bold focus:outline-0 w-full font-poppins bg-transparent"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency} className="text-sm py-1">
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={swapCurrencies}
            className="absolute left-2/3 top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border p-2 z-10 hover:shadow-md transition-shadow hidden md:block"
            aria-label="Swap currencies"
          >
            <FaExchangeAlt />
          </button>

          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">To</div>
            <select
              className="text-2xl font-bold focus:outline-0 w-full font-poppins bg-transparent"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency} className="text-sm py-1">
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-blue-500 text-2xl" />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500">Exchange Rate</div>
              <div className="text-lg font-semibold text-gray-900">
                {exchangeRate}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Converted Amount</div>
              <div className="text-3xl font-bold text-blue-600">
                {convertedAmount} {toCurrency}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Forex;