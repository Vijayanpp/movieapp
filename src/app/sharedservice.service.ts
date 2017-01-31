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
  RatethePost(postRef,count,currentRating,newRating,uid)
  {
     postRef.transaction(function(post) {
       
      if(post)
      {
      if(post.ratingsByUser&&post.ratingsByUser[uid])
      {
  
  let newcount=parseInt(count)
  let rating=(currentRating- post.ratingsByUser[uid]['rating']+newRating)/newcount;
  post.rating=rating.toFixed(2);
   post.ratingsByUser[uid]['rating']=post.rating;
      }
      else
      {
  
  let newcount=parseInt(count)+1;
  let rating=(currentRating+newRating)/newcount;
  post.rating=rating.toFixed(2);
  if (!post.ratingsByUser) {
          post.ratingsByUser = {};
        }
        post.ratingsByUser[uid] ={};
        post.ratingsByUser[uid]['rating']=post.rating;

      }
      }
      return post;
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


