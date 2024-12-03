import StatusIcon from "../assets/status.png";

function ProfileComponent({ userName }: { userName: string }) {
  return (
    <div className="flex items-end">
      <div className="flex rounded-full bg-[#c7d4e7] text-[#101010] w-[32px] h-[32px] text-[13px] font-bold items-center justify-center">
        {userName}
      </div>
      <div className="absolute ml-[20px]">
        <img src={StatusIcon} alt="status" className="w-[13px] h-[13px]" />
      </div>
    </div>
  );
}

export default ProfileComponent;
