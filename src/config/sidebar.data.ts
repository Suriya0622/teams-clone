import { SideBarConfig } from "../models/sidebar.interface";

export const sideBarData: SideBarConfig[] = [
  {
    label: "Activity",
    icon: "bi-bell",
    to: "/activity",
    id: 1,
  },
  {
    label: "Chat",
    icon: "bi-chat-text",
    to: "/",
    id: 2,
  },
  {
    label: "Teams",
    icon: "bi-people",
    to: "/teams",
    id: 3,
  },
  {
    label: "Calendar",
    icon: "bi-calendar3-week",
    to: "/calendar",
    id: 4,
  },
  {
    label: "Calls",
    icon: "bi-telephone",
    to: "/calls",
    id: 5,
  },
];
