import { combineReducers } from "redux";
import topTen from "./topTen.js";
import tradePrices from "./tradePrices.js";

const main = combineReducers({
  topTen,
  tradePrices
});

export default main;
