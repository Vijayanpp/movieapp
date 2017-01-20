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
  	  this.StartDatabaseQueries();
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
    this.sharedService.sharedvalue.signin=false;
    this.sharedService.sharedvalue.currentUser=null
}
)
  }


  StartDatabaseQueries() {
  // [START my_top_posts_query]
  // var myUserId = firebase.auth().currentUser.uid;
  var self=this;
  // var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
  // [END my_top_posts_query]
  // [START recent_posts_query]
  var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  // [END recent_posts_query]
  // var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

  var fetchPosts = function(postsRef) {
    postsRef.on('child_added', function(data) {
     console.log("k")
     console.log(data.val().title)
     
      // self.titleData=data.val().title || 'Anonymous';
          
    });
    postsRef.on('child_changed', function(data) {	
    	console.log('kkkkk')
		
    });
    postsRef.on('child_removed', function(data) {
    	
    });
  };

  // Fetching and displaying all posts of each sections.
  // fetchPosts(topUserPostsRef);
  fetchPosts(recentPostsRef);
  // fetchPosts(userPostsRef);

  // Keep track of all Firebase refs we are listening to.
  // this.listeningFirebaseRefs.push(topUserPostsRef);
  // this.listeningFirebaseRefs.push(recentPostsRef);
  // this.listeningFirebaseRefs.push(userPostsRef);
}


}
