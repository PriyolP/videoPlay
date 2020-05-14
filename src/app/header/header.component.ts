import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() masterPlays = new EventEmitter();
  constructor() { }
  private flag: boolean = true; // dump value;

  @Input() mPlay: boolean;
  @Input() mPause: boolean;

  ngOnInit(): void {
  }
  flagTriger() {
    this.flag = !this.flag;
  }

  play() {
    // this.mPlay = true;
    // this.mPause = false;
    this.flagTriger();
    this.masterPlays.emit({ flag: !this.flag, masterTrig: "play" });
  }
  pause() {
    // this.mPlay = false;
    // this.mPause = true;
    this.flagTriger();
    this.masterPlays.emit({ flag: !this.flag, masterTrig: "pause" });
  }
  stop() {
    // this.mPlay = false;
    // this.mPause = true;
    this.flagTriger();
    this.masterPlays.emit({ flag: !this.flag, masterTrig: "stop" });
  }

}
