import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/"
import createLogger from "redux-logger";

const logger = createLogger();
let middleware = [thunk, logger];
let finalCreateStore;

if (process.env.NODE_ENV === "production") {
  finalCreateStore = applyMiddleware(...middleware)(createStore)
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    require("redux-devtools").devTools(),
    require("redux-devtools").persistState(
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    )
  )(createStore)

}

export default finalCreateStore(reducer);
