import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
