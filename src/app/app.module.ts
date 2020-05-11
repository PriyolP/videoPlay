import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoComponent } from './video/video.component';

import { YouTubePlayerModule } from '@angular/youtube-player';

import { VideoService } from './video.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaylistComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    YouTubePlayerModule
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
