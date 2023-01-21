const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../Controllers/userControllers");
const { authentication } = require("../Middleware/authentication");

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/getProfile", authentication, getProfile);

module.exports = { userRoute };
