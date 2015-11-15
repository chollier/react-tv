import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App} />
      <Route path="/react-tv/" component={App} />
    </Router>
  </Provider> ,
  document.getElementById("root")
);
