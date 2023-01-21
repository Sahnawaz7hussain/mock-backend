const express = require("express");
const connection = require("./Config/db");
const { calculateRoute } = require("./Routes/appRoute");
require("dotenv").config();
const PORT = process.env.PORT;
const { userRoute } = require("./Routes/userRoute");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});
app.use("/user", userRoute);
app.use("/calculate", calculateRoute);

app.listen(PORT || 8080, async () => {
  try {
    console.log("Connecting with db");
    await connection;
    console.log("Connected with db successfully");
    console.log(`server running at http://localhost:${PORT}`);
  } catch (err) {
    console.log("unable to connect with database");
    console.log({ err: err.message });
  }
});
