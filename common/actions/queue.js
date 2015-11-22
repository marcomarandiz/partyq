import * as types from '../constants/ActionTypes';
import { getVidFromUrl } from '../utils/functions.js';

export function addSong(url) {
  return {
    type: types.ADD_SONG,
    url,
    vid: getVidFromUrl(url)
  };
}
