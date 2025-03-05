/* eslint-disable @typescript-eslint/no-unused-vars */
import { sendNotification } from "../util/sendNotification";
import { getData, getDataAt, addData } from "../dataLayer/storageOperations";

export const getKeyValuePairsAt = (req, res) => {
  // assume the inputs have been sanitized and validated
  const { key } = req.params;
  // eslint-disable-next-line no-undef
  console.log(key);
  const value = getDataAt(key);
  if (value === -1) {
    return res.status(400).json("invalid key");
  } else {
    return res.status(200).json(value);
  }
};

export const getKeyValuePairs = (req, res) => {
  // assume the inputs have been sanitized and validated
  return res.status(200).json(getData());
};

export const addKeyValuePairs = (req, res) => {
  // assume the inputs have been sanitized and validated
  // eslint-disable-next-line no-undef
  console.log(req.body);
  addData(req.body);
  sendNotification(getData());
  return res.status(200).json("Insertion success");
};

// module.exports = {
//   getKeyValuePairs,
//   getKeyValuePairsAt,
//   addKeyValuePairs,
// };
