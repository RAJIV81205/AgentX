import { useState } from "react";

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
  const [region, setRegion] = useState("Jammu & Kashmir , India");
  const [checkinDate, setCheckinDate] = useState(tomorrow);
  const [checkoutDate, setCheckoutDate] = useState(dayAfter);
  const [traveller , setTraveller] = useState("1")
  const [isSearching, setIsSearching] = useState(false);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setRegion(value);
  };

  return (
    <div className="pt-0 p-2.5">
      <form className="max-w-7xl bg-white rounded-xl p-10">
        <div className="grid grid-cols-4 gap-2 mb-6 relative">
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
          </div>
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">Check In</div>
            <input
              type="date"
              className="text-xl font-bold focus:outline-0 w-full font-poppins py-2.5"
              value={checkinDate}
              min={checkinDate}
              onChange={(e)=>setCheckinDate(e.target.value)}
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
              onChange={(e)=>setCheckoutDate(e.target.value)}
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
              placeholder={traveller}
              onChange={()=>setTraveller(value)}

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
