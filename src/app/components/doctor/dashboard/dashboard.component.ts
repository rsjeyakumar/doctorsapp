import { Component, OnInit } from '@angular/core';
import { FoodCartService } from '../../../services/food-cart.service';
import { PatentDetailsRes, PatentDetails, GetSlots, SlotList, Response } from 'src/app/models/models';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  display: boolean;
  slots: SlotList[] = [
    { slotName: '10:00 AM', availablity: false },
    { slotName: '11:00 AM', availablity: false },
    { slotName: '12:00 AM', availablity: false },
    { slotName: '2:00 PM', availablity: false },
    { slotName: '3:00 PM', availablity: false }
  ];
  doctorId: number;
  patientDeatils: PatentDetails[];
  constructor(private http: FoodCartService) { }

  ngOnInit() {
    this.doctorId = JSON.parse(sessionStorage.getItem('currentUser')).doctorId;
    this.getPatientDetails();
  }

  makeAvailable() {
    const selectedSlots = {
      selectedslots: this.slots
    };
    this.http.postSlots(this.doctorId, selectedSlots).subscribe(
      (res: Response) => {
        this.display = false;
        Swal.fire({
          text: 'Slot booked successfully',
          // tslint:disable-next-line: max-line-length
          imageUrl: 'https://banner2.cleanpng.com/20180601/ush/kisspng-stranahan-theater-booked-cinema-maumee-indoor-thea-fully-booked-5b119c0285c691.372962371527880706548.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        });
      }
    );

  }


  manageSlots() {
    this.display = true;
    this.getDoctorSlots();
  }

  getPatientDetails() {
    this.http.getPatients(this.doctorId).subscribe(
      (res: PatentDetailsRes) => {
        this.patientDeatils = res.patientDetails;
      }
    );
  }

  getDoctorSlots() {
    this.http.getSlots(this.doctorId).subscribe(
      (res: GetSlots) => {
        if (res.statusCode === 200) {
          this.slots = res.slotDetails;
        }

      }
    );
  }


}
