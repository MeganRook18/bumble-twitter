import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { Tweet } from "src/model/tweet";

@Component({
  selector: "tweet",
  styleUrls: ["./tweet.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article role="article" class="tweet">
      <div class="tweet__img">
        <img src="{{ tweet.image }}" height="50" width="50" alt="" />
      </div>
      <div class="tweet__body">
        <div class="user">
          {{ tweet.username }}
          <span>{{ tweet.timeStamp | date: "HH:mm" }}</span>
        </div>
        <div>{{ tweet.text }}</div>
      </div>
    </article>
  `,
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;
  @Output() resetDatabase = new EventEmitter();

  ngOnInit(): void {
    if (this.tweet.id === 10000) {
      this.resetDatabase.emit(null);
    }
  }
}
