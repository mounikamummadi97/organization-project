import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { UserDataServiceComponent } from '../user-data-service/user-data-service.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formData: { username: string, password: string } = { username: '', password: '' };
  userDetails: any;
  registerId: any;
  imagesFromDb : any;

  constructor(private service: MainService,
    private router: Router,
    private userService: UserDataServiceComponent) { }

  
  ngOnInit() {
    debugger;
    this.userData()
  }

  userData(){
    debugger;
    this.registerId = this.userService.registerId;
    this.userDetails = this.userService.userDetails;
  }

  

  Mycart(){
    debugger;
    this.router.navigate(['./cart']);
  }

  products(){
    debugger;
    this.router.navigate(['./product']);
  }

}
