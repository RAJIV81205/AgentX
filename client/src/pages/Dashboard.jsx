import { useState } from "react";
import { 
  FaPlane, 
  FaBuilding, 
  FaHome, 
  FaUmbrellaBeach, 
  FaTrain, 
  FaBus, 
  FaCar, 
  FaDollarSign, 
  FaShieldAlt 
} from "react-icons/fa";

import Flights from "../components/services/Flights";
// import HotelsService from "./services/HotelsService";
// import HomestaysService from "./services/HomestaysService";
// import HolidayService from "./services/HolidayService";
import TrainSearch from "../components/services/Trains";
// import BusesService from "./services/BusesService";
// import CabsService from "./services/CabsService";

const Dashboard = () => {
  const [selectedService, setSelectedService] = useState("Flights");
  const services = [
    { id: "Flights", icon: FaPlane, label: "Flights", component: Flights },
    // { id: "Hotels", icon: FaBuilding, label: "Hotels", component: HotelsService },
    // { id: "Homestays", icon: FaHome, label: "Homestays & Villas", component: HomestaysService },
    // { id: "Holiday", icon: FaUmbrellaBeach, label: "Holiday Packages", component: HolidayService },
    { id: "Trains", icon: FaTrain, label: "Trains", component: TrainSearch },
    // { id: "Buses", icon: FaBus, label: "Buses", component: BusesService },
    // { id: "Cabs", icon: FaCar, label: "Cabs", component: CabsService },
    // { id: "Forex", icon: FaDollarSign, label: "Forex Card & Currency", component: ForexService },
    // { id: "Insurance", icon: FaShieldAlt, label: "Travel Insurance", component: InsuranceService },
  ];
  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
  };
  // Get the component to render based on selection
  const SelectedComponent = services.find(service => service.id === selectedService)?.component || FlightsService;
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 w-full" 
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", 
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl">
        {/* Service Selection Header */}
        <div className="flex flex-wrap justify-between px-6 py-4 border-b">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceChange(service.id)}
              className={`flex flex-col items-center p-3 ${
                selectedService === service.id 
                  ? "border-b-2 border-blue-500" 
                  : "hover:bg-gray-50"
              }`}
            >
              <service.icon 
                className={selectedService === service.id ? "text-blue-500" : "text-gray-600"} 
                size={24} 
              />
              <span 
                className={`text-sm mt-1 ${
                  selectedService === service.id ? "text-blue-500 font-medium" : "text-gray-600"
                }`}
              >
                {service.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Content Area - Dynamically render selected component */}
        <div className="p-6">
          <SelectedComponent />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;