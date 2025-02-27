import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const Flights = () => {
  const [tripType, setTripType] = useState("One Way");
  const [fromLocation, setFromLocation] = useState("Mumbai");
  const [toLocation, setToLocation] = useState("Bengaluru");
  const [fromCode, setFromCode] = useState(
    "BOM, Chhatrapati Shivaji International Airport"
  );
  const [toCode, setToCode] = useState("BLR, Bengaluru International Airport");
  const [fareType, setFareType] = useState("Regular");
  const swapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
    setFromCode(toCode);
    setToCode(fromCode);
  };
  return (
    <>
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
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            checked={tripType === "Multi City"}
            onChange={() => setTripType("Multi City")}
            className="w-4 h-4"
          />
          <span>Multi City</span>
        </label>
        <div className="ml-auto text-gray-700">
          Book International and Domestic Flights
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-6 relative">
        <div className="col-span-1 border rounded-md p-4">
          <div className="text-sm text-gray-500">From</div>
          <input className="text-2xl font-bold focus:outline-0 w-full" maxLength={20} placeholder={fromLocation}/>
          <div className="text-sm text-gray-500 truncate">{fromCode}</div>
        </div>

        <button
          onClick={swapLocations}
          className="absolute left-1/3 top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border p-2 z-10 hover:shadow-md transition-shadow"
          aria-label="Swap locations"
        >
          <FaExchangeAlt />
        </button>

        <div className="col-span-1 border rounded-md p-4">
          <div className="text-sm text-gray-500">To</div>
          <input className="text-2xl font-bold focus:outline-0 w-full" maxLength={20} placeholder={toLocation}/>
          <div className="text-sm text-gray-500 truncate">{toCode}</div>
        </div>

        <div className="col-span-1 border rounded-md p-4">
          <div className="text-sm text-gray-500">Departure</div>
          <div className="text-2xl font-bold">6</div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-700">Mar'25</span>
            <span className="text-sm text-gray-500">Thursday</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md text-lg transition-colors">
        SEARCH
      </button>
    </>
  );
};
export default Flights;
