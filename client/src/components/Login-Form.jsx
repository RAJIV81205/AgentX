import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export function LoginForm({ setSignup }) {
  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl  mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-center text-2xl font-bold mb-4 font-poppins text-gray-800">
        Welcome Back
      </h3>
      <p className="text-center text-gray-600 mb-6 text-sm font-poppins font-medium">
        Login with your Github or Google account
      </p>
      <button className="cursor-pointer w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-4 text-sm font-poppins font-semibold hover:bg-gray-100 transition-colors duration-300">
        <FaGithub className="mr-2 text-lg" /> Login with Github
      </button>
      <button className="cursor-pointer w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-6 text-sm font-poppins font-semibold hover:bg-gray-100 transition-colors duration-300">
        <FaGoogle className="mr-2 text-lg" /> Login with Google
      </button>
      <div className="flex items-center mb-6">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-gray-500 text-sm font-poppins font-medium">
          Or continue with
        </span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-poppins font-medium mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="m@example.com"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label
              className="block text-gray-700 text-sm font-poppins font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <a
              className="text-xs text-gray-500 font-poppins font-medium"
              href="#"
            >
              Forgot your password?
            </a>
          </div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>
        <button
          className="w-full bg-black text-white rounded-lg py-3 text-sm font-poppins font-semibold hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-600 text-sm mt-4 font-poppins font-medium">
        Don't have an account?{" "}
        <button
          className="text-black font-semibold cursor-pointer hover:underline transition-colors duration-300"
          onClick={() => setSignup(true)}
        >
          Sign up
        </button>
      </p>
    </motion.div>
  );
}
