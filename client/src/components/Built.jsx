import { motion } from "framer-motion";

const technologies = [
  { name: "React", logo: "/logos/react.svg" },
  { name: "Vite", logo: "/logos/vite.svg" },
  { name: "Node.js", logo: "/logos/nodejs.svg" },
  { name: "MongoDB", logo: "/logos/mongodb.svg" },
  { name: "Express", logo: "/logos/express.svg" },
  { name: "Tailwind", logo: "/logos/tailwind.svg" },
  { name: "AI", logo: "/logos/ai.png" },
  
];

// Duplicate the array for smooth looping
const scrollingTechnologies = [...technologies, ...technologies];

function Built() {
  return (
    <div className="flex flex-col justify-center items-center w-full overflow-hidden bg-gray-50 py-10 h-fit border-y border-gray-900">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 font-montserrat">Built With</h2>
      
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex space-x-20 w-max"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
        >
          {scrollingTechnologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img src={tech.logo} alt={tech.name} className="h-15 w-15 object-contain" />
              <span className="text-gray-900 font-medium text-2xl font-poppins">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Built;
