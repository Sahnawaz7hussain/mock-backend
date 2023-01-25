// packages needed in this file
const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { Url } = require("../Models/UrlModel");
require("dotenv").config();
const router = express.Router();

// @route    POST /api/url/shorten

// const baseUrl = "http:localhost:5000";
const baseUrl = process.env.BASE_URL;

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  console.log("loginUrl", longUrl);
  // check base url if valid using the validUrl.isUri method
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // if valid, we create the url code
  const urlCode = shortid.generate();

  // check long url if valid using the validUrl.isUri method
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl,
      });

      // url exist and return the respose
      if (url) {
        res.json(url);
      } else {
        // join the generated short code the the base url
        const shortUrl = baseUrl + "/" + urlCode;
        // invoking the Url model and saving to the DB
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      // exception handler
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
