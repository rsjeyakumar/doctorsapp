import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodCartService {
  apiURL = 'http://10.117.189.227:8085';
  showAlert;
  loginAPI = `${this.apiURL}/DigiHealth/login`;
  searchAPI = `${this.apiURL}/digidb/patients`;
  appointmentAPI = '';
  slotAPI = `http://10.117.189.38:8585/digiHealth/doctors`;



  constructor(private http: HttpClient) {
  }

  /* Http Headers */
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  /*
  * @param data
  * Validate Login API
  * POST Method
  * Type Object
  */
  checkLogin(data): Observable<any> {
    return this.http.post(this.loginAPI, data, this.httpOptions).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

   /*
  * @param data
  * Search Doctors
  * Get Method
  */
 searchDoctor(specilization: string): Observable<any> {
  return this.http.get(this.searchAPI + '/' + specilization).pipe(
    catchError(this.errorHandler.bind(this))
  );
}

/*
  * @param data
  * Patient Appointment API
  * POST Method
  * Type Object
  */
 bookAppointment(data): Observable<any> {
  return this.http.post(this.appointmentAPI, data, this.httpOptions).pipe(
    catchError(this.errorHandler.bind(this))
  );
}

/*
  * @param data
  * Ger Slot for Patients
  * Get Method
  */
 getSlots(doctorId: number): Observable<any> {
  return this.http.get(this.slotAPI + '/' + doctorId + '/' + 'slots').pipe(
    catchError(this.errorHandler.bind(this))
  );
}



  /*
     * @param error
     * Error Handling
     */
  private errorHandler(error) {
    let errorMessage = '';
    this.showAlert = {};
    if (error.error instanceof ErrorEvent) {
      /* Get client-side error */
      errorMessage = error.error.message;
    } else {
      /* Get server-side error */
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(error.error.message);
    this.showAlert = this.modalConfig(error.error.message ? error.error.message : 'Network Error', true);
    return throwError(errorMessage);
  }
  /*
   * @param No Param
   * Check user is valid or not
   * Type boolean
   */
  public validUser() {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * @param message, modal
   * Set Modal Properties
   */
  public modalConfig(mesg, modal) {
    return {
      // header: head,
      message: mesg,
      modalShow: modal
    };
  }
}
