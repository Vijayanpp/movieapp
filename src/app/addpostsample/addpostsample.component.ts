import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-addpostsample',
  templateUrl: './addpostsample.component.html',
  styleUrls: ['./addpostsample.component.css']
})
export class AddpostsampleComponent implements OnInit {
    public imagepath;
	public title;
    private postForm: FormGroup;
    private listeningFirebaseRefs = [];
    private titleData;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  	this.postForm = this.fb.group({
        title: [this.title, [Validators.required, Validators.minLength(5)]],
        imagepath: [this.imagepath, [Validators.required, Validators.minLength(5)]]
       
      
    });

    //  firebase.database().ref().remove();

  }

  writeNewPost(uid, username, picture, title,imagepath) {
  // A post entry.
 
  var postData = {
    author: username,
    uid: uid,
    imagepath:imagepath,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
};

newPostForCurrentUser(title, text) {
  // [START single_value_read]
  var self=this
  var userId = firebase.auth().currentUser.uid;
   return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
     console.log(snapshot.val()+"hi")
    // var username = snapshot.val().username; 
    

    // return self.writeNewPost(firebase.auth().currentUser.uid, username,
    //     firebase.auth().currentUser.photoURL,
    //     title, text);
    // [END_EXCLUDE]
  });
  // [END single_value_read]
};


submitPost(model) {
    
    var title =model.value.title;
    var img=model.value.imagepath;
   console.log("posin started")
    if (title &&img) {
      this.newPostForCurrentUser(title, img).then(function() {
      console.log("posted");
      });
      this.imagepath= '';
     this.title = '';
    }
  };


}
