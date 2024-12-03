export interface IChatData {
  chatId: string;
  user1: string;
  user2: string;
  messages: Chatmessage[];
}

export interface Chatmessage {
  senderId: string; // ID of the sender
  senderName: string; // Name of the sender
  content: string; // Message content
  timestamp: Date; // Time the message was sent
}
