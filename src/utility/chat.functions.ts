import { loggedInUser } from "../config/user.config";
import { Chatmessage } from "../models/chat.interface";

export function getShortName(name: string) {
  return name.trim().substring(0, 2).toLocaleUpperCase();
}

export function sortMessage(chat: Chatmessage[]): Chatmessage[] | null {
  if (chat.length === 0) {
    return null; // No messages in the chat
  }

  // Sort messages by timestamp in descending order and return the first (most recent) message
  const latestMessage = chat.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return latestMessage;
}

export function formatTimestampToMMDDHHMM(
  timestamp: Date | undefined | null
): string | null {
  if (timestamp) {
    const month = timestamp.getMonth() + 1; // getMonth() returns month index (0-11)
    const day = timestamp.getDate();
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();

    // Pad month, day, and minutes with leading zeros if necessary
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Convert hours to 12-hour format and determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString(); // Convert 0 to 12 for 12 AM/PM

    return `${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes} ${period}`;
  } else {
    return null;
  }
}

export function getTimeStampInMMDD(time: string | null): string {
  if (time) {
    return time.split(" ")[0];
  } else {
    return "";
  }
}

export function isLoggedInUser(user1: string) {
  return user1 === loggedInUser;
}
