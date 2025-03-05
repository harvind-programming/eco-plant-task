export const sendNotification = (data: any) => {
  //   console.log(data);
  if ((globalThis as any).sendNotification) {
    (globalThis as any).sendNotification({ data });
  } else {
    console.error("WebSocket server is not initialized yet.");
  }
};
