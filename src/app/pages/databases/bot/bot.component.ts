import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox"
}

import { Bot } from '../../../models/bot.model';
import { BotService } from '../../../services/bot.service';

@Component({
  selector: "app-database-bot",
  templateUrl: "bot.component.html"
})
export class BotComponent implements OnInit {
  
  bots: Bot[];

  entries: number = 10;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [
    {'name': 'name'}
  ]
  SelectionType = SelectionType;

  constructor(        
    public router: Router,
    private botService: BotService) {
   

      this.temp = this.rows.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });

  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function(d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    
    this.moveTo(selected[0]['id']);

  }
  onActivate(event) {
    this.activeRow = event.row;
    
  }

  ngOnInit() {
    this.getAllBots();

    var navbar = document.getElementsByClassName("navbar-top")[0];
    navbar.classList.add("bg-secondary");
    navbar.classList.add("navbar-light");
    navbar.classList.remove("bg-danger");
    navbar.classList.remove("navbar-dark");

    var navbarSearch = document.getElementsByClassName("navbar-search")[0];
    navbarSearch.classList.add("navbar-search-dark");
    navbarSearch.classList.remove("navbar-search-light");    
      
  }

  ngOnDestroy() {
    var navbar = document.getElementsByClassName("navbar-top")[0];
    navbar.classList.remove("bg-secondary");
    navbar.classList.remove("navbar-light");
    navbar.classList.add("bg-danger");
    navbar.classList.add("navbar-dark");

    var navbarSearch = document.getElementsByClassName("navbar-search")[0];
    navbarSearch.classList.remove("navbar-search-dark");
    navbarSearch.classList.add("navbar-search-light");
  }  

  getAllBots() {
    this.botService.getBots().subscribe(
      (data) => {
        this.botService.bots = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.bots = this.botService.bots;
        this.temp = this.bots;
      }
    )    
  }

  moveTo(link) {

    if (link == 'new') {
      this.router.navigateByUrl('/databases/bot/new')
    } else {

      this.botService.bot = this.botService.bots.find(element => element.id == link)

      let url_string = '/databases/bot/' + link
      this.router.navigateByUrl(url_string)
    }

  }

}
