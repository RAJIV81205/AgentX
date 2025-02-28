import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const Flights = () => {
  const [tripType, setTripType] = useState("One Way");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromCode, setFromCode] = useState("BOM");
  const [toCode, setToCode] = useState("BLR");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const today = new Date().toISOString().split("T")[0];

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
    <form onSubmit={handleSearch}>
      <div className="flex gap-8 mb-6 mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "One Way"}
            onChange={() => setTripType("One Way")}
            className="w-4 h-4 accent-blue-500"
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
        
        <div className="ml-auto text-gray-700">
          Book International and Domestic Flights
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 relative">
        <div className="col-span-1 border rounded-md p-4 relative">
          <div className="text-sm text-gray-500">From</div>
          <input
            className="text-2xl font-bold focus:outline-0 w-full"
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
            className="text-2xl font-bold focus:outline-0 w-full"
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
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md text-lg transition-colors"
        disabled={isSearching}
      >
        {isSearching ? "SEARCHING..." : "SEARCH"}
      </button>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="mt-8" id="search-results">
          <h2 className="text-xl font-bold mb-4">Flight Results</h2>
          <div className="space-y-4">
            {searchResults.map((flight) => (
              <div
                key={flight.id}
                className="border rounded-md p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={flight.airlineLogo}
                      alt={flight.airline}
                      className="w-8 h-8 mr-2"
                    />
                    <div>
                      <div className="font-bold">{flight.airline}</div>
                      <div className="text-sm text-gray-500">
                        {flight.flightNumber}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">
                      {new Date(flight.departure).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-sm text-gray-500">{flight.origin}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">
                      {Math.floor(flight.duration / 60)}h {flight.duration % 60}
                      m
                    </div>
                    <div className="border-t border-gray-300 w-24 my-1"></div>
                    <div className="text-sm text-gray-500">
                      {flight.direct ? "Direct" : "Connecting"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">
                      {new Date(flight.arrival).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="text-sm text-gray-500">
                      {flight.destination}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{flight.price}</div>
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm mt-2"
                      onClick={() => {
                        const date = departureDate;
                        const formattedDate = date.replace(/-/g, "");
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
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default Flights;
