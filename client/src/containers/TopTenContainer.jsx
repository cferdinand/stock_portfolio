import { connect } from "react-redux";
import topTenData from "../actions/topTenData.js";
import TopTen from "../components/MainPage/TopTen.jsx";

const mapStateToProps = store => ({
  mostActive: store.topTen.mostActive,
  topGainers: store.topTen.topGained
});

const mapDispatchToProps = dispatch => {
  return {
    topTenData: () => dispatch(topTenData())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TopTen);
