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

import { Bill } from '../../../models/bill.model';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: "app-database-bill",
  templateUrl: "bill.component.html"
})
export class BillComponent implements OnInit {
  
  bills: Bill[];

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
    private billService: BillService) {
   

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
    this.getAllBills();

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

  getAllBills() {
    this.billService.getBills().subscribe(
      (data) => {
        this.billService.bills = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.bills = this.billService.bills;
        this.temp = this.bills;
      }
    )    
  }

  moveTo(link) {

    if (link == 'new') {
      this.router.navigateByUrl('/databases/bill/new')
    } else {

      this.billService.bill = this.billService.bills.find(element => element.id == link)

      let url_string = '/databases/bill/' + link
      this.router.navigateByUrl(url_string)
    }

  }

}
