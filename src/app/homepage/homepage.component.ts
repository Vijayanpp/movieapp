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
  public photo:string="../assets/images/munthiri.jpg";

public signin:boolean;
public upcomingmovies=[];
  constructor(private sharedService:SharedService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	  //   firebase.database().ref('users/administrator').set({
  //   username:'adbcd',
  //   email:'adbcdstaff@gmail.com'    
  // });
   this.StartDatabaseQueries();
  
  	
  }
  ngDoCheck()
  {
  	this.signin=this.sharedService.sharedvalue.signin;
  	console.log(this.signin);
  }

 
checkAuthState()
  {
     var self=this;
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
 
    self.StartDatabaseQueries();

  } else {
    
   

  }
});
  }

 LikethePost(postRef, uid) {
  
  postRef.transaction(function(post) {
    
    if (post) {
  
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }

   // postRef.on('value', function(snapshot) {

    

   // })


    return post;
  });
}

like(id)
{
 
   var uid = firebase.auth().currentUser.uid;
   console.log(firebase.auth().currentUser);
   var recentPostsRef = firebase.database().ref('posts/Movie/Mollywood/'+id);
   console.log(recentPostsRef)
   this.LikethePost(recentPostsRef,uid)
}
  StartDatabaseQueries() {
  // [START my_top_posts_query]
  // var myUserId = firebase.auth().currentUser.uid;
  var self=this;
  
  var recentPostsRef = firebase.database().ref('posts/Movie/Mollywood').limitToLast(100);
  

 
  var fetchPosts = function(postsRef) {
 postsRef.on('child_added', function(data) {
  
 var obj=data.val();

 obj.id=data.key;
 self.upcomingmovies.push(obj);
     // self.titleData=data.val().title || 'Anonymous';          
    });
    postsRef.on('child_changed', function(data) {	
  var object=data.val();
  object.id=data.key;
   
  var array= self.upcomingmovies.filter((obj,index)=>
  {
      if(obj.id==data.key)
        {
          self.upcomingmovies.splice(index,1,object);
        }
  })

		
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
