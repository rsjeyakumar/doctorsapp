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
  appointmentForm: FormGroup;
  loader = false;
  appointment = false;
  doctorsList;
  slotList;
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
  * @param
  * Get search form controll access
  */
 get booking() { return this.appointmentForm.controls; }

  /*
   * @param
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
   * @param
   * Book Appointment
   * @input specilization
   */
  submitAppointment() {
    if (this.appointmentForm.valid) {
      const postObj = {
        patientName: this.appointmentForm.value.name,
        patientContact: this.appointmentForm.value.mobile,
        doctorId: 12,
        slotId: this.appointmentForm.value.slot
      };
      this.foodService.bookAppointment(postObj).subscribe(res => {
        console.log(res);
        this.loader = false;
        },
       error => {
        this.loader = false;
      });
    }
  }

   /*
   * @param
   * Get Slot for Appointment
   * @input doctorId
   */

   getAppointmentSlot() {
    this.loader = true;
    const doctorId = 12;
    this.foodService.getSlots(doctorId).subscribe(res => {
      console.log(res);
      this.loader = false;
      this.slotList = res;
    },
      error => {
        this.loader = false;
      });
   }

  bookAppointment() {
    this.appointment = true;
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
  /*
   * @param create form
   * Create form group object for login form
   */
  createBookingForm() {
    this.appointmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      slot: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.createSearchForm();
    this.createBookingForm();
  }

}