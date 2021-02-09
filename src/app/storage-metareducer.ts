import { ActionReducer, Action } from "@ngrx/store";
import { merge, pick } from "lodash-es";

import * as actionTypes from "./store/actions";

export function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

export function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

const stateKeys = ["state"];
// the key for the local storage.
export const localStorageKey = "__app_storage__";

export function storageMetaReducer<S, A extends Action = Action>(
  reducer: ActionReducer<S, A>
) {
  let onInit = true; // after load/refresh…
  return function (state: S, action: A): S {
    // if called then turn state to initial state
    if (action.type === actionTypes.RESET_TWEETS) {
      state = undefined;
    }

    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      return merge(nextState, savedState);
    }
    // save the next state to the application storage.
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}
