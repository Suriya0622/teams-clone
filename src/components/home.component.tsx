import { ChangeEvent, useRef, useState } from "react";
import { ChatData } from "../config/chat.config";
import { loggedInUser } from "../config/user.config";
import { Chatmessage, IChatData } from "../models/chat.interface";
import {
  formatTimestampToMMDDHHMM,
  getShortName,
  getTimeStampInMMDD,
  isLoggedInUser,
  sortMessage,
} from "../utility/chat.functions";
import ProfileComponent from "./profile.component";

export function HomePage() {
  return (
    <div className="flex grow h-full">
      {/* Sidebar */}
      <div className="bg-[#1a1a1a] border-r-[1px] border-[#1f1f1f] w-[360px]">
        <PeopleHeader />
        <PeopleList />
      </div>
      {/* Chat Section */}
      <div className="bg-[#1f1f1f] flex flex-col w-full h-full">
        <ChatContent chat={ChatData[0]} user="Bob" />
      </div>
    </div>
  );
}

function PeopleHeader() {
  return (
    <div className="grid grid-flow-col h-[61px] items-center px-[20px] border-b-[1px] border-[#101010]">
      <p className="text-xl font-bold text-[#ffffff]">Chat</p>
      <div className="flex justify-end text-[#d6d6d6] text-sm">
        <i className="bi bi-three-dots px-[10px] text-[20px] hover:text-[#7f85f5]"></i>
        <i className="bi bi-filter px-[10px] text-[20px] hover:text-[#7f85f5]"></i>
        <i className="bi bi-box-arrow-up-right px-[10px] text-[16px] hover:text-[#7f85f5]"></i>
      </div>
    </div>
  );
}

function PeopleList() {
  let recentChats: string[] = [];
  let pinnedChats: string[] = [];
  recentChats = [...ChatData.map((data) => data.chatId)];

  return (
    <div className="flex text-[#ffffff] text-[12px] flex-col hover:cursor-pointer select-none">
      <PeopleDropDown
        status="Pinned"
        chat={ChatData.filter((data) => pinnedChats.includes(data.chatId))}
      />
      <PeopleDropDown
        status="Recent"
        chat={ChatData.filter((data) => recentChats.includes(data.chatId))}
      />
    </div>
  );
}

function PeopleDropDown({
  status,
  chat,
}: {
  status: string;
  chat: IChatData[];
}) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  function handleDropDownClick() {
    dropDownRef.current?.classList.toggle("hidden");
  }

  return (
    <>
      <div
        className="text-[#d6d6d6] flex items-center gap-[5px] h-[36px] pt-[15px]"
        onClick={handleDropDownClick}
      >
        <i className="bi bi-caret-down-fill text-[8px]"></i>
        <p>{status}</p>
      </div>
      <div className="flex flex-col" ref={dropDownRef}>
        {chat.map((data) => (
          <PeopleCard
            userName={data.user1 === loggedInUser ? data.user2 : data.user1}
            recentMessage={sortMessage(data.messages)}
          />
        ))}
      </div>
    </>
  );
}

function PeopleCard({
  userName,
  recentMessage,
}: {
  userName: string;
  recentMessage: Chatmessage[] | null;
}) {
  const cardHover = useRef<HTMLDivElement>(null);
  const [showThreeDot, setShowThreeDot] = useState(false);

  function handleCardHoverStart() {
    cardHover.current?.classList.toggle("text-[#ffffff]");
    setShowThreeDot(true);
  }

  function handleCardHoverEnd() {
    cardHover.current?.classList.remove("text-[#ffffff]");
    setShowThreeDot(false);
  }
  return (
    <div
      className="flex items-center h-[49px] pl-[15px] ml-[5px] mr-[20px] gap-[6px] hover:border-[0.5px] hover:h-[48px] hover:rounded-md hover:border-[#525252] hover:mr-[18px]"
      onMouseEnter={handleCardHoverStart}
      onMouseLeave={handleCardHoverEnd}
    >
      <ProfileComponent userName={getShortName(userName)} />
      <div className="grid grid-flow-col">
        <div className="min-w-[240px]">
          <p className="text-[14px] font-normal">{userName}</p>
          <p
            className="text-[12px] text-[#adadad] truncate max-w-[240px] overflow-hidden whitespace-nowrap"
            ref={cardHover}
          >
            {recentMessage?.[0]
              ? `${
                  userName === recentMessage[0].senderName ? userName : "You"
                }: ${recentMessage[0].content}`
              : "No recent messages"}
          </p>
        </div>
        <p
          className={`text-[12px] text-[#adadad] ${
            showThreeDot ? "hidden" : "block"
          }`}
        >
          {getTimeStampInMMDD(
            formatTimestampToMMDDHHMM(
              recentMessage?.[0] ? recentMessage[0]?.timestamp : null
            )
          )}
        </p>
        <div
          className={`flex items-center justify-center hover:text-[#7f85f5] ${
            showThreeDot ? "block" : "hidden"
          }`}
        >
          <i className="bi bi-three-dots px-[10px] text-[15px]"></i>
        </div>
      </div>
    </div>
  );
}

function ChatHeader({ chat, user }: { chat: IChatData; user: string }) {
  return (
    <div className="flex h-[61px] border-b-[1px] border-[#101010]">
      <div className="flex flex-auto items-center justify-start gap-[15px] pl-[15px] basis-[20%]">
        <ProfileComponent userName={getShortName(user)} />
        <p className="text-[18px] font-bold text-[#ffffff]">{user}</p>

        <div className="flex items-end gap-[20px] text-[14px] h-[61px] text-[#9ca3af]">
          <div className="pb-[14px] border-b-[3px] border-b-[#7f85f5] text-[#ffffff] hover:pb-[14px]">
            Chat
          </div>
          <div className="hover:border-b-[#757575] hover:border-b-[3px] hover:pb-[14px] pb-[17px] !text-grey-400">
            Shared
          </div>
          <div className="pb-[17px]">
            <i className="bi bi-plus-square hover:bi-plus-square-fill hover:text-[#7f85f5]"></i>
          </div>
        </div>
      </div>

      <div className="flex w-[15%] items-center justify-evenly text-[#ffffff]">
        <div className="flex gap-[5px]">
          <ChartHeaderIcons iconName="bi-telephone-fill" />
          <ChartHeaderIcons iconName="bi-chevron-down" />
        </div>
        <ChartHeaderIcons iconName="bi-person-fill-add" />
        <ChartHeaderIcons iconName="bi-three-dots hover:text-[#7f85f5]" />
        <ChartHeaderIcons iconName="bi-box-arrow-left hover:text-[#7f85f5]" />
      </div>
    </div>
  );
}

function ChatContent({ chat, user }: { chat: IChatData; user: string }) {
  return (
    <>
      <ChatHeader chat={chat} user={user} />
      <ChatBox chat={chat} />
    </>
  );
}

function ChatBox({ chat }: { chat: IChatData }) {
  return (
    <div className="flex flex-col h-full mx-[15%] mb-[2%]">
      <ChatMessage chat={chat} />
      <ChatInput />
    </div>
  );
}

function ChatMessage({ chat }: { chat: IChatData }) {
  let sortedMessages = sortMessage(chat.messages)?.reverse();
  return (
    <div className="bg-red-100 flex-grow w-auto overflow-auto mb-[2%]">
      {sortedMessages?.map((message) => {
        if (isLoggedInUser(message.senderName)) {
          return <ChatRightMessage message={message} />;
        } else {
          return <ChatLeftMessage message={message} />;
        }
      })}
    </div>
  );
}

function ChatLeftMessage({ message }: { message: Chatmessage }) {
  return (
    <div className="flex justify-start flex-col">
      <ProfileComponent userName={message.senderName} />
      <div className="flex flex-col max-w-[80%] gap-[5px]">
        <p className="flex items-center text-[12px] text-[#adadad]">{`${
          message.senderName
        } ${formatTimestampToMMDDHHMM(message.timestamp)}`}</p>
        <p className="h-[36px] bg-[#292929] rounded text-[14px] text-[#ffffff] flex items-center px-[10px]">
          {message.content}
        </p>
      </div>
    </div>
  );
}

function ChatRightMessage({ message }: { message: Chatmessage }) {
  return <div className="flex justify-end">{message.content}</div>;
}

function ChatInput() {
  const [height, setHeight] = useState("44px"); // Initial height
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target;
    // Reset height to calculate scrollHeight accurately
    element.style.height = "44px";
    element.style.height = `${element.scrollHeight}px`; // Adjust height based on scrollHeight
    console.log(element.scrollHeight);
    textAreaRef.current?.setAttribute("height", element.style.height);
    setHeight(element.style.height);
  };
  return (
    <div className="w-[85%] flex items-center bg-[#292929] !border !border-[#525252] rounded-lg px-3 inline-block mx-auto">
      <textarea
        ref={textAreaRef}
        placeholder="Type a message"
        onInput={autoGrow}
        className={`h-[${height}] py-[11px] resize-none overflow-hidden min-h-[40px] max-h-[100px] bg-inherit flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-500 placeholder:text-sm px-3 focus:outline-none`}
      ></textarea>
      <div className="flex gap-[15px] text-gray-500">
        <div className="flex gap-[15px] border-r-[1px] pr-[10px] border-gray-400">
          <ChartHeaderIcons iconName="bi-type" />
          <ChartHeaderIcons iconName="bi-emoji-smile-fill" />
          <ChartHeaderIcons iconName="bi-plus-lg" />
        </div>
        <ChartHeaderIcons iconName="bi-send-fill rotate-45" />
      </div>
    </div>
  );
}

function ChartHeaderIcons({ iconName }: { iconName: string }) {
  const [hoverActive, setHoverActive] = useState(false);

  function handleHover() {
    setHoverActive(true);
  }

  function handleHoverEnd() {
    setHoverActive(false);
  }
  return (
    <i
      className={`bi ${
        hoverActive
          ? iconName + " hover:text-[#7f85f5]"
          : iconName.replace("-fill", "") + " text-gray-400"
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
    ></i>
  );
}
