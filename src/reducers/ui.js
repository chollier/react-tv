import { Map } from "immutable";
import {
  SELECT_CHANNEL
} from "../constants/actionTypes";

export default function(state = new Map(), action) {
  if (action.type === SELECT_CHANNEL) {
    return state.set("selected", action.channel);
  } else {
    return state;
  }
}
