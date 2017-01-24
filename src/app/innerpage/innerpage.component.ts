import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-innerpage',
  templateUrl: './innerpage.component.html',
  styleUrls: ['./innerpage.component.css']
})
export class InnerpageComponent implements OnInit {
	public movie
  public musicvideos=[];
  public trailers=[];

  constructor(private router: ActivatedRoute, private sanitizer: DomSanitizer) {


   }

  ngOnInit() {

  	this.router.params.subscribe((params) => {
      console.log('hiii')
      const id = params['id'];
      var self=this;
      var d=firebase.database().ref('posts/Movie/Mollywood/').child(id);
     d.on("value", function(snapshot) {

    console.log(snapshot.val());
    self.movie=snapshot.val();
    console.log(self.movie.musicvideos);
     if(self.movie.musicvideos)
     {
   for(let i=0;i<self.movie.musicvideos.length;i++)
        {
          console.log(self.movie.musicvideos[i])
          var url=self.sanitizer.bypassSecurityTrustHtml(self.movie.musicvideos[i])
          self.musicvideos.push(url);
        }
     }

     if(self.movie.trailers)
     {
   for(let i=0;i<self.movie.trailers.length;i++)
        {
          console.log(self.movie.trailers[i])
          var url=self.sanitizer.bypassSecurityTrustHtml(self.movie.trailers[i])
          self.trailers.push(url);
        }
     }

   }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
   });})




  }

}
