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
});
