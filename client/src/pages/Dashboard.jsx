import { useState } from "react";
import { FaPlane, FaTrain , FaBuilding } from "react-icons/fa";
import Navbar from "../components/Navbar";

import Flights from "../components/services/Flights";
import Hotels from "../components/services/Hotels";
// import HomestaysService from "./services/HomestaysService";
// import HolidayService from "./services/HolidayService";
import TrainSearch from "../components/services/Trains";
// import BusesService from "./services/BusesService";
// import CabsService from "./services/CabsService";

const Dashboard = () => {
  const [selectedService, setSelectedService] = useState("Flights");
  const services = [
    { id: "Flights", icon: FaPlane, label: "Flights", component: Flights },
    { id: "Hotels", icon: FaBuilding, label: "Hotels", component: Hotels },
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
  const SelectedComponent =
    services.find((service) => service.id === selectedService)?.component ||
    Flights;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center p-4 w-full bg-gray-100">
        <div className="bg-white rounded-t-lg  w-full max-w-4xl mt-8">
          {/* Service Selection Header */}
          <div className="flex flex-wrap justify-between px-6 py-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceChange(service.id)}
                className={`flex flex-col items-center p-3 ${
                  selectedService === service.id
                    ? "border-b-2 border-gray-900"
                    : "hover:bg-gray-50"
                }`}
              >
                <service.icon
                  className={
                    selectedService === service.id
                      ? "text-gray-950"
                      : "text-gray-500"
                  }
                  size={24}
                />
                <span
                  className={`text-sm mt-1 ${
                    selectedService === service.id
                      ? "text-gray-950 font-poppins"
                      : "text-gray-600"
                  }`}
                >
                  {service.label}
                </span>
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
