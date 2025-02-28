import React from "react";
import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const TrainSearch = () => {
  const today = new Date().toISOString().split("T")[0];
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromCode, setFromCode] = useState("ASN");
  const [toCode, setToCode] = useState("NDLS");
  const [departureDate, setDepartureDate] = useState(today);
  const [isSearching, setIsSearching] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const fetchSuggestions = async (input, setSuggestions) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.ixigo.com/action/content/trainstation?searchFor=trainstationsLatLon&anchor=false&value=${input}`
      );
      const data = await response.json();

      
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };



  const handleFromCityChange = (e) => {
    const value = e.target.value;
    setFromCity(value);
    setFromCode("");
    fetchSuggestions(value, setFromSuggestions);
  };

  const handleToCityChange = (e) => {
    const value = e.target.value;
    setToCity(value);
    setToCode("");
    fetchSuggestions(value, setToSuggestions);
  };




  const swapCities = () => {
    const tempCity = fromCity;
    const tempCode = fromCode;

    setFromCity(toCity);
    setToCity(tempCity);
    setFromCode(toCode);
    setToCode(tempCode);
  };


  const handleSuggestionClick = (
    suggestion,
    setCity,
    setCode,
    setSuggestions
  ) => {
    const cityName = suggestion.e;
    const stnCode = suggestion.e.match(/\(([^)]+)\)/)[1];
    const cityCode = stnCode;
    setCity(cityName);
    setCode(cityCode);
    setSuggestions([]);
  };



  return (
    <div>
      <form className="bg-white p-10 rounded-xl shadow-lg">
        <div className="grid grid-cols-3 gap-2 mb-6 relative">
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">From</div>
            <input
              className="text-2xl font-bold focus:outline-0 w-full font-poppins"
              maxLength={20}
              placeholder="Asansol Jn"
              value={fromCity}
              onChange={handleFromCityChange}
              required
            />
            <div className="text-sm text-gray-500 truncate">{fromCode}</div>
            {fromSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 left-0">
                {fromSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion,
                        setFromCity,
                        setFromCode,
                        setFromSuggestions
                      )
                    }
                  >
                    {suggestion.e}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={swapCities}
            className="absolute left-1/3 top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border p-2 z-10 hover:shadow-md transition-shadow"
            aria-label="Swap cities"
          >
            <FaExchangeAlt />
          </button>

          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">To</div>
            <input
              className="text-2xl font-bold focus:outline-0 w-full font-poppins"
              maxLength={20}
              placeholder="New Delhi Jn"
              value={toCity}
              onChange={handleToCityChange}
              required
            />
            <div className="text-sm text-gray-500 truncate">{toCode}</div>
            {toSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 left-0">
                {toSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion,
                        setToCity,
                        setToCode,
                        setToSuggestions
                      )
                    }
                  >
                    {suggestion.e}
                  </li>
                ))}
              </ul>
            )}
          
          </div>

          <div className="col-span-1 border rounded-md p-4">
            <div className="text-sm text-gray-500">Departure</div>
            <input
              type="date"
              className="text-xl font-bold focus:outline-0 w-full"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={today}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md text-lg transition-colors font-montserrat"
          disabled={isSearching}
        >
          {isSearching ? "SEARCHING..." : "SEARCH"}
        </button>
      </form>
    </div>
  );
};

export default TrainSearch;
