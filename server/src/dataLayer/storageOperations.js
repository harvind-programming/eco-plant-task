/* eslint-disable @typescript-eslint/no-unused-vars */
import { sendNotification } from "../util/sendNotification";
import { storage } from "../Models/storage";

export const getDataAt = (key) => {
  // eslint-disable-next-line no-undef
  console.log(storage);
  return storage.find((item) => item.key === key);
};

export const getData = () => {
  return storage;
};

export const addData = (val) => {
  const { key, value, expiry = 0 } = val;
  const timeStamp = Date.now();
  storage.push({ key, value, expiry, timestamp });
};

export const cleanUpStorage = () => {
  const currentTime = Date.now();
  for (let i = storage.length - 1; i >= 0; i--) {
    if (currentTime >= storage[i].timestamp + storage[i].expiry * 1000) {
      storage.splice(i, 1);
    }
  }
  // eslint-disable-next-line no-undef
  console.log("Cleanup finished");
  // eslint-disable-next-line no-undef
  console.log(storage);
  sendNotification(getData());
};
