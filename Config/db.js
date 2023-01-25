const mongoose = require("mongoose");
require("dotenv").config();
// const URL2 = "mongodb://127.0.0.1:27017/mock10";
const URL = process.env.MONGO_URL; //
console.log("mongourl: ", URL);
mongoose.set("strictQuery", true);
//const connection = mongoose.connect("mongodb://127.0.0.1:27017/mock10");

const connection = mongoose.connect(URL);

module.exports = connection;
