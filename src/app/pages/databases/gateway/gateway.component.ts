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

import { Gateway } from '../../../models/gateway.model';
import { GatewayService } from '../../../services/gateway.service';

@Component({
  selector: "app-database-gateway",
  templateUrl: "gateway.component.html"
})
export class GatewayComponent implements OnInit {
  
  gateways: Gateway[];

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
    private gatewayService: GatewayService) {
   

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
    this.getAllGateways();

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

  getAllGateways() {
    this.gatewayService.getGateways().subscribe(
      (data) => {
        this.gatewayService.gateways = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.gateways = this.gatewayService.gateways;
        this.temp = this.gateways;
      }
    )    
  }

  moveTo(link) {

    if (link == 'new') {
      this.router.navigateByUrl('/databases/gateway/new')
    } else {

      this.gatewayService.gateway = this.gatewayService.gateways.find(element => element.id == link)

      let url_string = '/databases/gateway/' + link
      this.router.navigateByUrl(url_string)
    }

  }

}
