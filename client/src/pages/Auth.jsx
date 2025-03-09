import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import LoginForm from "../components/Login";
import SignupForm from "../components/Signup-Form";

function Auth() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_BACKEND;

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await fetch(`${url}/verify-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const data = await response.json();

          if (data.message !== "Invalid token") {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      }
    };

    verifyToken();
  }, [navigate, token]);

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
