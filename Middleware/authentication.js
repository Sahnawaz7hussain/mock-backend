const e = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  const isHeadersPresent = req.headers.authentication;
  // console.log("isHeadersPresent: ", isHeadersPresent);
  if (isHeadersPresent === undefined) {
    res.send({ status: "failed", message: "Headers not passed" });
  } else {
    const token = isHeadersPresent.split(" ")[1];

    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      if (decoded?.userId.length > 0) {
        req.body.userId = decoded.userId;
        next();
      } else {
        res.send({ message: "token expired, login again..." });
      }
    } catch (err) {
      res.send({ message: "User is not authenticated.." });
    }
  }
};
module.exports = { authentication };
