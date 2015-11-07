import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    {process.env.NODE_ENV !== "production" ?
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    : null}
  </div> ,
  document.getElementById("root")
);
