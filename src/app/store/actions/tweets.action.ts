import { Action } from "@ngrx/store";
import { Tweet } from "src/model/tweet";

// Load initial tweets
export const LOAD_TWEETS = "[Tweets] Load Tweets";
export const LOAD_TWEETS_FAIL = "[Tweets] Load Tweets Fail";
export const LOAD_TWEETS_SUCCESS = "[Tweets] Load Tweets Success";
// Add tweet to state
export const ADD_TWEETS = "[Tweets] Add Tweets";

export const RESET_TWEETS = "[Reset] Reset State";

export class LoadTweets implements Action {
  readonly type = LOAD_TWEETS;
}

export class LoadTweetsFail implements Action {
  readonly type = LOAD_TWEETS_FAIL;
  constructor(public payload: any) {}
}

export class LoadTweetsSuccess implements Action {
  readonly type = LOAD_TWEETS_SUCCESS;
  constructor(public payload: Tweet[]) {}
}

export class AddTweet implements Action {
  readonly type = ADD_TWEETS;
  constructor(public payload: Tweet[]) {}
}

// when tweets entries max out. Reset state & database
export class ResetState implements Action {
  readonly type = RESET_TWEETS;
}

// action types
export type TweetsAction =
  | LoadTweets
  | LoadTweetsFail
  | LoadTweetsSuccess
  | AddTweet
  | ResetState;
