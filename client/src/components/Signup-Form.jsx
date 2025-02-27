import {
  FaGoogle,
  FaGithub,
  FaUser,
  FaMobileAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";

function SignupForm({ setSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const name = event.target.name.value;
    const mobile = event.target.mobile.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const signupData = { name, mobile, email, password };
    const url = import.meta.env.VITE_BACKEND;

    try {
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Welcome to AgentX!",
        showConfirmButton: true,
        confirmButtonText: "OK",
        timer: 3000,
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error during signup:", error);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: "Please try again later",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black opacity-50 flex justify-center items-center z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
        </div>
      )}
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
        <span className="mx-3 text-gray-500 text-sm font-poppins font-medium">
          Or continue with
        </span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <form onSubmit={handleSignup}>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-poppins font-medium mb-1"
            htmlFor="name"
          >
            Full Name
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              placeholder="John Doe"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-poppins font-medium mb-1"
            htmlFor="mobile"
          >
            Mobile
          </label>
          <div className="relative">
            <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="mobile"
              type="tel"
              placeholder="9876543219"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-poppins font-medium mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              placeholder="m@example.com"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-poppins font-medium mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-3 text-sm font-poppins font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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
