"use client"

import { useState } from "react"
import { FaLocationDot } from "react-icons/fa6"
import { FaSpinner } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import { FaStar, FaMapMarkerAlt, FaRegCalendarAlt, FaRegClock, FaRegUser } from "react-icons/fa"

const Hotels = () => {
  const tomorrow = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split("T")[0]
  }

  const dayAfter = () => {
    const today = new Date()
    today.setDate(today.getDate() + 2)
    return today.toISOString().split("T")[0]
  }

  const [city, setCity] = useState("")
  const [region, setRegion] = useState("Jammu & Kashmir, India")
  const [checkinDate, setCheckinDate] = useState(tomorrow())
  const [checkoutDate, setCheckoutDate] = useState(dayAfter())
  const [traveller, setTraveller] = useState("1")
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [hotelList, setHotelList] = useState([])
  const [loading, setLoading] = useState(false)

  const handleCityChange = (e) => {
    const value = e.target.value
    setCity(value)
    setRegion()
    fetchSuggestions(e)
  }

  const fetchSuggestions = async (e) => {
    try {
      const response = await fetch(
        `https://srv.wego.com/places/search?locale=en&site_code=IN&query=${e.target.value}&types[]=city&types[]=district&types[]=hotel&types[]=region&min_hotels=1`,
      )
      const data = await response.json()
      if (response.ok) {
        const suggestions = data.filter((item) => item.type === "city")
        setSuggestions(suggestions)
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name)
    setRegion(suggestion.stateEnName || suggestion.countryName)
    setSuggestions([])
  }

  const searchHotel = async (e) => {
    e.preventDefault()
    setIsSearching(true)

    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${city}`
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f52750023dmshe3f6d17241873e7p101b5ajsna0eb45d88394",
        "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      },
    }

    try {
      const response = await fetch(url, options)
      const result = await response.json()
      const id = result.data[0].dest_id
      getHotel(id)
    } catch (error) {
      console.error(error)
    }
  }

  async function getHotel(id) {
    setLoading(true)
    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${id}&search_type=CITY&arrival_date=${checkinDate}&departure_date=${checkoutDate}&adults=${traveller}&page_number=1&languagecode=en-us&currency_code=INR`
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f52750023dmshe3f6d17241873e7p101b5ajsna0eb45d88394",
        "x-rapidapi-host": "booking-com15.p.rapidapi.com",
      },
    }

    try {
      const response = await fetch(url, options)
      const hotels = await response.json()
      console.log(hotels)
      const hotelData = hotels.data.hotels.map((hotel) => ({
        hotel_name: hotel.property.name,
        hotel_id: hotel.hotel_id,
        checkin: hotel.property.checkinDate,
        checkout: hotel.property.checkoutDate,
        checkinTime: hotel.property.checkin?.fromTime ?? "",
        checkoutTime: hotel.property.checkout?.fromTime ?? "",
        lat: hotel.property.latitude,
        lon: hotel.property.longitude,
        pics: hotel.property.photoUrls.map((pic) => pic),
        reviews: hotel.property.reviewCount,
        score: hotel.property.reviewScore,
        totalPrice:
          (hotel.property.priceBreakdown?.grossPrice?.value ?? 0) +
          (hotel.property.priceBreakdown?.excludedPrice?.value ?? 0),
      }))
      console.log(hotelData)
      setHotelList(hotelData)
      setLoading(false)
      setIsSearching(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
      setIsSearching(false)
    }
  }

  return (
    <div className="pt-0 p-2.5">
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-7xl" onSubmit={searchHotel}>
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
              <div className="absolute z-10 w-full bg-white border-gray-500 border-1 rounded-xl mt-1 left-0 max-h-60 overflow-auto shadow-lg">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center">
                        <FaLocationDot className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">{suggestion.name}</div>
                          <div className="text-sm text-gray-500">
                            {suggestion.stateEnName || suggestion.countryName}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="col-span-1 border rounded-md p-4 relative">
            <div className="text-sm text-gray-500">Check In</div>
            <input
              type="date"
              className="text-xl font-bold focus:outline-0 w-full font-poppins py-2.5"
              value={checkinDate}
              min={tomorrow()}
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
              SEARCH HOTELS
              <FaArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </button>
        </motion.form>
      <div className="max-w-7xl mx-auto mt-8">
        <AnimatePresence>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    <div className="flex space-x-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-full mt-4"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!loading && hotelList.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {hotelList.map((hotel, index) => (
                <motion.div
                  key={hotel.hotel_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    {hotel.pics && hotel.pics.length > 0 ? (
                      <img
                        src={hotel.pics[0] || "/placeholder.svg"}
                        alt={hotel.hotel_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                    {hotel.score && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md flex items-center">
                        <FaStar className="mr-1 text-yellow-300" />
                        <span className="font-bold">{hotel.score}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">{hotel.hotel_name}</h3>

                    <div className="flex items-center text-gray-600 mb-2">
                      <FaMapMarkerAlt className="mr-1 text-gray-400" />
                      <a
                        href={`https://www.google.com/maps?q=${hotel.lat},${hotel.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors duration-200 inline-flex items-center"
                      >
                        <span>See on Map</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaRegCalendarAlt className="mr-1 text-gray-400" />
                        <span>Check-in: {hotel.checkin}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaRegCalendarAlt className="mr-1 text-gray-400" />
                        <span>Check-out: {hotel.checkout}</span>
                      </div>
                      {hotel.checkinTime && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaRegClock className="mr-1 text-gray-400" />
                          <span>From: {hotel.checkinTime}</span>
                        </div>
                      )}
                      {hotel.checkoutTime && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FaRegClock className="mr-1 text-gray-400" />
                          <span>Until: {hotel.checkoutTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <FaRegUser className="mr-1 text-gray-400" />
                        <span className="text-sm text-gray-600">{hotel.reviews || 0} reviews</span>
                      </div>
                      <div className="text-blue-600 font-bold">₹{Math.round(hotel.totalPrice).toLocaleString()}</div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && hotelList.length === 0 && isSearching === false && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
            <p className="text-gray-500 text-lg">Search for hotels to see results</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Hotels

