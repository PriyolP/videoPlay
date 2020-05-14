import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'videoPlayAngular';
  // public playlistData:[];
  public playlist: string;
  public add: string;
  public master: object;
  public dataPass: string;
  public masterValu: string;

  mPlayApp: boolean = false;
  mPauseApp: boolean = true;

  // triggerPlayFunction:object;
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    const playlistChanges = changes['playlist'];
    this.add = playlistChanges.currentValue;
    this.dataPass = changes['dataPass'].currentValue;
    // console.log(this.add);
    // console.log(playlistChanges);
    // if(playlistChanges.currentValue !== playlistChanges.previousValue){

    // }
  }

  playCondition(val: object) {
    console.log(val);
    console.log(this.mPlayApp);
    console.log(this.mPauseApp);
    // this.mPlayApp = val["play"];
    // this.mPauseApp = val["pause"];
    // setTimeout(() => {

      this.mPlayApp = val["pause"];
      this.mPauseApp = val["play"];
    // }, 500);
  }

  cool(val: string) {
    // console.log("mail");
    // console.log(val);
    this.add = JSON.stringify(val);
    this.playlist = val;
  }

  // outputPlayer(val:object){
  //   // console.log(val);
  //   this.reciveAddForm=val;
  // }
  playData(val: object) {
    // alert(JSON.stringify(val));
    // console.log(val);
    this.dataPass = JSON.stringify(val);
  }

  triggerMaster(val: object) {
    this.master = val;
    if (val["masterTrig"] === "play") {
      this.mPlayApp = true;
      this.mPauseApp = false;
    } else if(val["masterTrig"] === "pause"){
      this.mPlayApp = false;
      this.mPauseApp = true;
    } else {
      this.mPlayApp = false;
      this.mPauseApp = true;
    }
  }
  mastpay(val: object) {
    this.masterValu = JSON.stringify({ trigger: new Date().getTime(), value: val });
  }
}
