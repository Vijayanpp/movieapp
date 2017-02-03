import { Component, OnInit } from '@angular/core';
import {SharedService} from '../sharedservice.service';

@Component({
  selector: 'app-newspage',
  templateUrl: './newspage.component.html',
  styleUrls: ['./newspage.component.css']
})
export class NewspageComponent implements OnInit {

  constructor(private sharedService:SharedService) { }
  private mainnews

  ngOnInit() {
  	this.fetchData("https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=3e22f2fcc1344975ae2b2e69379e2a6e");
  }
  fetchData(url)
  {
  	this.sharedService.searchNews(url).subscribe(news=>
   {

   	this.mainnews=news.articles;
   	console.log(this.mainnews);


   })
   }
  

}
