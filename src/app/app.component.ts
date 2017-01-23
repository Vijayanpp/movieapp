import { Component } from '@angular/core';
import { SharedService} from './sharedservice.service'
import { ActivatedRoute,Router } from '@angular/router';
import * as Firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public imgUrl:string;
	private displayName:string;
	private email:string;
   
  constructor(private sharedService:SharedService,private router:Router, private route: ActivatedRoute) { }
  ngOnInit()
  {
  	this.checkAuthState();
  }
  logout()
  {
  	console.log("click on the logout")
  	firebase.auth().signOut().then(()=>{
  	this.router.navigate([''], { relativeTo: this.route })
    this.sharedService.sharedvalue.signin=false;
    this.sharedService.sharedvalue.currentUser=null
}
)
  }

  checkAuthState()
  {
  	 var self=this;
  	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('user sined in')
    self.imgUrl=user.photoURL;
    console.log(this.imgUrl)
    self.displayName=user.displayName;
    self.email=user.email;
   
    console.log(this.email)
    self.sharedService.sharedvalue.signin=true;
    console.log(self.sharedService.sharedvalue.signin)
    self.sharedService.sharedvalue.currentUser=user;

  } else {
    
    self.imgUrl=null;
    self.displayName=null;
    self.email=null;
    self.sharedService.sharedvalue.signin=false;
    self.sharedService.sharedvalue.currentUser=null;


  }
});
  }
}
