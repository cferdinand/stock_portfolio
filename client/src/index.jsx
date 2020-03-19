import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App.jsx";
import { Provider } from "react-redux";
import store from "../src/store/store.js";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/MainPage.jsx";
import SignUp from "./components/SignUp.jsx";
import Portfolio from "./containers/PortfolioContainer.jsx";
import Transactions from "./components/Transactions/TransactionMain.jsx";

const routing = (
  <Router>
    <div className="top-level-app">
      <Switch>
        <Route export path="/signup" component={SignUp} />
        <Route exact path="/login" component={App} />
        <Route exact path="/home" component={Home} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/transactions" component={Transactions} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{routing}</Provider>,
  document.getElementById("app")
);
