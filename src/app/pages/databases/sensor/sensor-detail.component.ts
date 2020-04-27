import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Sensor } from '../../../models/sensor.model';
import { SensorService } from '../../../services/sensor.service';

@Component({
  selector: "app-database-sensor-detail",
  templateUrl: "sensor-detail.component.html"
})
export class SensorDetailComponent implements OnInit {
  
  sensor: Sensor;
  _id: string;

  sensorForm: any = {};
  loading = false;
  submitted = false;  

  constructor(        
    public route: ActivatedRoute,
    public router: Router,
    private sensorService: SensorService) {
  }



  ngOnInit() {

    this._id = this.route.snapshot.params['id'];
    this.sensor = this.sensorService.sensor;

    if (!this.sensor) {
      this.getSpecificSensor(this._id)
    } else {
      this.sensorForm = this.sensor;
    }

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

  getSpecificSensor(_id) {
    this.sensorService.getSensor(_id).subscribe(
      (data) => {
        this.sensor = data
      }, (error) => {

      }, () => {

      }
    )
  }

  onSubmit() {
    console.log(this.sensorForm);

    const formData = new FormData();
    formData.append('name', this.sensorForm.name);  
    formData.append('label', this.sensorForm.label);    

    this.sensorService.updateSensor(this._id,this.sensorForm).subscribe(
      (data: any) => {
        console.log(data);
        this.sensorService.sensor = data;
        this.sensor = this.sensorService.sensor;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.router.navigateByUrl('/databases/sensor')
      }
    )        
  }




}
