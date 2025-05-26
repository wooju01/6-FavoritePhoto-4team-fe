// src/lib/socket.js
import { io } from "socket.io-client";

let socket = null;
//로컬 개발 시에는 아래 URL을 사용하세요.
//http://localhost:3002
// 배포된 서버에서는 아래 URL을 사용하세요.
//https://six-favoritephoto-4team-be.onrender.com

export const getSocket = (token) => {
  if (!socket) {
    socket = io("https://six-favoritephoto-4team-be.onrender.com", {
      auth: { token },
      transports: ["websocket"],
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
