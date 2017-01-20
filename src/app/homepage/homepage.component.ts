import { Component, OnInit } from '@angular/core';
import { SharedService} from '../sharedservice.service'
import { ActivatedRoute,Router } from '@angular/router';
import * as Firebase from 'firebase';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

public signin:boolean;
  constructor(private sharedService:SharedService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.signin= this.sharedService.sharedvalue.signin;
  }
  ngDoCheck()
  {
  	this.signin=this.sharedService.sharedvalue.signin;
  	console.log(this.signin);
  }

  logout()
  {
  	console.log("click on the logout")
  	firebase.auth().signOut().then(()=>{
  	this.router.navigate([''], { relativeTo: this.route })
    this.sharedService.sharedvalue.signin=true;
    this.sharedService.sharedvalue.currentUser=null
}
)
  }

}
