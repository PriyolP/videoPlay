import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() masterPlays = new EventEmitter();
  constructor() { }
  private flag:boolean=true;
  ngOnInit(): void {
  }
  flagTriger(){
    this.flag=!this.flag;
  }

  play(){
    this.flagTriger();
    this.masterPlays.emit({flag:!this.flag, masterTrig:"play"});
  }
  pause(){
    this.flagTriger();
    this.masterPlays.emit({flag:!this.flag, masterTrig:"pause"});
  }
  stop(){
    this.flagTriger();
    this.masterPlays.emit({flag:!this.flag, masterTrig:"stop"});
  }

}
