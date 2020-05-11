import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public videosArray= [];
  public showVideo = [];
  constructor() { }
}
