import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/"

let middleware = [thunk];
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
