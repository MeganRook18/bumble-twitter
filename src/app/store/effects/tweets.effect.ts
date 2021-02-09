import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { switchMap, catchError, take, map, retry } from "rxjs/operators";
import { of } from "rxjs";

import { ApiService } from "src/app/services/api.service";
import * as fromActions from "../actions/tweets.action";
import { Tweet } from "src/model/tweet";

@Injectable()
export class TweetsEffects {
  private readonly tweetsOnLoad = 6;
  constructor(private actions$: Actions, private api: ApiService) {}

  /**
   * Listen for dispatch of LoadTweets then get first initial tweets
   * and add to state.
   */
  @Effect()
  loadInitialTweets$ = this.actions$.pipe(ofType(fromActions.LOAD_TWEETS)).pipe(
    switchMap(() =>
      this.api
        .returnLatestTweetsGet(this.tweetsOnLoad)
        .pipe(take(1))
        .pipe(retry())
        .pipe(
          map((tweets: Tweet[]) => new fromActions.LoadTweetsSuccess(tweets)),
          catchError((error) => of(new fromActions.LoadTweetsFail(error)))
        )
    )
  );

  /**
   * Listen for ResetState then call api reset back to 100 entries and
   * re-call LoadTweets, triggering the above effect.
   */
  @Effect()
  resetDatabase$ = this.actions$.pipe(ofType(fromActions.RESET_TWEETS)).pipe(
    switchMap(() =>
      this.api
        .resetBackTo100Entries()
        .pipe(take(1))
        .pipe(retry())
        .pipe(
          map((data: any) => {
            if (data.success) {
              console.log("success: reset state");
              return new fromActions.LoadTweets();
            }
          }),
          catchError((error) => of(new fromActions.LoadTweetsFail(error)))
        )
    )
  );
}
