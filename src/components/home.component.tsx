import {
  ChangeEvent,
  memo,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChatData, PinnedChatIds } from "../config/chat.config";
import { loggedInUser } from "../config/user.config";
import {
  ChatDataContext,
  ChatIdContext,
  UpdateChatDataContext,
  UpdateChatIdStateContext,
} from "../context/chat";
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
  const [chatId, setChatId] = useState<string | null>(ChatData[0].chatId);
  const [chatData, setChatData] = useState<IChatData[]>(ChatData);

  return (
    <ChatDataContext.Provider value={chatData}>
      <ChatIdContext.Provider value={chatId || ""}>
        <UpdateChatIdStateContext.Provider value={setChatId}>
          <UpdateChatDataContext.Provider value={setChatData}>
            <div className="flex grow h-full">
              {/* Sidebar */}
              <div className="bg-[#1a1a1a] border-r-[1px] border-[#1f1f1f] w-[360px]">
                <PeopleHeader />
                <PeopleList />
              </div>
              {/* Chat Section */}
              <div className="bg-[#1f1f1f] flex flex-col w-full h-full">
                <ChatContent />
              </div>
            </div>
          </UpdateChatDataContext.Provider>
        </UpdateChatIdStateContext.Provider>
      </ChatIdContext.Provider>
    </ChatDataContext.Provider>
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
  return (
    <div className="flex text-[#ffffff] text-[12px] flex-col hover:cursor-pointer select-none">
      <PeopleDropDown status="Pinned" />
      <PeopleDropDown status="Recent" />
    </div>
  );
}

function PeopleDropDown({ status }: { status: string }) {
  const chatData = useContext(ChatDataContext);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const filteredChat =
    status === "Pinned"
      ? chatData?.filter((data) => PinnedChatIds.includes(data.chatId))
      : chatData?.filter((data) => !PinnedChatIds.includes(data.chatId));

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
        {filteredChat?.map((data) => (
          <PeopleCard chatData={data} key={data.chatId} />
        ))}
      </div>
    </>
  );
}

function PeopleCard({ chatData }: { chatData: IChatData }) {
  const cardHover = useRef<HTMLDivElement>(null);
  const updateActiveId = useContext(UpdateChatIdStateContext);
  const [showThreeDot, setShowThreeDot] = useState(false);
  const cardUser =
    chatData.user1 === loggedInUser ? chatData.user2 : chatData.user1;
  const sortedMessage = sortMessage(chatData.messages);

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
      onClick={() => {
        if (updateActiveId) {
          updateActiveId((id) => chatData.chatId);
        }
      }}
    >
      <ProfileComponent userName={getShortName(cardUser)} />
      <div className="grid grid-flow-col">
        <div className="min-w-[240px]">
          <p className="text-[14px] font-normal">{cardUser}</p>
          <p
            className="text-[12px] text-[#adadad] truncate max-w-[240px] overflow-hidden whitespace-nowrap"
            ref={cardHover}
          >
            {`${
              sortedMessage
                ? sortedMessage[0].senderName !== cardUser
                  ? "You: " + sortedMessage[0].content
                  : sortedMessage[0].content
                : ""
            }`}
          </p>
        </div>
        <p
          className={`text-[12px] text-[#adadad] ${
            showThreeDot ? "hidden" : "block"
          }`}
        >
          {getTimeStampInMMDD(
            formatTimestampToMMDDHHMM(
              sortedMessage ? sortedMessage[0].timestamp : null
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

function ChatHeader() {
  const activeChatId = useContext(ChatIdContext);
  const chatData = useContext(ChatDataContext);
  const activeChatData = chatData?.find((chat) => chat.chatId === activeChatId);
  const user =
    activeChatData?.user1 === loggedInUser
      ? activeChatData.user2
      : activeChatData?.user1;
  return (
    <div className="flex h-[61px] border-b-[1px] border-[#101010]">
      <div className="flex flex-auto items-center justify-start gap-[15px] pl-[15px] basis-[20%]">
        <ProfileComponent userName={getShortName(user || "")} />
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

function ChatContent() {
  return (
    <>
      <ChatHeader />
      <ChatBox />
    </>
  );
}

function ChatBox() {
  return (
    <div className="flex flex-col h-full mx-[15%] mb-[2%]">
      <ChatMessage />
      <ChatInput />
    </div>
  );
}

const ChatMessage = memo(function ChatMessage() {
  const activeChatId = useContext(ChatIdContext);
  const chatData = useContext(ChatDataContext);
  const activeChatData = chatData?.find((chat) => chat.chatId === activeChatId);
  let sortedMessages = sortMessage(activeChatData?.messages || [])?.reverse();
  return (
    <div className="flex-grow w-auto overflow-auto mb-[2%]">
      {sortedMessages?.map((message, index) => {
        if (isLoggedInUser(message.senderName)) {
          return <ChatRightMessage message={message} key={index} />;
        } else {
          return <ChatLeftMessage message={message} key={index} />;
        }
      })}
    </div>
  );
});

function ChatLeftMessage({ message }: { message: Chatmessage }) {
  return (
    <div className="flex justify-start gap-[5px]">
      <ProfileComponent userName={getShortName(message.senderName)} />
      <div className="flex flex-col max-w-[80%]">
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
  return (
    <div className="flex justify-end">
      <div className="flex flex-col">
        <p className="flex items-center justify-end text-[12px] text-[#adadad]">
          {formatTimestampToMMDDHHMM(message.timestamp)}
        </p>
        <p className="h-[36px] bg-[#2b2b40] rounded text-[14px] text-[#ffffff] flex items-center px-[10px]">
          {message.content}
        </p>
      </div>
    </div>
  );
}

function ChatInput() {
  const [inputMessage, setInputMessage] = useState<string>("");
  const activeChatId = useContext(ChatIdContext);
  const chatData = useContext(ChatDataContext);
  const setChatData = useContext(UpdateChatDataContext);
  const [height, setHeight] = useState("44px"); // Initial height
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const activeChatData = useMemo(
    () => chatData?.find((chat) => chat.chatId === activeChatId),
    []
  );

  const autoGrow = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target;
    // Reset height to calculate scrollHeight accurately
    element.style.height = "44px";
    element.style.height = `${element.scrollHeight}px`; // Adjust height based on scrollHeight
    textAreaRef.current?.setAttribute("height", element.style.height);
    setHeight(element.style.height);
  };

  function handleInputmessage(event: ChangeEvent<HTMLTextAreaElement>): void {
    setInputMessage(event.target.value);
  }

  function handleSendMessage() {
    if (inputMessage) {
      const newMessage: Chatmessage = {
        senderId:
          loggedInUser === activeChatData?.user1
            ? activeChatData?.user2
            : activeChatData?.user1 || "",
        senderName: loggedInUser,
        content: inputMessage,
        timestamp: new Date(),
      };
      setInputMessage((message) => "");
      textAreaRef.current?.setAttribute("height", "44px");
      setHeight((h) => "44px");

      if (setChatData) {
        setChatData((data) =>
          data.map(
            (chat) =>
              chat.chatId === activeChatId
                ? { ...chat, messages: [...chat.messages, newMessage] }
                : chat // Return the unchanged chat if condition is not met
          )
        );
      }
    }
  }
  return (
    <div className="w-[85%] flex items-center bg-[#292929] !border !border-[#525252] rounded-lg px-3 inline-block mx-auto">
      <textarea
        ref={textAreaRef}
        value={inputMessage}
        placeholder="Type a message"
        onInput={autoGrow}
        onChange={handleInputmessage}
        className={`h-[${height}] py-[11px] resize-none overflow-hidden min-h-[40px] max-h-[100px] bg-inherit flex-1 bg-transparent text-sm text-gray-300 placeholder-gray-500 placeholder:text-sm px-3 focus:outline-none`}
      ></textarea>
      <div className="flex gap-[15px] text-gray-500">
        <div className="flex gap-[15px] border-r-[1px] pr-[10px] border-gray-400">
          <ChartHeaderIcons iconName="bi-type" />
          <ChartHeaderIcons iconName="bi-emoji-smile-fill" />
          <ChartHeaderIcons iconName="bi-plus-lg" />
        </div>
        <ChartHeaderIcons
          iconName="bi-send-fill rotate-45"
          clickEvent={handleSendMessage}
        />
      </div>
    </div>
  );
}

function ChartHeaderIcons({
  iconName,
  clickEvent,
}: {
  iconName: string;
  clickEvent?: () => void;
}) {
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
      onClick={clickEvent}
    ></i>
  );
}
