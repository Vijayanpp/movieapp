import { Component, OnInit } from '@angular/core';
import * as Firebase from 'firebase';
import { ActivatedRoute,Router } from '@angular/router';
import { SharedService} from '../sharedservice.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private route: ActivatedRoute,private sharedService:SharedService) { }

  ngOnInit() {
  }

  login()
{
var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(user=>
 {
 	console.log("login")
    this.router.navigate([''], { relativeTo: this.route })
    this.sharedService.sharedvalue.signin=true;
    this.sharedService.sharedvalue.currentUser=user;

 }).catch((error) => {
     console.error("login error");
    });

};

}
