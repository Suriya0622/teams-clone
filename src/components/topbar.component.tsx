import { useRef } from "react";
import teamsLogo from "../assets/teams.png";
import { loggedInUser } from "../config/user.config";
import { getShortName } from "../utility/chat.functions";
import ProfileComponent from "./profile.component";

const TopBarComponent = () => {
  return (
    <div className="top-bar grid items-center grid-cols-3">
      <span className="px-[30px] py-[12px]">
        <img src={teamsLogo} alt="logo" />
      </span>
      <SearchComponent />
      <div className="flex justify-end pr-[20px]">
        <ProfileComponent userName={getShortName(loggedInUser)} />
      </div>
    </div>
  );
};

function SearchComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputFieldClick() {
    inputRef.current?.setAttribute(
      "placeholder",
      "Look for people, messages, files, and more"
    );
  }

  function handleFocusOut() {
    inputRef.current?.setAttribute("placeholder", "Search (Ctrl+Alt+E)");
  }

  return (
    <div className="flex items-center bg-[#292929] !border !border-[#525252] rounded-lg h-[32px] px-3 w-[468px]">
      <i className="fa-solid fa-magnifying-glass text-[#525252] p-[10px]"></i>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search (Ctrl+Alt+E)"
        className="flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-500 placeholder:text-sm px-3 focus:outline-none"
        onFocus={handleInputFieldClick}
        onBlur={handleFocusOut}
      />
    </div>
  );
}

export default TopBarComponent;
