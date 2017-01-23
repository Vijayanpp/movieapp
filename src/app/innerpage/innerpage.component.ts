import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-innerpage',
  templateUrl: './innerpage.component.html',
  styleUrls: ['./innerpage.component.css']
})
export class InnerpageComponent implements OnInit {
	public movie:Object;

  constructor(private router: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {

  	this.router.params.subscribe((params) => {
      const id = params['id'];
      var self=this;
      var d=firebase.database().ref('posts/Movie/Mollywood/').child(id);
     d.on("value", function(snapshot) {
    console.log(snapshot.val());
    self.movie=snapshot.val();
   }, function (errorObject) {
   console.log("The read failed: " + errorObject.code);
   });

  
  


  })
  }

}
