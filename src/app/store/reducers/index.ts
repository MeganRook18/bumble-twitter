import * as fromTweets from "./tweets.reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

export interface AppState {
  tweets: fromTweets.TweetsState;
}

export const reducers: ActionReducerMap<AppState> = {
  tweets: fromTweets.reducer,
};

export const getAppState = createFeatureSelector<AppState>("state");

// tweets selectors
export const getTweetsState = createSelector(
  getAppState,
  (state: AppState) => state.tweets
);

export const getTweets = createSelector(getTweetsState, fromTweets.getTweets);

export const getTweetsLoaded = createSelector(
  getTweetsState,
  fromTweets.getTweetsLoaded
);

export const getTweetsLoading = createSelector(
  getTweetsState,
  fromTweets.getTweetsLoading
);
