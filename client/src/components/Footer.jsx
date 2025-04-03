import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaTripadvisor } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About TravelX */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">AgentX</h3>
            <p className="text-gray-400">
              Your trusted partner in travel. We help you discover the world with ease, offering the best deals on flights, hotels, and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTripadvisor size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Flights</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Hotels</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">My Bookings</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Bali, Indonesia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Paris, France</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Tokyo, Japan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">New York, USA</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-poppins">Dubai, UAE</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 font-poppins">24/7 Customer Support</li>
              <li className="text-gray-400 font-poppins">Email: support@travelx.com</li>
              <li className="text-gray-400 font-poppins">Phone: +1 (800) 123-4567</li>
              <li className="text-gray-400 font-poppins">FAQ</li>
              <li className="text-gray-400 font-poppins">Travel Insurance</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} AgentX. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Travel Tips</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer