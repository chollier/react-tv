import m3u8 from "m3u8";
import fileReaderStream from "filereader-stream";

import {
  SELECT_CHANNEL,
  LOADING_PLAYLIST_FROM_FILE,
  PLAYLIST_LOADED_FROM_FILE,
  PLAYLIST_LOAD_ERROR
} from "../constants/actionTypes"

// this action return a function and not an object,
// this is thanks to https://github.com/gaearon/redux-thunk
export function loadPlaylistFromFile(file) {

  return (dispatch) => {

    // First we dispatch that we are loading a playlist
    dispatch({type: LOADING_PLAYLIST_FROM_FILE});

    // then we start parsing the file
    const parser = m3u8.createStream();
    fileReaderStream(file).pipe(parser);

    // If we succeed, then we dispatch playlistLoadedFromFile
    parser.on("m3u", (m3u) => dispatch(playlistLoadedFromFile(m3u)))

    // If not we dispatch playlistLoadError with the error
    parser.on("error", (error) => dispatch(playlistLoadError(error)))

  };
}

export function playlistLoadedFromFile(playlist) {
  return {
    type: PLAYLIST_LOADED_FROM_FILE,
    playlist
  };
}

export function playlistLoadError(error) {
  return {
    type: PLAYLIST_LOAD_ERROR,
    error
  };
}

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    channel
  };
}

