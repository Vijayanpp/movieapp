import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService} from '../sharedservice.service';
import * as Firebase from 'firebase';
declare var FB;
@Component({
  selector: 'app-musicvideoinner',
  templateUrl: './musicvideoinner.component.html',
  styleUrls: ['./musicvideoinner.component.css']
})
export class MusicvideoinnerComponent implements OnInit {
  
  public musicvideos;
  public videourl;
  public starsid;
  public share:boolean=false;
   public rate:boolean=false;
  constructor(private router: ActivatedRoute, private sanitizer: DomSanitizer,private sharedService:SharedService,private routernav:Router) {
  
   }

  ngOnInit() {
     
  	this.router.params.subscribe((params) => {
     
      const id = params['id'];
      var self=this;
      var adbcd_music=firebase.database().ref('posts/Music/'+this.sharedService.sharedvalue.category+'/').child(id);
    adbcd_music.on("value", function(snapshot) {
    self.musicvideos=snapshot.val();
    self.musicvideos.id=snapshot.key;
    self.musicvideos.views++;
       
    if(self.musicvideos.musicvideos)
    {
     self.videourl=self.sanitizer.bypassSecurityTrustHtml(self.musicvideos.musicvideos[0]);
    }   
    
     }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
   });})

  }
 

  like(id)
{ 
    
   if(firebase.auth().currentUser!=null)
   {
    var uid = firebase.auth().currentUser.uid;
    var recentPostsRef = firebase.database().ref('posts/Music/'+this.sharedService.sharedvalue.category+'/'+id);
    this.sharedService.LikethePost(recentPostsRef,uid);  
   }
   else
   {
     this.routernav.navigate(['login']);
   }
}
shareThisPost()
{
  this.share=true;
}
rateThisPost()
{

  this.rate=true;
}
Rate(count,currentRating,newRating,id)
{
    
  var uid = firebase.auth().currentUser.uid;
  var recentPostsRef = firebase.database().ref('posts/Music/'+this.sharedService.sharedvalue.category+'/'+id);
  this.sharedService.RatethePost(recentPostsRef,count,currentRating,newRating,uid); 
}
closeShare()
{
  this.share=false;
}
closeRate()
{
  this.rate=false;
}
shareOnFB()
  {
    console.log('sharex');
      FB.ui({
   app_id:'568461570013753',
    method: 'share',
    
    display: 'popup',
    href: 'http://www.adbcd.com',
  }, function(response){
    console.log(response.error_message)
  });
}

}
