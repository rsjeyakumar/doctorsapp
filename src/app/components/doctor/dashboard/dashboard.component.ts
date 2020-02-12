import { Component, OnInit } from '@angular/core';
import { FoodCartService } from '../../../services/food-cart.service';
import { PatentDetailsRes, PatentDetails, GetSlots, SlotList, Response } from 'src/app/models/models';

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
