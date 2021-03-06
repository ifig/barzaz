import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PagerService } from '../services/pager.service';
import { Location } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})


export class ArtistComponent implements OnInit {
    constructor(private dataService:DataService, private pagerService: PagerService, private location: Location, private route: ActivatedRoute) {
    	this.route.params.subscribe( params => this.letter= params.id );
    	
		}

    // array of all items to be paged
    private allItems: any[];

    private size: number;

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    alphabet: any[];

    letter: string;


    ngOnInit() {
    		this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        this.getArtists(this.letter);
        this.setClickedRow(this.alphabet.indexOf(this.letter));
    }

		getArtists(letter: string) {
			this.location.go('/artists/' + letter);

	  	this.dataService.getArtists(letter).then((data) => {
				//console.log(data['result']);
	      this.allItems = data['result'];
	      this.size = data['paginate']['count'];

	      // initialize to page 1
	      this.setPage(1);
	  	})
		}


    setPage(page: number) {
        if (page < 1 /*|| page > this.pager.totalPages*/) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.size, page);

        // get current page of items
        //console.log(this.allItems);
        this.pagedItems = this.allItems;
    }

    setClickedRow = function(index){
      this.selectedRow = index;
  	}

}