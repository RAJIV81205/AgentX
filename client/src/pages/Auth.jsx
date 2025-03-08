import { useNavigate } from "react-router";
import LoginForm from "../components/Login";

import { useState } from "react";
import SignupForm from "../components/Signup-Form";

function Auth() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }

  return (
    <div className="w-full flex justify-center items-center flex-col min-h-dvh bg-gray-100 py-10">
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
