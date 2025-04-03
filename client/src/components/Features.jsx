import React from 'react'
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="min-h-screen bg-white text-gray-900 py-20 border-y border-gray-900 w-full" style={{backgroundImage: "url('/bg.png')", backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="w-full lg:w-[95%] mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-montserrat">Our Features</h2>
          <p className="text-gray-900 text-lg max-w-2xl mx-auto font-poppins">
            Discover how AgentX makes your travel experience seamless and unforgettable
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Planning",
              description: "Get personalized travel recommendations powered by advanced AI algorithms that understand your preferences."
            },
            {
              title: "24/7 Support",
              description: "Access round-the-clock assistance from our AI travel companion, ready to help you anytime, anywhere."
            },
            {
              title: "Smart Itineraries",
              description: "Receive optimized travel plans that adapt to your schedule, preferences, and real-time conditions."
            },
            {
              title: "Real-time Updates",
              description: "Stay informed with live updates about flight changes, weather conditions, and local events at your destination."
            },
            {
              title: "Budget Optimization",
              description: "Get smart suggestions for accommodations, activities, and transportation that match your budget preferences."
            },
            {
              title: "Local Insights",
              description: "Access authentic local experiences and hidden gems recommended by our AI based on your interests."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-gray-50 border border-gray-800 shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-900 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features