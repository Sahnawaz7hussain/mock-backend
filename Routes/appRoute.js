const express = require("express");

const calculateRoute = express.Router();

calculateRoute.post("/", (req, res) => {
  let data = req.body;
  let { annualInstalmentAmount, annualInterestRate, totalNumberofYears } = data;
  let rate = annualInterestRate / 100;

  let totalInvestmentAmount =
    Number(annualInstalmentAmount) * Number(totalNumberofYears);

  //   Total Maturity Value(F) = P [({(1+i) ^n}-1)/i]
  // Total Maturity Value(F) = 1,00,000[({1 + 0.071) ^ 15}-1)/0.071]
  // Total Maturity Value(F) = 27,12,139
  let x = 1 + rate;
  let y = x ** totalNumberofYears;
  let z = y - 1;
  let TotalMaturityValue = annualInstalmentAmount * (z / rate);
  let TotalInterestGained = TotalMaturityValue - totalInvestmentAmount;

  console.log("dat::: ", TotalMaturityValue);
  console.log("rate::: ", rate);
  res.send({ totalInvestmentAmount, TotalInterestGained, TotalMaturityValue });
});

module.exports = { calculateRoute };
