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

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent
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
