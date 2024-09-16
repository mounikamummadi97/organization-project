import { Component, OnInit } from '@angular/core';
import { UserDataServiceComponent } from './user-data-service/user-data-service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Application';
  isLoggedIn = false;

  ngOnInit(): void {
    this.Decide();
  }

  RegisterId: any;

  constructor(private userService : UserDataServiceComponent) {}

  Decide(){
    
    this.RegisterId = this.userService.registerId;
    if(this.RegisterId == null || this.RegisterId == undefined){
      this.isLoggedIn = false;
    }
    else{
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.clear();
    console.log('Logout');
    this.isLoggedIn = false;
  }

}
