import { v4 } from "uuid";
import { IChatData } from "../models/chat.interface";
export const PinnedChatIds: string[] = [];
export const ChatData: IChatData[] = [
  {
    chatId: v4(),
    user1: "Alice",
    user2: "Bob",
    messages: [
      {
        senderId: "Alice",
        senderName: "Alice",
        content: "Hi Bob, did you finish the report?",
        timestamp: new Date("2024-11-29T09:00:00Z"),
      },
      {
        senderId: "Bob",
        senderName: "Bob",
        content: "Yes, Alice. I sent it to your email earlier.",
        timestamp: new Date("2024-11-29T09:02:00Z"),
      },
      {
        senderId: "Alice",
        senderName: "Alice",
        content: "Got it, thanks! Great work as always.",
        timestamp: new Date("2024-11-29T09:05:00Z"),
      },
    ],
  },
  {
    chatId: v4(),
    user1: "Alice",
    user2: "Charlie",
    messages: [
      {
        senderId: "Charlie",
        senderName: "Charlie",
        content: "Hey Alice, are we still on for the meeting later?",
        timestamp: new Date("2024-11-29T10:00:00Z"),
      },
      {
        senderId: "Alice",
        senderName: "Alice",
        content: "Yes, Charlie. Let's meet at 2 PM as planned.",
        timestamp: new Date("2024-11-29T10:02:00Z"),
      },
      {
        senderId: "Charlie",
        senderName: "Charlie",
        content: "Perfect. See you then!",
        timestamp: new Date("2024-11-29T10:03:00Z"),
      },
    ],
  },
  {
    chatId: v4(),
    user1: "Alice",
    user2: "Eve",
    messages: [
      {
        senderId: "Alice",
        senderName: "Alice",
        content: "Hi Eve, did you get the designs I shared?",
        timestamp: new Date("2024-11-29T11:00:00Z"),
      },
      {
        senderId: "Eve",
        senderName: "Eve",
        content:
          "Yes, Alice! They're amazing. I'll start working on them right away.",
        timestamp: new Date("2024-11-29T11:05:00Z"),
      },
      {
        senderId: "Alice",
        senderName: "Alice",
        content: "Great! Let me know if you need any changes or support.",
        timestamp: new Date("2024-11-29T11:10:00Z"),
      },
    ],
  },
];
