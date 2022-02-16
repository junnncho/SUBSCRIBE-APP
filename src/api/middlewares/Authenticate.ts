import { Router, Request } from "express";
import jwt from "express-jwt";
import config from "@/config";

const extractTokenFromHeader = (req: Request) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
};

// const Authenticate  =
//jwt({
//   secret: config.jwtSecret,
//   algorithms: [config.jwtAlgorithm],
//   userProperty: "token",
//   getToken: extractTokenFromHeader
// });
export default (app: Router) => {
  // TODO: change this to Quthenticate
};
