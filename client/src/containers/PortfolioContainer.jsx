import { connect } from "react-redux";
import getStockData from "../actions/getStockData.js";
import Portfolio from "../components/Portfolio/PortfolioMain.jsx";

const mapStateToProps = store => ({
  tradeStock: store.tradePrices
});

const mapDispatchToProps = dispatch => {
  return {
    getStockData: symbols => dispatch(getStockData(symbols))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
