import { Component, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'videoPlayAngular';
  // public playlistData:[];
  public playlist:string;
  public add:string;
  public master:object;
  public dataPass:string;
  public masterValu:string;
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
  playData(val:object){
    // alert(JSON.stringify(val));
    // console.log(val);
    this.dataPass=JSON.stringify(val); 
  }

  triggerMaster(val:object){
    this.master = val;
  }
  mastpay(val:object){
    this.masterValu = JSON.stringify({trigger: new Date().getTime(), value: val});
  }
}
