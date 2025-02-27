import React from 'react';
import { FaTrain, FaExchangeAlt, FaCalendarAlt } from 'react-icons/fa';

const TrainSearch = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl shadow-lg gap-4">
      <div className="flex items-center bg-white p-4 rounded-2xl shadow-md w-full md:w-1/4">
        <FaTrain className="text-green-500 text-xl mr-3" />
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="From Station"
            className="outline-none text-sm font-bold mb-1 text-gray-700 border-b-2 border-gray-300 focus:border-green-500 transition duration-300"
          />
          <span className="text-xs text-gray-500">From</span>
        </div>
      </div>

      <div className="flex items-center bg-white p-4 rounded-2xl shadow-md w-full md:w-1/4">
        <FaExchangeAlt className="text-green-500 text-xl mr-3" />
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="To Station"
            className="outline-none text-sm font-bold mb-1 text-gray-700 border-b-2 border-gray-300 focus:border-green-500 transition duration-300"
          />
          <span className="text-xs text-gray-500">To</span>
        </div>
      </div>

      <div className="flex items-center bg-white p-4 rounded-2xl shadow-md w-full md:w-1/4">
        <FaCalendarAlt className="text-green-500 text-xl mr-3" />
        <div className="flex flex-col w-full">
          <input
            type="date"
            className="outline-none text-sm font-bold mb-1 text-gray-700 border-b-2 border-gray-300 focus:border-green-500 transition duration-300"
          />
          <span className="text-xs text-gray-500">Departure Date</span>
        </div>
      </div>

      <button className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-green-600 transition duration-300 w-full md:w-1/4">
        Search
      </button>
    </div>
  );
};

export default TrainSearch;
