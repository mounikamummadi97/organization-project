import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-user-data-service',
  templateUrl: './user-data-service.component.html',
  styleUrls: ['./user-data-service.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class UserDataServiceComponent {

  userDetails: any;
  registerId: any;

  constructor(){
    this.retrieveDataFromStorage();
  }

  setUserData(userDetails: any, registerId: any) {
    this.userDetails = userDetails;
    this.registerId = registerId;


    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    localStorage.setItem('registerId', registerId);
  }

  retrieveDataFromStorage() {
    const storedUserDetails = localStorage.getItem('userDetails');
    const storedRegisterId = localStorage.getItem('registerId');

    if (storedUserDetails && storedRegisterId) {
      this.userDetails = JSON.parse(storedUserDetails);
      this.registerId = storedRegisterId;
    }
  }

}


