import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Observable, timer } from "rxjs";
import { switchMap, retry, takeUntil, map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { Tweet } from "src/model/tweet";
import { ApiService } from "./api.service";
import * as fromStore from "../store";

@Injectable({
  providedIn: "root",
})
export class PollingService implements OnDestroy {
  public stopPolling$ = new Subject<boolean>();

  constructor(
    private store: Store<fromStore.AppState>,
    private api: ApiService
  ) {}

  public startTwitterStream() {
    this.openStream().subscribe((tweets) =>
      // add to state
      this.store.dispatch(new fromStore.AddTweet(tweets))
    );
  }

  // start new poll and stop when requested
  private openStream(): Observable<any> {
    return this.beginPolling().pipe(takeUntil(this.stopPolling$));
  }

  // Start polling for tweets on the provided interval (defaulting to 2 seconds).
  private beginPolling(interval: number = 2000): Observable<any> {
    return timer(0, interval).pipe(switchMap((_) => this.requestData()));
  }

  // Get most recent tweet's timeStamp from state and pass to api call
  // request 1 tweet at a time to reduce stack
  private requestData(): Observable<Tweet[]> {
    return this.store
      .select(fromStore.getTweets)
      .pipe(
        map((tweets) => {
          if (tweets.length) {
            return tweets[0].timeStamp;
          }
        })
      )
      .pipe(
        switchMap((timeStamp) =>
          this.api.returnTweetsAfterTimeStamp(timeStamp, 1)
        ),
        take(1),
        retry()
      );
  }

  // kill stream
  ngOnDestroy() {
    this.stopPolling$.next(true);
    this.stopPolling$.complete();
  }
}
