import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-white py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 w-full">
        <motion.div
          className="grid grid-cols-1 mx-auto lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          {/* Left Section (Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center justify-center order-2 lg:order-1"
          >
            <img
              className="w-full h-auto max-w-md rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="Team Collaboration"
            />
          </motion.div>

          {/* Right Section (Text) */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="text-center lg:text-left max-w-xl mx-auto space-y-4 sm:space-y-6">
              <motion.h2
                className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl font-pj"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                About AgentX
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base text-gray-700 font-inter leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                AgentX is your dedicated travel companion, designed to make your journey seamless and unforgettable. We combine cutting-edge technology with personalized service to create a unique travel experience for every wanderer.
              </motion.p>

              <motion.p
                className="text-sm sm:text-base text-gray-700 font-inter leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Our platform connects travelers with the best experiences, accommodations, and services worldwide. Whether you're planning a weekend getaway or a month-long adventure, AgentX is here to make your travel dreams come true.
              </motion.p>

              <motion.p
                className="text-sm sm:text-base text-gray-700 font-inter leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                With our AI-powered recommendations and local expertise, we ensure every trip is tailored to your preferences. Join thousands of satisfied travelers who have discovered the world with AgentX.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;