import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App.jsx";
import { Provider } from "react-redux";
import store from "../src/store/store.jsx";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/MainPage.jsx";
import SignUp from "./components/SignUp.jsx";

const routing = (
  <Router>
    <div>
      <Switch>
        <Route export path="/signup" component={SignUp} />
        <Route exact path="/login" component={App} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{routing}</Provider>,
  document.getElementById("app")
);
