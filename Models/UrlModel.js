const mongoose = require("mongoose");

// instantiate a mongoose schema
const URLSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: String,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", URLSchema);
// create a model from schema and export it
// module.exports = mongoose.model("Url", URLSchema);
module.exports = { Url };
