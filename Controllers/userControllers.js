const { UserModel } = require("../Models/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SALT_ROUND = process.env.SALT_ROUND || 10;
console.log("Saltrounded: ", SALT_ROUND);

const register = async (req, res) => {
  let userData = req.body;
  let { email, name, password } = userData;
  if (!email || !name || !password) {
    return res.send({
      status: "Failed",
      message: "Please fill all the fields",
    });
  }
  try {
    let isUserPresent = await UserModel.find({ email: email });

    if (isUserPresent.length > 0) {
      res.send({
        status: "Failed",
        message: "An user already exist with this email",
      });
    } else {
      bcrypt.hash(password, Number(SALT_ROUND), async function (err, hash) {
        if (err) {
          console.log(err.message);
          res.send({
            status: "Failed",
            message: "Something went wrong please try again later",
          });
        } else {
          let newUser = UserModel({ email, name, password: hash });
          await newUser.save();
          res.send({ status: "success", message: "Register successfull" });
        }

        // Store hash in your password DB.
      });
    }
  } catch (err) {
    console.log(err.message);
    res.send({ status: "failed", message: "something went wrong..." });
  }
};

const login = async (req, res) => {
  let userData = req.body;
  try {
    let { email, password, name } = userData;
    let isUserPresent = await UserModel.findOne({ email: email });

    console.log("isUser preslogin: ", isUserPresent);
    if (isUserPresent) {
      bcrypt.compare(password, isUserPresent.password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            { name: name, email: email, userId: isUserPresent._id },
            process.env.SECRET_KEY
          );
          res.send({
            message: "user present for login",
            status: "success",
            token: token,
          });
        } else {
          res.send({ status: "failed", message: "Wrong password" });
        }
      });
    } else {
      res.send({
        status: "failed",
        message: "user not found with this email address",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.send({ status: "failed", message: "something went wrong..." });
  }
};

const getProfile = async (req, res) => {
  try {
    let userData = req.body;
    console.log("user idata: ", userData);
    let user = await UserModel.findById({ _id: userData.userId });
    res.send({ prifile: user, message: "success" });
  } catch (err) {
    console.log(err.message);
    res.send({ status: "failed", message: "Something went wrong..." });
  }
};

module.exports = { register, login, getProfile };
