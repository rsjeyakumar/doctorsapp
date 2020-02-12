import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FoodCartService } from '../../../services/food-cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [SharedModule, PrimengModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    sessionStorage.setItem('currentUser', JSON.stringify({ statusCode: 200, doctorId: 101, doctorName: 'Raghib' }));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.slots = [
      { slotName: '10:00 AM', availablity: false },
      { slotName: '11:00 AM', availablity: false },
      { slotName: '12:00 AM', availablity: false },
      { slotName: '2:00 PM', availablity: false },
      { slotName: '3:00 PM', availablity: false }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
