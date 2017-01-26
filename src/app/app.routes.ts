import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AddpostsampleComponent } from './addpostsample/addpostsample.component';
import { InnerpageComponent } from './innerpage/innerpage.component';
import { NowrunningComponent } from './nowrunning/nowrunning.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TrailersComponent } from './trailers/trailers.component';
import { MusicvideosComponent } from './musicvideos/musicvideos.component';
import { OffersComponent } from './offers/offers.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MusicvideoinnerComponent } from './musicvideoinner/musicvideoinner.component';
export const appRoutes: Routes = [
     {path:'',component:HomepageComponent},
     {path:'login',component:LoginComponent},
     {path:'addmoviedata',component:AddpostsampleComponent},
     {path:'detail/:id',component:InnerpageComponent},
     {path:'musicvideos/detail/:id',component:MusicvideoinnerComponent},
     {path:'runningintheater',component:NowrunningComponent},
     {path:'reviews',component:ReviewsComponent },
     {path:'trailers',component:TrailersComponent },
     {path:'musicvideos',component:MusicvideosComponent },
     {path:'offers',component:OffersComponent},
     {path:'aboutus',component:AboutusComponent},
     {path:'contactus',component:ContactusComponent}
    
];