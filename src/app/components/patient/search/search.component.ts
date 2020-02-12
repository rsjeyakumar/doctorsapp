import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodCartService } from '../../../services/food-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  loader: false;
  doctorsList;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public foodService: FoodCartService
  ) { }

  /*
  * @param
  * Get search form controll access
  */
 get search() { return this.searchForm.controls; }

  /*
   * @param Login Validate
   * Search Doctors form with credentials
   * @input specilization
   */
  searchDoctors() {
    if (this.searchForm.valid) {
      const specilization = this.searchForm.value.specialization;
      // tslint:disable-next-line: deprecation
      this.foodService.checkLogin(specilization).subscribe(res => {
        console.log(res);
        this.loader = false;
        },
       error => {
        this.loader = false;
      });
    }
  }
 /*
   * @param create form
   * Create form group object for login form
   */
  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      specialization: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createSearchForm();
  }

}
