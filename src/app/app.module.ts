import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SharedService} from './sharedservice.service';
import { AddpostsampleComponent } from './addpostsample/addpostsample.component';
import { InnerpageComponent } from './innerpage/innerpage.component';
import { NowrunningComponent } from './nowrunning/nowrunning.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TrailersComponent } from './trailers/trailers.component';
import { MusicvideosComponent } from './musicvideos/musicvideos.component';
import { OffersComponent } from './offers/offers.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NewspageComponent } from './newspage/newspage.component';
import { AddmuiscdataComponent } from './addmuiscdata/addmuiscdata.component';
import { MusicvideoinnerComponent } from './musicvideoinner/musicvideoinner.component';
import { DialogueComponent } from './dialogue/dialogue.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    AddpostsampleComponent,
    InnerpageComponent,
    NowrunningComponent,
    ReviewsComponent,
    TrailersComponent,
    MusicvideosComponent,
    OffersComponent,
    AboutusComponent,
    ContactusComponent,
    NewspageComponent,
    AddmuiscdataComponent,
    MusicvideoinnerComponent,
    DialogueComponent
  ],
  imports: [
   BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
