import { motion } from "framer-motion";
import { Link } from "react-router";

function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-row justify-between items-center w-full px-10 bg-white h-[10vh] border-b-2 border-gray-100"
    >
      <nav>
        <ul className="flex flex-row gap-7 justify-center w-fit">
          {["Spend", "Save", "Invest", "Advance"].map((item, index) => (
            <li
              key={index}
              className="font-montserrat font-semibold relative cursor-pointer overflow-hidden 
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

      <Link to="/">
        <div className="h-full flex justify-center items-center">
          <p className="font-delius font-bold text-3xl">AgentX</p>
        </div>
      </Link>

      <div className="flex flex-row justify-center items-center">
        <ul className="flex flex-row gap-7 justify-center w-fit">
          {["About", "Help"].map((item, index) => (
            <li
              key={index}
              className="font-montserrat font-semibold relative cursor-pointer overflow-hidden 
                 before:content-[''] before:absolute before:bottom-0 before:left-0 
                 before:w-full before:h-[2px] before:bg-black before:scale-x-0 
                 before:origin-left before:transition-transform before:duration-300 
                 hover:before:scale-x-100"
            >
              {item}
            </li>
          ))}
        </ul>
        <button className="rounded-4xl bg-black text-white px-5 py-3 ml-10 font-montserrat font-semibold cursor-pointer">
          Get Started
        </button>
      </div>
    </motion.header>
  );
}

export default Navbar;
