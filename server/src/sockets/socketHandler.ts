import { Server, Socket } from "socket.io";

export const socketHandler = (io: Server) => {
  const notificationNamespace = io.of("/notifications");
  notificationNamespace.on("connection", (socket: Socket) => {
    // eslint-disable-next-line no-undef
    console.log(`User connected to notification: ${socket.id}`);
    socket.on("message", (msg) => {
      // eslint-disable-next-line no-undef
      console.log("Message received:", msg);
      socket.emit("message", "Hello from WebSocket server!");
    });

    socket.on("disconnect", () => {
      // eslint-disable-next-line no-undef
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  (globalThis as any).sendNotification = (data: { message: string }) => {
    notificationNamespace.emit("notification", data);
  };
};
