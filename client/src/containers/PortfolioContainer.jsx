import { connect } from "react-redux";
import getStockData from "../actions/getStockData.js";
import tradeStock from "../actions/tradeStock.js";
import getPortfolio from "../actions/getPortfolio.js";
import Portfolio from "../components/Portfolio/PortfolioMain.jsx";

const mapStateToProps = store => ({
  stock: store.stock,
  portfolio: store.portfolio.portfolioData,
  balance: store.portfolio.balance,
  portfolioPricing: store.pricing
});

const mapDispatchToProps = dispatch => {
  return {
    getStockData: (symbols, pricing) =>
      dispatch(getStockData(symbols, pricing)),
    tradeStock: transaction => dispatch(tradeStock(transaction)),
    getPortfolio: () => dispatch(getPortfolio())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
