import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService} from '../sharedservice.service'
import * as Firebase from 'firebase';
@Component({
  selector: 'app-musicvideoinner',
  templateUrl: './musicvideoinner.component.html',
  styleUrls: ['./musicvideoinner.component.css']
})
export class MusicvideoinnerComponent implements OnInit {
  
  public musicvideos;
  public videourl;
  public starsid;
  constructor(private router: ActivatedRoute, private sanitizer: DomSanitizer,private sharedService:SharedService) {
  
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
   var uid = firebase.auth().currentUser.uid;
    var recentPostsRef = firebase.database().ref('posts/Music/'+this.sharedService.sharedvalue.category+'/'+id);
    this.sharedService.LikethePost(recentPostsRef,uid);   
}

}
