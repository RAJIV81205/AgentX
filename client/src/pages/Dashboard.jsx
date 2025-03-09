import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaPlane, FaTrain, FaBuilding } from "react-icons/fa";
import { MdCurrencyExchange } from "react-icons/md";
import Navbar from "../components/Navbar";
import Forex from "../components/services/Forex";
import Flights from "../components/services/Flights";
import Hotels from "../components/services/Hotels";
import TrainSearch from "../components/services/Trains";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedService, setSelectedService] = useState("Flights");
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND;

  const services = [
    { id: "Flights", icon: FaPlane, label: "Flights", component: Flights },
    { id: "Hotels", icon: FaBuilding, label: "Hotels", component: Hotels },
    { id: "Trains", icon: FaTrain, label: "Trains", component: TrainSearch },
    { id: "Forex", icon: MdCurrencyExchange, label: "Forex", component: Forex },
  ];

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }
      try {
        const response = await fetch(`${url}/verify-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.message === "Token is invalid") {
          navigate("/auth");
        }
      } catch (error) {
        console.error(error);
        navigate("/auth");
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [navigate, url]);

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
  };

  const SelectedComponent = services.find((s) => s.id === selectedService)?.component || Flights;

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center p-4 w-full bg-white">
        <div className="bg-blue-50 rounded-t-lg w-full max-w-4xl mt-8 border border-blue-300 border-b-0">
          <div className="flex flex-wrap justify-between px-6 py-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceChange(service.id)}
                className={`flex flex-col items-center p-3 ${selectedService === service.id ? "border-b-2 border-blue-950" : "hover:bg-blue-100"}`}
              >
                <service.icon className={selectedService === service.id ? "text-blue-950" : "text-blue-300"} size={24} />
                <span className={`text-sm mt-1 ${selectedService === service.id ? "text-blue-950 font-poppins" : "text-blue-600 font-poppins"}`}>{service.label}</span>
              </button>
            ))}
          </div>
        </div>
        <SelectedComponent />
      </div>
    </>
  );
};

export default Dashboard;
