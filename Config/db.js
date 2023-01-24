const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.MONGO_URL; //
console.log("mongo rul: ", URL);
mongoose.set("strictQuery", true);
// const connection = mongoose.connect("mongodb://127.0.0.1:27017/chatdbs");

const connection = mongoose.connect(URL);

module.exports = connection;
