import {
  SELECT_CHANNEL,
  LOAD_PLAYLIST
} from "../constants/actionTypes"

export function loadPlaylist(m3u) {
  return {
    type: LOAD_PLAYLIST,
    playlist: m3u
  };
}

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    channel
  };
}

