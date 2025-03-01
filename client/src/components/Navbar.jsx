

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router"
import { HiMenu, HiX } from "react-icons/hi"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const token = localStorage.getItem("authToken")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = ["Spend", "Save", "Invest", "Advance"]
  const secondaryItems = ["About", "Help"]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-row justify-between items-center w-full px-4 sm:px-6 md:px-10 bg-transparent h-[10vh] border-b-2 border-gray-100 relative"
      >
        {/* Logo - centered on mobile, left on desktop */}
        <div className="flex md:hidden w-full justify-center">
          <Link to="/">
            <div className="h-full flex justify-center items-center">
              <p className="font-delius font-bold text-2xl sm:text-3xl text-gray-900">AgentX</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex flex-row gap-4 lg:gap-7 justify-center w-fit">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="text-gray-900 font-montserrat font-semibold relative cursor-pointer overflow-hidden 
                   before:content-[''] before:absolute before:bottom-0 before:left-0 
                   before:w-full before:h-[2px] before:bg-black before:scale-x-0 
                   before:origin-left before:transition-transform before:duration-300 
                   hover:before:scale-x-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Logo */}
        <Link to="/" className="hidden md:block">
          <div className="h-full flex justify-center items-center">
            <p className="font-delius font-bold text-3xl text-gray-900">AgentX</p>
          </div>
        </Link>

        {/* Desktop Right Side */}
        <div className="hidden md:flex flex-row justify-center items-center">
          <ul className="flex flex-row gap-4 lg:gap-7 justify-center w-fit">
            {secondaryItems.map((item, index) => (
              <li
                key={index}
                className="text-gray-900 font-montserrat font-semibold relative cursor-pointer overflow-hidden 
                   before:content-[''] before:absolute before:bottom-0 before:left-0 
                   before:w-full before:h-[2px] before:bg-black before:scale-x-0 
                   before:origin-left before:transition-transform before:duration-300 
                   hover:before:scale-x-100"
              >
                {item}
              </li>
            ))}
          </ul>
          {token ? (
            <Link to="/dashboard">
              <button className="transition-all duration-300 rounded-full bg-gray-900 text-white px-4 py-2 lg:px-5 lg:py-3 ml-4 lg:ml-10 font-montserrat font-semibold text-sm lg:text-base cursor-pointer hover:bg-gray-700 hover:outline-2 hover:border-gray-900 border-2">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/auth">
              <button className="transition-all duration-300 rounded-full bg-gray-900 text-white px-4 py-2 lg:px-5 lg:py-3 ml-4 lg:ml-10 font-montserrat font-semibold text-sm lg:text-base cursor-pointer hover:bg-gray-700 hover:outline-2 hover:border-gray-900 border-2">
                Get Started
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <HiX className="h-6 w-6 text-gray-900" /> : <HiMenu className="h-6 w-6 text-gray-900" />}
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 pt-24 px-6"
          >
            <div className="flex flex-col h-full">
              <nav className="flex-1">
                <ul className="flex flex-col gap-6 w-full">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="text-gray-900 font-montserrat font-semibold text-xl border-b border-gray-100 pb-2"
                      onClick={toggleMenu}
                    >
                      {item}
                    </motion.li>
                  ))}
                  {secondaryItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-gray-900 font-montserrat font-semibold text-xl border-b border-gray-100 pb-2"
                      onClick={toggleMenu}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="py-8">
                {token ? (
                  <Link to="/dashboard" onClick={toggleMenu}>
                    <button className="w-full transition-all duration-300 rounded-full bg-gray-900 text-white px-5 py-3 font-montserrat font-semibold cursor-pointer hover:bg-gray-700 border-2 border-gray-900">
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <Link to="/auth" onClick={toggleMenu}>
                    <button className="w-full transition-all duration-300 rounded-full bg-gray-900 text-white px-5 py-3 font-montserrat font-semibold cursor-pointer hover:bg-gray-700 border-2 border-gray-900">
                      Get Started
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

