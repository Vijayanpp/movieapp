import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-addpostsample',
  templateUrl: './addpostsample.component.html',
  styleUrls: ['./addpostsample.component.css']
})
export class AddpostsampleComponent implements OnInit {
    public title;
	public message;
    private postForm: FormGroup;
    private listeningFirebaseRefs = [];
    private titleData;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  	this.postForm = this.fb.group({
        title: [this.title, [Validators.required, Validators.minLength(5)]],
        message: [this.message, [Validators.required, Validators.minLength(5)]]
       
      
    });

  }

  writeNewPost(uid, username, picture, title, body) {
  // A post entry.
 
  var postData = {
    author: username,
    uid: uid,
    body: body,
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
    var username = snapshot.val().username;   // [START_EXCLUDE]

    return self.writeNewPost(firebase.auth().currentUser.uid, username,
        firebase.auth().currentUser.photoURL,
        title, text);
    // [END_EXCLUDE]
  });
  // [END single_value_read]
};


submitPost(model) {
    
    var text =model.value.title;
    var title =model.value.message;
    console.log(text);
    console.log(title);
    if (text && title) {
      this.newPostForCurrentUser(title, text).then(function() {
      // console.log("posted");
      });
      this.title= '';
     this.message = '';
    }
  };


}
