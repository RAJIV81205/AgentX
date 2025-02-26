import { Navigate } from "react-router";
import { LoginForm } from "../components/login-form";
import { useState } from "react";
import SignupForm from "../components/Signup-Form";
import { motion } from "framer-motion";

function Auth() {
  const [signup, setSignup] = useState(false);  
  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <motion.div 
      className="w-full flex justify-center items-center flex-col h-dvh bg-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-center mb-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/cross.png" alt="Company logo" className="h-10 w-10" />
      </motion.div>

      <motion.div 
        key={signup ? "signup" : "login"}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {signup ? <SignupForm setSignup={setSignup} /> : <LoginForm setSignup={setSignup} />}
      </motion.div>
    </motion.div>
  );
}

export default Auth;