import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

function SignupForm({ setSignup }) {
  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl  mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-center text-2xl font-bold mb-4 font-poppins text-gray-800">
        Create an Account
      </h3>
      <p className="text-center text-gray-600 mb-6 text-sm font-poppins font-medium">
        Sign up with your Github or Google account
      </p>
      <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-4 text-sm font-poppins font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
        <FaGithub className="mr-2 text-lg" /> Sign up with Github
      </button>
      <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-6 text-sm font-poppins font-semibold hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
        <FaGoogle className="mr-2 text-lg" /> Sign up with Google
      </button>
      <div className="flex items-center mb-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-gray-500 text-sm font-poppins font-medium">Or continue with</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-poppins font-medium mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-poppins font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-poppins font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>
        <button
          className="w-full bg-black text-white rounded-lg py-3 text-sm font-poppins font-semibold hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-600 text-sm mt-4 font-poppins font-medium">
        Already have an account?{" "}
        <button
          className="text-black font-semibold cursor-pointer hover:underline transition-colors duration-300"
          onClick={() => setSignup(false)}
        >
          Log in
        </button>
      </p>
    </motion.div>
  );
}

export default SignupForm;
