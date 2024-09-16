import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { UserDataServiceComponent } from '../user-data-service/user-data-service.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData: { username: string, password: string } = { username: '', password: '' };
  userDetails: any;

  constructor(
    private service: MainService,
    private router: Router,
    private userDataService: UserDataServiceComponent
  ) { }

  login() {
  
    const credentials = {
      UserName: this.formData.username,
      Password: this.formData.password
    };

    this.service.login(credentials).pipe(
      tap(response => {
        if (response && response.id) {
          debugger
          sessionStorage.setItem('userDetails', JSON.stringify(response));
          this.router.navigateByUrl('/dashboard');
        }
      }),
      catchError(error => {
        
        console.error('Login failed:', error);
       
        return of(null); 
      })
    ).subscribe();
  }
}
