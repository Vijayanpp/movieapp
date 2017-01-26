import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  public sharedvalue={signin:false,currentUser:null,category:"Mollywood",type:"Movie"}
  constructor() { }

  updatetheViewCount(postref)
  {
    postref.transaction(function(post)
    {
   post.views++;
    })
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
}


