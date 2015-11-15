import Immutable, { List } from "immutable";
import {
  PLAYLIST_M3U_DECODED
} from "../constants/actionTypes";

export default function(state = new List(), action) {
  if (action.type === PLAYLIST_M3U_DECODED) {
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
