import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Tweet } from "src/model/tweet";
import * as fromStore from "./store";
import { PollingService } from "./services/polling.service";
import { ResetState } from "./store";
import { getSavedState, localStorageKey } from "./storage-metareducer";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.scss"],
  template: `
    <main role="main">
      <section *ngIf="tweets | async as feed; else noTweets">
        <tweet
          (resetDatabase)="resetDatabase()"
          *ngFor="let tweet of feed"
          [tweet]="tweet"
        ></tweet>
      </section>

      <ng-template #noTweets>
        <div>
          <p>Oh no, looks like you have no tweets.</p>
        </div>
      </ng-template>
    </main>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  public tweets: Observable<Tweet[]>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private offlineEvent: Observable<Event>;
  private onlineEvent: Observable<Event>;

  constructor(
    private store: Store<fromStore.AppState>,
    private polling: PollingService
  ) {}

  ngOnInit(): void {
    this.handleConnectivityChanges();

    if (this.isLocalStorageEmpty()) {
      this.store.dispatch(new fromStore.LoadTweets());
    }

    this.tweets = this.store.select(fromStore.getTweets);
    this.polling.startTwitterStream();
  }

  public resetDatabase(): void {
    this.store.dispatch(new ResetState());
  }

  // only dispatch initial tweets if saved state is empty
  private isLocalStorageEmpty(): boolean {
    const {
      state: {
        tweets: { data },
      },
    } = getSavedState(localStorageKey);

    return data.length ? false : true;
  }

  private handleConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, "online");
    this.offlineEvent = fromEvent(window, "offline");

    this.onlineEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.polling.stopPolling$ = new Subject<boolean>();
      this.polling.startTwitterStream();
    });

    this.offlineEvent.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.polling.stopPolling$.next(true);
    });
  }

  ngOnDestroy(): void {
    // destroy subscription
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
