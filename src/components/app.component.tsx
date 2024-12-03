import { Route, Routes } from "react-router-dom";
import "../App.css";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Sidebar from "./sidebar.component";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

const AppContainer = () => {
  return (
    <div className="flex flex-1 h-auto">
      <Sidebar />
      <AppRoutes />
    </div>
  );
};

export default AppContainer;
