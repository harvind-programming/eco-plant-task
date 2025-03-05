import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
const SOCKET_URL = "http://localhost:8080";

export const useSocketNotifications = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    const newSocket = io(`${SOCKET_URL}/notifications`, {
      transports: ["websocket"], // Ensure WebSocket transport
    });

    newSocket.on("connect", () => {
      console.log("Connected to /notifications", newSocket.id);
      newSocket.emit("message", "socket connection test"); // Example
    });

    newSocket.on("notification", (notification: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      // console.log(notification);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
      // setNotifications((prev: any) => [...prev, notification]);
      setNotifications(notification);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from /notifications");
    });

    setSocket(newSocket);

    return () => newSocket.close(); // Cleanup on unmount
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { socket, notifications };
};
