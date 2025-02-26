import { Navigate } from "react-router";
import { LoginForm } from "../components/login-form";
import { useState } from "react";
import SignupForm from "../components/Signup-Form";

function Auth() {
  const [signup, setSignup] = useState(false);
  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="w-full flex justify-center items-center flex-col h-dvh bg-gray-100">
      <div className="flex justify-center mb-3">
        <img src="/cross.png" alt="Company logo" className="h-10 w-10" />
      </div>

      {signup ? (
        <SignupForm setSignup={setSignup} />
      ) : (
        <LoginForm setSignup={setSignup} />
      )}
    </div>
  );
}

export default Auth;
