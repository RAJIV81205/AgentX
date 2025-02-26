import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-15 lg:pb-36">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          {/* Left Section (Text + Button) */}
          <div>
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                A special agent made for Wanderers.
              </motion.h1>

              <motion.p
                className="my-2 text-lg text-gray-600 sm:mt-8 font-inter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vehicula massa in enim luctus. Rutrum arcu.
              </motion.p>

              {/* Animated Button */}
              <motion.button
                className="inline-flex px-6 py-3 text-lg font-bold text-white transition-all duration-300 bg-gray-900 rounded-lg focus:outline-none font-pj hover:bg-gray-600 my-2.5 cursor-pointer"
                whileHover={{ scale: 1.01}}
                whileTap={{ scale: 0.9 }}
              >
                Get Free Card
              </motion.button>
            </div>

            {/* Stats Section */}
            <motion.div
              className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.3 },
                },
              }}
            >
              {/* Bookings Completed */}
              <motion.div
                className="flex items-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">2943</p>
                <p className="ml-3 text-sm text-gray-900 font-pj">
                  Bookings
                  <br />
                  Completed
                </p>
              </motion.div>

              <div className="hidden sm:block">
                <svg
                  className="text-gray-400"
                  width="16"
                  height="39"
                  viewBox="0 0 16 39"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                  <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                  <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                  <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                  <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                </svg>
              </div>

              {/* Transaction Completed */}
              <motion.div
                className="flex items-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">$1M+</p>
                <p className="ml-3 text-sm text-gray-900 font-pj">
                  Transaction
                  <br />
                  Completed
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Section (Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <img
              className="w-full"
              src="https://images.unsplash.com/vector-1739647326738-ff7c984209c7?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero Illustration"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
