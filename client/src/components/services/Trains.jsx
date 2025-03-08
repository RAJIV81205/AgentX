"use client";

import { useState } from "react";
import {
  FaExchangeAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUtensils,
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);

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

  const handleTrainSearch = async (e) => {
    e.preventDefault();

    if (!fromCode || !toCode || !departureDate) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://trainticketapi.railyatri.in/api/trains-between-station-with-sa.json?from=${fromCode}&to=${toCode}&dateOfJourney=${departureDate}%20&action=train_between_station`
      );
      const data = await response.json();
      if (response.ok) {
        const results = data.train_between_stations.map((train) => ({
          train_no: train.train_number,
          train_name: train.train_name,
          source: train.train_src,
          destination: train.train_dstn,
          std: train.from_std,
          arr: train.to_sta,
          run_days: train.train_run_days, // Assuming run_days is already an array of strings
          halt: train.halt_stn,
          from: train.from_station_name,
          to: train.to_station_name,
          distance: train.distance,
          duration: train.duration,
          pantry: train.has_pantry,
        }));
        setSearchResults(results);
      } else {
        alert("Error fetching train data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching train data:", error);
      alert("Error fetching train data. Please try again.");
    } finally {
      setIsSearching(false);
      const resultsElement = document.getElementById("search-results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const formatDuration = (duration) => {
    const dur = duration.split(":");
    const hours = dur[0] + "h";
    const minutes = dur[1] + "m";
    return hours + " " + minutes;
  };

  const isDayRunning = (train, dayName) => {
    const dayAbbreviations = {
      Mon: "Mon",
      M: "Mon",
      Tue: "Tue",
      T: "Tue",
      Wed: "Wed",
      W: "Wed",
      Thu: "Thu",
      Th: "Thu",
      Fri: "Fri",
      F: "Fri",
      Sat: "Sat",
      S: "Sat",
      Sun: "Sun",
      Su: "Sun",
    };

    const normalizedDayName = dayAbbreviations[dayName] || dayName;

    if (!train.run_days || !Array.isArray(train.run_days)) {
      return false;
    }

    return train.run_days.includes(normalizedDayName);
  };

  const openTrainDetails = (train) => {
    setSelectedTrain(train);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 pt-0">
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 rounded-xl border border-blue-300 shadow-lg p-6 md:p-10 max-w-7xl"
        onSubmit={handleTrainSearch}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 relative">
          <div className="border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">From</div>
            <input
              className="text-xl font-bold focus:outline-0 w-full font-poppins"
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
            className="absolute left-1/3 top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border p-2 z-10 hover:shadow-md transition-shadow hidden md:block"
            aria-label="Swap cities"
          >
            <FaExchangeAlt />
          </button>

          <div className="border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">To</div>
            <input
              className="text-xl font-bold focus:outline-0 w-full font-poppins"
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

          <div className="border rounded-md p-4">
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
              SEARCH TRAINS
              <FaArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </button>
      </motion.form>
      {isSearching ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="mb-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="space-y-4 border-t border-gray-200 pt-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row justify-between animate-pulse">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-2">
                      <div className="h-10 bg-gray-200 rounded w-24"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-row sm:flex-col sm:items-end justify-between sm:justify-center sm:ml-4 sm:min-w-[120px]">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6"
            id="search-results"
          >
            <div className="mb-4">
              <h2 className="text-xl font-bold font-montserrat">
                Trains from {fromCode || "Origin"} to {toCode || "Destination"}
              </h2>
              <p className="text-gray-500">
                {departureDate
                  ? new Date(departureDate).toDateString()
                  : "Select a date"}
              </p>
            </div>

            <div className="space-y-4 border-t-1 border-gray-300 pt-2.5">
              {searchResults.map((train, index) => (
                <motion.div
                  key={train.train_no}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white border border-gray-100 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-gray-200 cursor-pointer"
                  onClick={() => openTrainDetails(train)}
                >
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-bold font-poppins text-gray-900">
                          {train.train_name}
                        </h3>
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {train.train_no}
                        </span>
                        {train.pantry && (
                          <div className="ml-2 flex items-center text-xs text-gray-600">
                            <FaUtensils className="h-3 w-3 mr-1" />
                            <span>Pantry</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-2">
                        <div className="min-w-[110px]">
                          <div className="text-xl font-semibold">
                            {train.std}
                          </div>
                          <div className="text-sm text-gray-500">
                            {train.from}
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="w-16 sm:w-24 h-[1px] bg-gray-300 relative">
                            <div className="absolute -top-1.5 w-3 h-3 rounded-full border border-primary bg-white -left-1"></div>
                            <div className="absolute -top-1.5 w-3 h-3 rounded-full border border-primary bg-white -right-1"></div>
                          </div>
                          <div className="mx-2 text-xs text-gray-500">
                            {formatDuration(train.duration)}
                          </div>
                          <div className="w-16 sm:w-24 h-[1px] bg-gray-300"></div>
                        </div>

                        <div className="min-w-[110px]">
                          <div className="text-xl font-semibold">
                            {train.arr}
                          </div>
                          <div className="text-sm text-gray-500">
                            {train.to}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex flex-row sm:flex-col sm:items-end justify-between sm:justify-center sm:ml-4 sm:min-w-[120px]">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaClock className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{formatDuration(train.duration)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{train.distance}</span>
                        </div>
                      </div>

                      <div className="sm:mt-2">
                        <div className="flex items-center justify-end">
                          <FaCalendarAlt className="h-4 w-4 mr-1 text-gray-400" />
                          <div className="flex space-x-1">
                            {[
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat",
                              "Sun",
                            ].map((day, index) => {
                              const isRunningDay = isDayRunning(train, day);

                              return (
                                <div key={index} className="text-center">
                                  <div className="text-xs text-gray-500 mb-1">
                                    {day}
                                  </div>
                                  <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto ${
                                      isRunningDay
                                        ? "bg-primary/15 text-primary"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                                  >
                                    {isRunningDay ? "✓" : "×"}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      )}

      {/* Train Details Modal */}
      {isModalOpen && selectedTrain && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-xl max-w-[550px] w-full max-h-[90vh] overflow-y-auto p-4 md:p-6"
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    {selectedTrain.train_name}
                    <span className="ml-2 text-sm font-normal bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {selectedTrain.train_no}
                    </span>
                  </h2>
                  <div className="text-sm text-gray-500">
                    {selectedTrain.source} to {selectedTrain.destination}
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div className="flex flex-col items-center mb-4 md:mb-0">
                    <div className="text-2xl font-bold">
                      {selectedTrain.std}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedTrain.from}
                    </div>
                  </div>

                  <div className="flex-1 mx-4 flex items-center justify-center">
                    <div className="h-[1px] bg-gray-300 flex-1 relative">
                      <div className="absolute -top-1 w-2 h-2 rounded-full bg-primary -left-1"></div>

                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <span className="text-sm font-medium">
                          {selectedTrain.duration}
                        </span>
                        <span className="text-xs text-gray-500">
                          {selectedTrain.distance}
                        </span>
                      </div>

                      <div className="absolute -top-1 w-2 h-2 rounded-full bg-primary -right-1"></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">
                      {selectedTrain.arr}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedTrain.to}
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="text-gray-500 mr-2">
                      <FaClock size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium">
                        {selectedTrain.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-gray-500 mr-2">
                      <FaMapMarkerAlt size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Distance</div>
                      <div className="font-medium">
                        {selectedTrain.distance}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-gray-500 mr-2">
                      <FaClock size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Stops</div>
                      <div className="font-medium">
                        {selectedTrain.halt} stations
                      </div>
                    </div>
                  </div>

                  {selectedTrain.pantry && (
                    <div className="flex items-center">
                      <div className="text-gray-500 mr-2">
                        <FaUtensils size={18} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Pantry</div>
                        <div className="font-medium">Available</div>
                      </div>
                    </div>
                  )}
                </div>

                <hr className="my-4" />

                <div>
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt size={18} className="mr-2 text-gray-500" />
                    <h3 className="font-medium">Running Days</h3>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs text-gray-500 mb-1">
                            {day}
                          </div>
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto ${
                              selectedTrain.run_days.includes(day)
                                ? "bg-primary/15 text-primary"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {selectedTrain.run_days.includes(day) ? "✓" : "×"}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default TrainSearch;
