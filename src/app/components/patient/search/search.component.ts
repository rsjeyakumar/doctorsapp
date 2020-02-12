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
  doctorId: number;
  hospitalName: string;
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
      // const element = document.querySelector('#post-container');
      // element.scrollIntoView({ behavior: 'smooth', block: 'end'});
      const specilization = this.searchForm.value.specialization;
      // tslint:disable-next-line: deprecation
      this.foodService.searchDoctor(specilization).subscribe(res => {
        console.log(res);
        if (res.doctorDetails !== '') {
          this.doctorsList = res.doctorDetails;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Doctors Found'
          });
        }

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
        doctorId: this.doctorId,
        slotName: this.appointmentForm.value.slot,
        hospitalName: this.hospitalName
      };
      this.foodService.bookAppointment(postObj).subscribe(res => {
        console.log(res);
        this.loader = false;
        this.appointment = false;
        Swal.fire({
          text: 'Appointment has been booked successfully',
          // tslint:disable-next-line: max-line-length
          imageUrl: 'https://banner2.cleanpng.com/20180601/ush/kisspng-stranahan-theater-booked-cinema-maumee-indoor-thea-fully-booked-5b119c0285c691.372962371527880706548.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        });
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
    const doctorId = this.doctorId;
    this.foodService.getSlots(doctorId).subscribe(res => {
      console.log(res);
      this.loader = false;

      this.slotList = res.slotDetails.filter(
        (res) => {
          return res.availablity === true;
        }
      );

    },
      error => {
        this.loader = false;
      });
  }

  bookAppointment(doctorId, hospitalName) {
    this.appointment = true;
    this.doctorId = doctorId;
    this.hospitalName = hospitalName;
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
