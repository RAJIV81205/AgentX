import { useState, useEffect } from "react";

const Hotels = () => {
  const tomorrow = () => {
    let today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  const dayAfter = () => {
    let today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split("T")[0];
  };

  const [city, setCity] = useState("");
  const [region, setRegion] = useState("Jammu & Kashmir, India");
  const [checkinDate, setCheckinDate] = useState(tomorrow());
  const [checkoutDate, setCheckoutDate] = useState(dayAfter());
  const [traveller, setTraveller] = useState("1");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setRegion();
    fetchSuggestions(e);
  };

  const fetchSuggestions = async (e) => {
    try {
      const response = await fetch(
        `https://srv.wego.com/places/search?locale=en&site_code=IN&query=${e.target.value}&types[]=city&types[]=district&types[]=hotel&types[]=region&min_hotels=1`
      );
      const data = await response.json();
      if (response.ok) {
        const suggestions = data.filter((item) => item.type === "city");
        setSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name);
    setRegion(suggestion.stateEnName || suggestion.countryName);
    setSuggestions([]);
  };

  const searchHotel = async (e) => {
    e.preventDefault();
    setIsSearching()

    const url =
      `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${city}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f52750023dmshe3f6d17241873e7p101b5ajsna0eb45d88394",
        "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-0 p-2.5">
      <form
        className="max-w-7xl bg-white rounded-xl p-10"
        onSubmit={searchHotel}
      >
        <div className="md:grid grid-cols-4 gap-2 mb-6 relative flex flex-col">
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">Destination</div>
            <input
              className="text-2xl font-bold focus:outline-0 w-full font-poppins"
              maxLength={20}
              placeholder="Katra"
              value={city}
              onChange={handleCityChange}
              required
            />
            <div className="text-sm text-gray-500 truncate">{region}</div>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 left-0 max-h-50 overflow-scroll">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name} ,{" "}
                    {suggestion.stateEnName || suggestion.countryName}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">Check In</div>
            <input
              type="date"
              className="text-xl font-bold focus:outline-0 w-full font-poppins py-2.5"
              value={checkinDate}
              min={checkinDate}
              onChange={(e) => setCheckinDate(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">Check Out</div>
            <input
              type="date"
              className="text-xl font-bold focus:outline-0 w-full font-poppins py-2.5"
              min={checkinDate}
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">Travellers</div>
            <input
              type="number"
              className="text-xl font-bold focus:outline-0 w-full font-poppins py-2.5"
              min={1}
              max={8}
              value={traveller}
              onChange={(e) => setTraveller(e.target.value)}
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

export default Hotels;
