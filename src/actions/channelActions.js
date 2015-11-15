import m3u8 from "m3u8";
import fileReaderStream from "filereader-stream";

import {
  SELECT_CHANNEL,
  LOADING_PLAYLIST_FROM_FILE,
  PLAYLIST_M3U_DECODED,
  PLAYLIST_LOAD_ERROR,
  DOWNLOADING_PLAYLIST,
  LOADING_PLAYLIST_FROM_RESPONSE
} from "../constants/actionTypes"

// this action return a function and not an object,
// this is thanks to https://github.com/gaearon/redux-thunk
export function downloadPlaylist(url) {
  return (dispatch) => {
    dispatch({type: DOWNLOADING_PLAYLIST, url});

    fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response;
      } else {
        return Promise.reject({response});
      }
    })
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      dispatch({type: LOADING_PLAYLIST_FROM_RESPONSE});
      return loadPlaylistFromStream(text);
    })
    .then((m3u) => {
      dispatch(playlistDecoded(m3u));
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch(playlistLoadError(error));
    });
  }
}

// this returns a promise, if we were able to parse
// we resolve it, if not we reject
function loadPlaylistFromStream(stream) {
  return new Promise((resolve, reject) => {
    const parser = m3u8.createStream();
    parser.write(stream);
    // If we succeed, then we resolve
    parser.on("m3u", (m3u) => resolve(m3u));
    // If not we reject
    parser.on("error", (error) => reject(error))
    parser.end();
  });
}

export function loadPlaylistFromFile(file) {

  return (dispatch) => {

    // First we dispatch that we are loading a playlist
    dispatch({type: LOADING_PLAYLIST_FROM_FILE});

    // then we start parsing the file
    const parser = m3u8.createStream();
    fileReaderStream(file).pipe(parser);

    // If we succeed, then we dispatch playlistDecoded
    parser.on("m3u", (m3u) => dispatch(playlistDecoded(m3u)))

    // If not we dispatch playlistLoadError with the error
    parser.on("error", (error) => dispatch(playlistLoadError(error)))

  };
}

export function playlistDecoded(playlist) {
  return {
    type: PLAYLIST_M3U_DECODED,
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

