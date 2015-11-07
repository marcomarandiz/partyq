import * as types from '../constants/ActionTypes';

export function upvoteSong (song){
	return {
		type: types.UPVOTE_SONG;
    song: song
	};
}
