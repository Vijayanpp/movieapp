import { Component, OnInit } from '@angular/core';
import { SharedService} from '../sharedservice.service'
import { ActivatedRoute,Router } from '@angular/router';
import * as Firebase from 'firebase';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

 public signin:boolean;
public upcomingmovies=[];
  constructor(private sharedService:SharedService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	  //   firebase.database().ref('users/administrator').set({
  //   username:'adbcd',
  //   email:'adbcdstaff@gmail.com'    
  // });
   this.StartDatabaseQueries(this.sharedService.sharedvalue.category);
  
  	
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
 
    self.StartDatabaseQueries(this.sharedService.sharedvalue.category);

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
   var recentPostsRef = firebase.database().ref('posts/Movie/'+this.sharedService.sharedvalue.category+'/'+id);
   console.log(recentPostsRef)
   this.LikethePost(recentPostsRef,uid)
}
  StartDatabaseQueries(category) {
  // [START my_top_posts_query]
  // var myUserId = firebase.auth().currentUser.uid;
  var self=this;
  this.sharedService.sharedvalue.category=category;
  self.upcomingmovies=[];
  console.log(category)
  console.log("array cleared")
  var recentPostsRef = firebase.database().ref('posts/Movie/'+category).limitToLast(100);
  console.log('hi')

 
  var fetchPosts = function(postsRef) {
 postsRef.on('child_added', function(data) {
  
 var obj=data.val();

 obj.id=data.key;
  
  console.log('hhi')
 self.upcomingmovies.push(obj);
 console.log(obj);
 console.log("array populated")
     // self.titleData=data.val().title || 'Anonymous';
     console.log("pp")      
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

setCurrentCategory(category:string)
{
  this.sharedService.sharedvalue.category=category;
  console.log(category);
}
adbcd(category:string)
{
this.StartDatabaseQueries(category);
console.log('kkk')
}



}
