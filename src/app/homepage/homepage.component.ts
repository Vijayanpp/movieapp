import { Component, OnInit } from '@angular/core';
import { SharedService} from '../sharedservice.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as Firebase from 'firebase';
declare var FB:any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 public signin:boolean;
public upcomingmovies=[];
public sarsstatus:boolean=false;
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
    
   if(firebase.auth().currentUser!=null)
   {
    var uid = firebase.auth().currentUser.uid;
    var recentPostsRef = firebase.database().ref('posts/Music/'+this.sharedService.sharedvalue.category+'/'+id);
    this.sharedService.LikethePost(recentPostsRef,uid);  
   }
   else
   {
     this.router.navigate(['login']);
   }
}


  StartDatabaseQueries(category) {
  // [START my_top_posts_query]
  // var myUserId = firebase.auth().currentUser.uid;
  var self=this;
  this.sharedService.sharedvalue.category=category;
  self.upcomingmovies=[];
  
  var recentPostsRef = firebase.database().ref('posts/Movie/'+category).limitToLast(10);
  console.log(recentPostsRef);
  var fetchPosts = function(postsRef) {
    console.log("keri")
  postsRef.on('child_added', function(data) {
    console.log("kitty")
 var obj=data.val();
 obj.id=data.key; 
 self.upcomingmovies.push(obj);
 console.log(obj)
     
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
share()
  {
    console.log('share');
      FB.ui({
    method: 'share',
    display: 'popup',
    href: 'https://developers.facebook.com/docs/',
  }, function(response){});
}

}
