import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  display: boolean;
  slots = [
    { slotName: '10:00 AM', availablity: false },
    { slotName: '11:00 AM', availablity: false },
    { slotName: '12:00 AM', availablity: false },
    { slotName: '2:00 PM', availablity: false },
    { slotName: '3:00PM', availablity: false }
  ];
  // selectedSlot = [];
  constructor() { }

  ngOnInit() {


  }

  makeAvailable() {
    // console.log(this.slots);
    // this.selectedSlot = this.slots.filter(
    //   (res) => {
    //     return res.availablity === true;
    //   }
    // );
    // console.log(this.selectedSlot);
    this.display = false;
  }


  manageSlots() {
    this.display = true;
  }

}
