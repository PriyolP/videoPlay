import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnChanges {
  @Output() addForm = new EventEmitter();
  @Input() dataRecivedVideo: string;
  @Output() playDataPass = new EventEmitter();
  @Input() masterp: object;
  @Output() mastpay = new EventEmitter()
  eventT: boolean = true;
  public videoList = [];
  public displayList = [];
  title: string;
  youtubeUrl: string;
  masterViewDiable = { play: true, pause: true };
  @Output() masterAll = new EventEmitter();
  constructor() { }

  check() {
    console.log(this.title);
    console.log(this.title === undefined || this.title === "");
    console.log(this.title === (undefined || "" || null));
    if ((this.title == undefined || this.title == "") || (this.youtubeUrl == undefined || this.youtubeUrl == "")) {
      this.eventT = true;
    } else {
      this.eventT = false;
    }
  }
  ngOnInit() {
    if (sessionStorage.getItem("video"))
      this.displayList = this.videoList = JSON.parse(sessionStorage.getItem("video"));
    console.log(this.displayList);
    console.log(this.videoList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // console.log(this.videoList);
    // console.log(this.displayList);
    if (changes["dataRecivedVideo"]) {
      var sample1 = changes["dataRecivedVideo"];
      if (sample1.previousValue) {
        // this.displayList = sample1.currentValue;
        this.videoList = sample1.currentValue;
      }
    }

    if (changes["masterp"]) {
      var load = changes["masterp"].currentValue;
      //console.log(load);
      if (load) {
        if (load.masterTrig === "play") {

          this.mastpay.emit(load.masterTrig);
          this.enable();
          // this.videoList[index].playFlag = true;
        } else if (load.masterTrig === "pause") {
          this.mastpay.emit(load.masterTrig);
          this.disable();
        } else if (load.masterTrig === "stop") {
          this.mastpay.emit(load.masterTrig);
          this.disable();
        }
      }
    }

  }
  enable() {
    this.videoList.map((t) => { t.playFlag = false; })
  }
  disable() {
    this.videoList.map((t) => { t.playFlag = true; })

  }

  load() {
    this.addForm.emit(this.displayList);
    // console.log(this.list[0]);
  }

  checkTrigger() {
    // debugger
    var playCount=0, pauseCount=0;
    this.masterViewDiable = { play: true, pause: true };
    this.videoList.map((c)=>{if(c.playFlag){ playCount++ }else { pauseCount++ }});
    console.log(playCount,"===", pauseCount);
    console.log(this.videoList.length);
    // if(playCount > pauseCount){
    if(this.videoList.length !== playCount){
      this.masterViewDiable["play"] = false;
    } else {
      this.masterViewDiable["play"] = true;
    }
    if(this.videoList.length !== pauseCount){ 
      this.masterViewDiable["pause"] = false;
    } else {
      this.masterViewDiable["pause"] = true;
    }
    console.log(this.masterViewDiable);
    this.masterAll.emit(this.masterViewDiable);
  }

  play(obj: object, index: number) {
    if (this.videoList[index].playFlag) {
      this.videoList[index].playFlag = false;
      obj["playTrigger"] = "play";
      this.checkTrigger();
    } else {
      this.videoList[index].playFlag = true;
      obj["playTrigger"] = "pause";
      this.checkTrigger();
    }
    this.trigger(obj);
  }
  trigger(val: object) {
    this.playDataPass.emit(val);
  }

  stop(obj: object, index: number) {
    this.videoList[index].playFlag = true;
    obj["playTrigger"] = "stop";
    this.trigger(obj);
  }

  checkSubmit() {
    var sample1;
    if (this.youtubeUrl.split("youtube").length > 1) {
      if (this.youtubeUrl.split("&")) {
        sample1 = this.youtubeUrl.split("https://www.youtube.com/watch?v=");
        sample1 = sample1[1].split("&")[0];
      } else {
        // if(this.youtubeUrl.split("https://www.youtube.com/watch?v=")){
        sample1 = this.youtubeUrl.split("https://www.youtube.com/watch?v=")[1];
        //console.log("out");
        // } else {

      }
    } else {
      alert("please check URL");
      this.clear();
      return;
    }

    var test = {
      title: this.title,
      youtubeId: sample1,
      flag: true,
      id: JSON.stringify(new Date().getTime()),
      playFlag: true
    }
    this.displayList.map((c) => { c.flag = false; })
    this.displayList.push(test);
    this.videoList.push(test);
    console.log(this.displayList);
    console.log(this.videoList);
    this.clear();
    this.load();
  }

  clear() {
    this.youtubeUrl = undefined;
    this.title = undefined;
  }
}
