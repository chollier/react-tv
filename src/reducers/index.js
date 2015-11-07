import { combineReducers } from "redux";
import channels from "./channels";
import ui from "./ui";

export default combineReducers({
  channels,
  ui
})
