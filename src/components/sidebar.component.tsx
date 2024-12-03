import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { sideBarData } from "../config/sidebar.data";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Chat");

  function handleTabClick(label: string) {
    setActiveTab(label);
  }

  return (
    <div className="bg-[#101010] w-[69px] flex flex-col border-r-2 border-[#202020] p-0">
      {sideBarData.map((data) => (
        <Link
          to="/"
          className="tab"
          onClick={() => handleTabClick(data.label)}
          style={{ textDecoration: "none" }}
          key={data.id}
        >
          <SidebarIcons
            label={data.label}
            icon={data.icon}
            isActive={data.label === activeTab}
          />
        </Link>
      ))}
    </div>
  );
};

const SidebarIcons = ({
  label,
  icon,
  isActive,
}: {
  label: string;
  icon: string;
  isActive: boolean;
}) => {
  const [hoverActive, setHoverActive] = useState(false);

  function handleHover() {
    setHoverActive(true);
  }

  function handleHoverEnd() {
    setHoverActive(false);
  }

  return (
    <div
      className={` h-[56px] p-[0px] flex flex-col justify-center items-center ${
        isActive ? "border-l-2 border-[#7f85f5]" : ""
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    >
      <i
        className={`bi ${icon}${
          isActive || hoverActive ? "-fill text-[#7f85f5] " : " text-[#808080] "
        } hover:text-[#7f85f5] text-[20px]`}
      ></i>
      <p
        className={` ${
          isActive || hoverActive ? "text-[#7f85f5]" : "text-[#808080]"
        } text-[10px] font-bold`}
      >
        {label}
      </p>
    </div>
  );
};

export default Sidebar;
