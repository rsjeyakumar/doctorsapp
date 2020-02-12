import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FoodCartService } from '../../../services/food-cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let api: FoodCartService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockUserService = {
    modalConfig: () => ({
      message: '',
      modalShow: ''
    }),
    searchDoctor(specilization: string) {
      return of({
        statusCode: 200,
        message: 'List of Details',
        doctorDetails:
        [{
          doctorId: 1,
          doctorName: 'Rabeek',
          specialization: 'physician',
          qualification: 'MBBS',
          mobileNumber: '987654321',
          hospitalName: 'BGS'
        }]
      });
    },
    bookAppointment(data: object) {
      return of({
        statusCode: 200,
        message: 'success'
      });
    },
    getSlots(doctorId: number) {
      return of({
        statusCode: 200,
        message: 'Slots retrieved successfully',
        slotDetails:
        [{
          slotName: 'Rabeek',
          status: 'Available'
        }]
      });
    }
  };
  // create new instance of FormBuilder
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [SharedModule, PrimengModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: FoodCartService, useValue: mockUserService
        },
        { provide: FormBuilder, useValue: formBuilder },
        {
          provide: Router, useValue: mockRouter
        }
      ]
    })
    .compileComponents();
    api = TestBed.get(FoodCartService);
    mockRouter = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check ngOnInit Valid User and form creation', () => {
    component.ngOnInit();
    component.createSearchForm();
    component.createBookingForm();
    component.searchForm = formBuilder.group({
      specialization: ['', Validators.required]
    });
    component.appointmentForm = formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      slot: ['', Validators.required]
    });
    expect(component.searchForm.valid).toBeFalsy();
    expect(component.appointmentForm.valid).toBeFalsy();
  });

  it('should enable booking appointment form', () => {
    component.appointment = true;
    component.doctorId = 12;
  });

  it('should get all slots for particular doctor', () => {
    component.loader = true;
    const doctorId = 12;
    component.getAppointmentSlot();
    expect(api.getSlots(doctorId)).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });

  it('should submit new appointment', () => {
    const postObj = {
      patientName: component.appointmentForm.controls.name.setValue('rabeek'),
      patientContact: component.appointmentForm.controls.mobile.setValue('rabeek'),
      doctorId: 12,
      slotId: component.appointmentForm.controls.slot.setValue('10.00 AM'),
    };
    component.submitAppointment();
    expect(api.bookAppointment(postObj)).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });

  it('should search doctors', () => {
    component.searchDoctors();
    expect(api.searchDoctor('physician')).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });

});
