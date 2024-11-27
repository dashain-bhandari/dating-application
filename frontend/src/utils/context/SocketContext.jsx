import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ['websocket', 'polling', 'flashsocket'],
  withCredentials: true,
});

export const SocketContext = createContext(socket);
