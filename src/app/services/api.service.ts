import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Tweet } from "src/model/tweet";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Returns the latest X tweets
   * @param count (Optional) request number of tweets (1 - 50), otherwise default is 20.
   * @returns Observable<Tweet[]>
   */
  public returnLatestTweetsGet(count?: number): Observable<Tweet[]> {
    if (count > 50 || count < 1) {
      throw new Error(
        "Count has to be between 1 - 50 when calling returnTweetsCreatedAfterUser."
      );
    }

    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/api?count=${count ? count : "X"}`
    );
  }

  /**
   * Returns X tweets created after the id ID
   * @param username
   * @param count (Optional) request number of tweets (1 - 50), otherwise default is 20.
   * @returns Observable<Tweet[]>
   */
  public returnTweetsCreatedAfterUser(
    user: string,
    count?: number
  ): Observable<Tweet[]> {
    if (user === null || user === undefined) {
      throw new Error(
        "Required parameter user was null or undefined when calling returnTweetsCreatedAfterUser."
      );
    }

    if (count > 50 || count < 1) {
      throw new Error(
        "Count has to be between 1 - 50 when calling returnTweetsCreatedAfterUser."
      );
    }

    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/api?count=${count ? count : "X"}&afterId=${user}`
    );
  }

  /**
   * Returns X tweets created before the id ID
   * @param username
   * @param count (Optional) request number of tweets (1 - 50), otherwise default is 20.
   * @returns Observable<Tweet[]>
   */
  public returnTweetsCreatedBeforeUser(
    user: string,
    count?: number
  ): Observable<Tweet[]> {
    if (user === null || user === undefined) {
      throw new Error(
        "Required parameter user was null or undefined when calling returnTweetsCreatedBeforeUser."
      );
    }

    if (count > 50 || count < 1) {
      throw new Error(
        "Count has to be between 1 - 50 when calling returnTweetsCreatedAfterUser."
      );
    }

    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/api?count=${
        count ? count : "X"
      }&beforeId=${user}`
    );
  }

  /**
   * Returns X tweets with the ID and the direction in time.
   * @param username
   * @param timeDirection Select -1 for past, 1 for future
   * @param count (Optional) request number of tweets (1 - 50), otherwise default is 20.
   * @returns Observable<Tweet[]>
   */
  public returnTweetsFromUsersInTimeDirection(
    user: string,
    timeDirection: -1 | 1,
    count?: number
  ): Observable<Tweet[]> {
    if (user === null || user === undefined) {
      throw new Error(
        "Required parameter user was null or undefined when calling returnTweetsFromUsersInTimeDirection."
      );
    }

    if (timeDirection === null || timeDirection === undefined) {
      throw new Error(
        "Required parameter timeDirection was null or undefined when calling returnTweetsFromUsersInTimeDirection."
      );
    }

    if (count > 50 || count < 1) {
      throw new Error(
        "Count has to be between 1 - 50 when calling returnTweetsCreatedAfterUser."
      );
    }

    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/api?count=${
        count ? count : "X"
      }&id=${user}&direction=${timeDirection}`
    );
  }

  /**
   * Returns X tweets created after the timestamp TS
   * @param timestamp
   * @param count (Optional) request number of tweets (1 - 50), otherwise default is 20.
   * @returns Observable<Tweet[]>
   */
  public returnTweetsAfterTimeStamp(
    timestamp: number,
    count?: number
  ): Observable<Tweet[]> {
    if (timestamp === null || timestamp === undefined) {
      throw new Error(
        "Required parameter timestamp was null or undefined when calling returnTweetsAfterTimeStamp."
      );
    }

    if (count > 50 || count < 1) {
      throw new Error(
        "Count has to be between 1 - 50 when calling returnTweetsCreatedAfterUser."
      );
    }

    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/api?count=${
        count ? count : "X"
      }&afterTime=${timestamp}`
    );
  }

  /**
   * Returns X tweets created before the timestamp TS
   * @param timestamp
   * @param count (Optional) request number of tweets (1 - 50), otherwise default is 20.
   * @returns Observable<Tweet[]>
   */
  public returnTweetsBeforeTimeStamp(
    timestamp: number,
    count?: number
  ): Observable<Tweet[]> {
    if (timestamp === null || timestamp === undefined) {
      throw new Error(
        "Required parameter timestamp was null or undefined when calling returnTweetsBeforeTimeStamp."
      );
    }

    if (count > 50 || count < 1) {
      throw new Error(
        "Count has to be between 1 - 50 when calling returnTweetsCreatedAfterUser."
      );
    }

    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/api?count=${
        count ? count : "X"
      }&beforeTime=${timestamp}`
    );
  }

  /**
   * Returns X tweets with timestamp TS  and the direction in time
   * @param timestamp
   * @param timeDirection Select -1 for past, 1 for future
   * @param count (Optional) request number of tweets (1 - 50), otherwise default is 20.
   * @returns Observable<Tweet[]>
   */
  public returnsTweetsWithTimestampInTimeDirection(
    timestamp: number,
    timeDirection: -1 | 1,
    count?: number
  ): Observable<Tweet[]> {
    if (timestamp === null || timestamp === undefined) {
      throw new Error(
        "Required parameter timestamp was null or undefined when calling returnsTweetsWithTimestampInTimeDirection."
      );
    }

    if (timeDirection === null || timeDirection === undefined) {
      throw new Error(
        "Required parameter timeDirection was null or undefined when calling returnsTweetsWithTimestampInTimeDirection."
      );
    }

    if (count > 50 || count < 1) {
      throw new Error(
        "Count has to be between 1 - 50 when calling returnTweetsCreatedAfterUser."
      );
    }

    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/api?count=${
        count ? count : "X"
      }&time=${timestamp}&direction=${timeDirection}`
    );
  }

  /**
   *  resets the database back to 100 entries. Used for testing purposes
   * @returns object: { success: boolean}
   */
  public resetBackTo100Entries() {
    return this.httpClient.request<Tweet[]>(
      "get",
      `${environment.basePath}/reset`
    );
  }
}
