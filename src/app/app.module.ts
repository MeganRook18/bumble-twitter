import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule, ActionReducer, Action } from "@ngrx/store";

// components
import { AppComponent } from "./app.component";
import { TweetComponent } from "./tweet/tweet.component";

// store
import { reducers, effects } from "./store";
import { storageMetaReducer } from "./storage-metareducer";

export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  // same signature of a reducer
  return function (state: any, action: Action) {
    return reducer(state, action);
  };
}

@NgModule({
  declarations: [AppComponent, TweetComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers: [storageMetaReducer] }),
    StoreModule.forFeature("state", reducers),
    EffectsModule.forRoot(effects),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
