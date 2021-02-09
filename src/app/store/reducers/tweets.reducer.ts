import { Tweet } from "src/model/tweet";
import * as fromActions from "../actions/tweets.action";

export interface TweetsState {
  data: Tweet[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: TweetsState = {
  data: [],
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromActions.TweetsAction
): TweetsState {
  switch (action.type) {
    case fromActions.LOAD_TWEETS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_TWEETS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
      };
    }

    case fromActions.LOAD_TWEETS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.ADD_TWEETS: {
      const tweet = action.payload;
      const data = [...tweet, ...state.data];
      return {
        ...state,
        data,
      };
    }
  }

  return state;
}

export const getTweets = (state: TweetsState) => state.data;
export const getTweetsLoaded = (state: TweetsState) => state.loaded;
export const getTweetsLoading = (state: TweetsState) => state.loading;
