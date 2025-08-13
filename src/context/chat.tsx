import { createContext, Dispatch, SetStateAction } from "react";
import { IChatData } from "../models/chat.interface";

export const ChatIdContext = createContext("");
export const ChatDataContext = createContext<IChatData[] | null>(null);
export const UpdateChatIdStateContext = createContext<Dispatch<
  SetStateAction<string | null>
> | null>(null);
export const UpdateChatDataContext = createContext<Dispatch<
  SetStateAction<IChatData[]>
> | null>(null);
