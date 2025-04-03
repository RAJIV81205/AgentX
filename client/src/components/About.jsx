import React from 'react';
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="min-h-screen bg-white text-gray-900 py-20">
      <div className="w-full lg:w-[85%] mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-montserrat">About AgentX</h2>
          <p className="text-gray-900 text-lg max-w-2xl mx-auto font-poppins  ">
            Your AI-powered travel companion, making every journey unforgettable
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="/about.jpg" 
                alt="About AgentX" 
                className="w-full lg:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent"></div>
            </div>
          </motion.div>

          {/* Right Side - Content Cards */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gray-50 border border-gray-800 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-900 leading-relaxed">
                To revolutionize travel planning by combining cutting-edge AI technology with personalized service, making every journey seamless and memorable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gray-50 border border-gray-800 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-900 leading-relaxed ">
                To become the world's most trusted AI travel companion, empowering wanderers to explore the world with confidence and ease.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gray-50 border border-gray-800 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">What We Offer</h3>
              <p className="text-gray-900 leading-relaxed">
                From AI-powered recommendations to 24/7 support, we provide a comprehensive travel solution that adapts to your preferences and needs.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { number: "10K+", label: "Happy Travelers" },
            { number: "150+", label: "Countries" },
            { number: "24/7", label: "Support" },
            { number: "98%", label: "Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-800">
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h4>
              <p className="text-gray-900">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;