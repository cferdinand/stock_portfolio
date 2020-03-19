import { combineReducers } from "redux";
import topTen from "./topTen.js";
import stock from "./tradePrices.js";
import portfolio from "./portfolio.js";
import pricing from "./pricingData.js";

const main = combineReducers({
  topTen,
  stock,
  portfolio,
  pricing
});

export default main;
