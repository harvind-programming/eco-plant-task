import express from "express";
import httpStatus from "http-status";
import {
  getKeyValuePairs,
  getKeyValuePairsAt,
  addKeyValuePairs,
} from "../../controllers/keyValuePairsController";

export const createHealthRouter = () => {
  const healthRouter = express.Router();

  healthRouter.get("/health", (_, res) => res.status(httpStatus.OK).send("ok"));
  healthRouter.get("/getData/:key", getKeyValuePairsAt);
  healthRouter.get("/getData", getKeyValuePairs);
  healthRouter.post("/addData", addKeyValuePairs);

  return healthRouter;
};
