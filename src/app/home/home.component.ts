import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';


import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {ElementRef} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any[];


  public query = '';

  public filteredList = [];
  public elementRef;

  filter() {

    if (this.query !== "") {
      this.dataService.autocomplete(this.query).then((result) => {
        this.filteredList = [];
        console.log(result);

        for (var i = 0 ; i < result['hits']['hits'].length; i ++) {

          var content = result['hits']['hits'][i]._source.title;
          this.filteredList.push(content)
        }

      })
    } else {
      this.filteredList = [];
    }
  }
   
  select(item){
      this.query = item;
      this.filteredList = [];
  }


  constructor(private router: Router, private dataService:DataService, myElement: ElementRef) {
    this.elementRef = myElement;
  }


  ngOnInit() {
  	this.getLatestSongs();
  }

  searchItem(term:string, type:string) {
  	console.log('term : ' + term + ' , type : ' + type);
    
    this.router.navigate(['/search'], { queryParams: {term:term, type:type} });
  }


  getLatestSongs() {


  	this.dataService.getLatestSongs().then((result) => {

  		this.items = [];

  		var title, artist;

  		for (var i = 0 ; i < result['hits']['hits'].length ; i++) {
  			title = result['hits']['hits'][i]._source.title;
  			artist = result['hits']['hits'][i]._source.artist;
  			this.items.push({title : title, artist : artist})
  		}
  		
  	});
  	 
  }



	


}
