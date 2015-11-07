import Immutable, { List } from "immutable";
import {
  LOAD_PLAYLIST
} from "../constants/actionTypes";

export default function(state = new List(), action) {
  if (action.type === LOAD_PLAYLIST) {
    return Immutable.fromJS(action.playlist.items.PlaylistItem.map(
      (item) => {
        const { title, uri } = item.properties;
        return { title, uri };
      }
    ));
  } else {
    return state;
  }
}
