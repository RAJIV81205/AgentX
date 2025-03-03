import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const Flights = () => {
  const today = new Date().toISOString().split("T")[0];
  const [tripType, setTripType] = useState("One Way");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromCode, setFromCode] = useState("BOM");
  const [toCode, setToCode] = useState("BLR");
  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [hoveredFlightId, setHoveredFlightId] = useState(null);

  const fetchSuggestions = async (input, setSuggestions) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://srv.wego.com/places/search?query=${input}&language=en&min_airports=1&site_code=IN&locales[]=en&locales[]=hi`
      );
      const data = await response.json();

      const filteredSuggestions = data.filter(
        (item) => item.type === "airport" && item.code && item.name
      );
      setSuggestions(filteredSuggestions);
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

  const handleSuggestionClick = (
    suggestion,
    setCity,
    setCode,
    setSuggestions
  ) => {
    const cityName = suggestion.name;
    const cityCode = suggestion.code;
    setCity(cityName);
    setCode(cityCode);
    setSuggestions([]);
  };

  const swapCities = () => {
    const tempCity = fromCity;
    const tempCode = fromCode;

    setFromCity(toCity);
    setToCity(tempCity);
    setFromCode(toCode);
    setToCode(tempCode);
  };

  async function getID(code) {
    const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/auto-complete?query=${code}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f52750023dmshe3f6d17241873e7p101b5ajsna0eb45d88394",
        "x-rapidapi-host": "skyscanner80.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const id = result.data[0].id;
      return id;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!fromCity || !toCity || !departureDate) {
      alert("Please fill in all required fields");
      return;
    }

    if (tripType === "Round Trip" && !returnDate) {
      alert("Please select a return date for round trip");
      return;
    }

    setIsSearching(true);

    const fromID = await getID(fromCode);
    const toID = await getID(toCode);

    const url = `https://skyscanner80.p.rapidapi.com/api/v1/flights/search-one-way?fromId=${fromID}&toId=${toID}&departDate=${departureDate}&adults=1&cabinClass=economy&currency=INR&locale=en-US`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f52750023dmshe3f6d17241873e7p101b5ajsna0eb45d88394",
        "x-rapidapi-host": "skyscanner80.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.data && result.data.itineraries) {
        const formattedResults = result.data.itineraries.map((itinerary) => ({
          id: itinerary.id,
          airline: itinerary.legs[0].carriers.marketing[0].name,
          flightNumber: itinerary.legs[0].segments[0].flightNumber,
          departure: itinerary.legs[0].segments[0].departure,
          arrival: itinerary.legs[0].segments[0].arrival,
          duration: itinerary.legs[0].durationInMinutes,
          price: itinerary.price.formatted,
          direct: itinerary.legs[0].stopCount === 0,
          airlineLogo: itinerary.legs[0].carriers.marketing[0].logoUrl,
          origin: itinerary.legs[0].origin.name,
          destination: itinerary.legs[0].destination.name,
          id: itinerary.id,
        }));

        setSearchResults(formattedResults);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }

    setIsSearching(false);

    const resultsElement = document.getElementById("search-results");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSearch}
        className=" max-w-7xl bg-white p-10 rounded-xl shadow-lg"
      >
        <div className="flex gap-8 mb-6 mt-2 ">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              checked={tripType === "One Way"}
              onChange={() => setTripType("One Way")}
              className="w-4 h-4 accent-gray-900"
            />
            <span>One Way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tripType"
              checked={tripType === "Round Trip"}
              onChange={() => setTripType("Round Trip")}
              className="w-4 h-4"
            />
            <span>Round Trip</span>
          </label>

          <div className="ml-auto text-gray-700 font-poppins">
            Book International and Domestic Flights
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 relative">
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">From</div>
            <input
              className="text-2xl font-bold focus:outline-0 w-full font-poppins"
              maxLength={20}
              placeholder="Mumbai"
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
                    {suggestion.name} ({suggestion.code})
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
              placeholder="Bengaluru"
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
                    {suggestion.name} ({suggestion.code})
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
            {tripType === "Round Trip" && (
              <div className="mt-2">
                <div className="text-sm text-gray-500">Return</div>
                <input
                  type="date"
                  className="text-xl font-bold focus:outline-0 w-full"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate || today}
                  required={tripType === "Round Trip"}
                />
              </div>
            )}
          </div>
        </div>

        <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-lg transition-colors duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer font-montserrat"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      SEARCHING...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      SEARCH FLIGHTS
                      <FaArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  )}
                </button>
      </motion.form>
      {searchResults.length > 0 && (
        <div className="w-full animate-fade-in mt-10" id="search-results">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Flight Results
            </h2>
            <div className="text-sm text-gray-500">
              <span className="inline-flex items-center bg-gray-100 px-2.5 py-0.5 rounded-full text-sm font-medium text-gray-800">
                {searchResults.length} flights found
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {searchResults.map((flight) => (
              <div
                key={flight.id}
                className={`relative rounded-xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${
                  hoveredFlightId === flight.id
                    ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border-transparent"
                    : "border border-gray-200 bg-white"
                }`}
                onMouseEnter={() => setHoveredFlightId(flight.id)}
                onMouseLeave={() => setHoveredFlightId(null)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    {/* Airline Info */}
                    <div className="flex items-center space-x-3">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100">
                        <img
                          src={flight.airlineLogo}
                          alt={flight.airline}
                          className="object-contain h-8 w-8"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {flight.airline}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.flightNumber}
                        </div>
                      </div>
                    </div>

                    {/* Flight Times */}
                    <div className="flex items-center space-x-6">
                      {/* Departure */}
                      <div className="text-center">
                        <div className="text-xl font-semibold text-gray-900">
                          {new Date(flight.departure).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {flight.origin}
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex flex-col items-center w-40">
                        <div className="text-xs text-gray-500 mb-1">
                          {Math.floor(flight.duration / 60)}h{" "}
                          {flight.duration % 60}m
                        </div>
                        <div className="w-full flex items-center">
                          <div className="h-0.5 bg-gray-200 flex-1"></div>
                          <div className="flex-shrink-0 mx-1">
                            <FiArrowRight className="h-3 w-3 text-gray-400" />
                          </div>
                          <div className="h-0.5 bg-gray-200 flex-1"></div>
                        </div>
                        <div className="flex items-center mt-1">
                          {flight.direct ? (
                            <span className="flex items-center text-xs text-green-600">
                              <FiCheck className="h-3 w-3 mr-1" />
                              Direct
                            </span>
                          ) : (
                            <span className="flex items-center text-xs text-amber-600">
                              <FiClock className="h-3 w-3 mr-1" />
                              Connecting
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrival */}
                      <div className="text-center">
                        <div className="text-xl font-semibold text-gray-900">
                          {new Date(flight.arrival).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {flight.destination}
                        </div>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex flex-col items-center">
                      <div className="font-bold text-xl text-gray-900">
                        {flight.price}
                      </div>
                      <button
                        className={`mt-2 px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium cursor-pointer font-poppins ${
                          hoveredFlightId === flight.id
                            ? "bg-blue-700 text-white shadow-md transform scale-105"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }`}
                        onClick={() => {
                          const formattedDate = departureDate.replace(/-/g, "");
                          window.open(
                            `https://www.skyscanner.co.in/transport/flights/${fromCode}/${toCode}/${formattedDate}/config/${flight.id}?adultsv2=1&cabinclass=economy&childrenv2=&ref=home&rtn=0&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false`,
                            "_blank"
                          );
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress indicator bar on hover */}
                <div
                  className="h-1 bg-blue-700 absolute bottom-0 left-0 transition-all duration-700 ease-out"
                  style={{
                    width: hoveredFlightId === flight.id ? "100%" : "0%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;
