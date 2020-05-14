import { Component, OnInit, Output, Input, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
// import { VideoService } from '../video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnChanges {
  // https://youtu.be/4nc1KMFRk6I
  // playerVars: {rel: 0, showinfo: 0, ecver: 2, controls: 0},
  @Input() loggi: string;
  @Input() playTriggerSample: string;
  @Input() triggermasterPlay: string;
  // @Output() outLoggi = new EventEmitter();

  public player = [];
  playerCopy: any[];
  onYouTubeIframeAPIReady(arr: number, value: string, title: string, id: string) {
    this.player[arr] = new YT.Player(id, {
      height: '200',
      width: '100%',
      videoId: value,
      playerVars: { rel: 0, controls: 0 }
    });
    // this.playerCopy.push(this.player);
    // console.log(this.player);
    // this.play();
    this.player[arr].nameId = title;
    this.player[arr].title = value;
    this.player[arr].triggers = id;
    // this.service.showVideo = this.player;
  }

  play(value: number) {
    console.log(this.player);
    this.player[value].playVideo();
    // console.log(this.playerCopy);
    // this.player.playVideo();
  }
  pause(value: number) {
    this.player[value].pauseVideo();

    // this.player=undefined;
    // this.onYouTubeIframeAPIReady(1,'ss');
    // this.player.pauseVideo();
  }
  stop(value: number) {
    // console.log(this.player);
    this.player[value].stopVideo();

    // this.player.stopVideo();
  }
  playe() {
    // console.log(this.loggi);
    // // document.getElementById('mainId').innerHTML += "<div >ooooooooooooooooooooooo</div>"
    // console.log(this.player);
    // // setTimeout(() => { this.player[0].playVideo(); console.log("sssssss") }, 3000);
  }

  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => this.onYouTubeIframeAPIReady(0, 'uu'), 500);
    // this.onYouTubeIframeAPIReady(0, 'uu');
    if (sessionStorage.getItem("video")) {
      var store = JSON.parse(sessionStorage.getItem("video"));
      console.log(store);
      store.map((c) => {
        this.createNewId(c.id);
        this.onYouTubeIframeAPIReady(this.player.length, c.youtubeId, c.title, c.id);
      })
    }

  }
  createNewId(id: string) {
    // var getInput = document.getElementById('ss').innerHTML;
    var node = document.createElement("div");
    var before = document.getElementById("before");
    // node.className = "col=md-4";
    node.innerHTML = `<div class="col-md-4"><div id="${id}"></div>`;
    var parentDiv = document.getElementById("mainId");    // Get the <ul> element to insert a new node
    parentDiv.insertBefore(node, before);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // console.log(changes['loggi']);
    // console.log(this.loggi)
    // console.log(changes['loggi'].previousValue);
    // debugger
    if (this.loggi !== undefined) {
      if (changes['loggi']) {
        var sample = JSON.parse(changes['loggi'].currentValue);

        sample.map((c) => {
          console.log(c);
          if (c.flag) {
            c.flag = false;
            this.createNewId(c.id);
            // var getInput = document.getElementById('ss').innerHTML;
            // var node = document.createElement("div");
            // var before = document.getElementById("before");
            // // node.className = "col=md-4";
            // node.innerHTML = `<div class="col-md-4"><div id="${c.id}"></div>`;
            // var parentDiv = document.getElementById("mainId");    // Get the <ul> element to insert a new node
            // parentDiv.insertBefore(node, before);

            // document.getElementById('mainId').innerHTML += `<div class="col-md-4"><div id="${c.id}"></div>`;
            // setTimeout(() => 
            this.onYouTubeIframeAPIReady(this.player.length, c.youtubeId, c.title, c.id)
            // , 500);
          }
        });
        // console.log(JSON.parse(changes['loggi'].currentValue));
        console.log(sample);
        sessionStorage.setItem("video", JSON.stringify(sample));
        // this.outLoggi.emit(sample);
      }
    }
    if (this.playTriggerSample !== undefined) {
      if (changes["playTriggerSample"]) {
        // console.log(this.player);
        // console.log("this.player[0]");
        // console.log(this.player[0]);
        var number: number = -1;
        // alert(changes["playTriggerSample"].currentValue);
        var sample2 = JSON.parse(changes["playTriggerSample"].currentValue);
        if (sample2.playTrigger === "play") {
          // console.log("trigger Play");
          // console.log(sample2.id);
          // this.player[0].playVideo();
          // this.player.find((c)=>{ console.log(sample2.id == c.triggers); console.log(number); number++;if(sample2.id == c.triggers){this.play(number)}});
          this.player.map((c) => { console.log("play"); console.log(sample2.id == c.triggers); number++; if (sample2.id == c.triggers) { this.play(number) } });
        } else if (sample2.playTrigger === "pause") {
          console.log("trigger pause");
          this.player.map((c) => { console.log("play"); console.log(sample2.id == c.triggers); number++; if (sample2.id == c.triggers) { this.pause(number) } });
          // this.player.find((c)=>{ console.log(sample2.id == c.triggers); console.log(number); number++;if(sample2.id == c.triggers){this.pause(number)}});
        } else if (sample2.playTrigger === "stop") {
          console.log("trigger stop");
          this.player.map((c) => { console.log("play"); console.log(sample2.id == c.triggers); number++; if (sample2.id == c.triggers) { this.stop(number) } });
        }
      }
    }
    if (changes["triggermasterPlay"] !== undefined) {
      if (changes["triggermasterPlay"].currentValue !== undefined) {
        var number = 0;
        var sample2 = JSON.parse(changes["triggermasterPlay"].currentValue).value;
        for (number; number < this.player.length; number++) {

          if (sample2 === "play") {
            this.play(number);
          } else if (sample2 === "pause") {
            this.pause(number);
          } else if (sample2 === "stop") {
            this.stop(number);
          }
        }
      }
    }
  }

  // flag: false
  // id: "1589040682233"
  // playFlag: false
  // playTrigger: "play"
  // title: "das"
  // youtubeId: "BGy8DdGw_WE"

  dataTransforAddForm() {

  }

  playData() {
    // console.log("sssssssss");
  }
}
