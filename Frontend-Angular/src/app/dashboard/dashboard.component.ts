// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationMenu, AuthService, Role } from '../auth.service';
import { Staff } from '../staff.model'; 
import { Company } from '../company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
updateCompany() {
throw new Error('Method not implemented.');
}
  selectedApplication: any;
  staffForm: FormGroup;
  selectedMenu: string = 'applicationDetails';
  menuItems: ApplicationMenu[] = [];
  roles: Role[] = []; 
  roleId: any;//number | null = null; // Dynamic roleId
  staffList: Staff[] = [];
  
  id:any;
  companyList:Company[]=[];
  isAddingStaff: boolean = false;
  isAddingCompany: boolean = false;
  isEditingCompany: boolean = false;
  editingCompanyId: number | null = null;
  companyForm: any;
  

  constructor(private fb: FormBuilder, private authService: AuthService,private snackBar: MatSnackBar, private router : Router) {
    const now = new Date().toISOString();
    this.staffForm = this.fb.group({
      id: [{ value:'' }],//disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: [''],
      mobile: [''],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      roleId: [{ value: Number.parseInt}, Validators.required],
      createdDate:[now],
      updatedDate:[now]

    });
    this.companyForm = this.fb.group({
      id:[{ value:'' }],
      name: ['', Validators.required],
      description: [''],
      code: [''],
      email: [''],
      address: [''],
      website: [''],
      createdBy:[''],
      updatedBy:[''],
      updatedDate:[''],
      createddate:[''],
    });
  }
  ngOnInit(): void {
    this.loadRoleId();
    this.loadRoles();
  }

  loadRoleId(): void {
    const userDetails = sessionStorage.getItem('userDetails');
    if (userDetails) {
      const parsedUserDetails = JSON.parse(userDetails);
      this.roleId = parsedUserDetails.roleId; 
      this.loadMenuItems();
    } else {
      console.error('No user details found in session storage');
    }
  }

  loadStaff(): void {
    this.authService.getStaff().subscribe({
      next: staff => this.staffList = staff,
      error: err => console.error('Error loading staff:', err)
    });
  }

  loadRoles(): void {
    this.authService.getRoles().subscribe({
      next: roles => {
        this.roles = roles;
        console.log('Roles loaded:', this.roles);
      },
      error: err => console.error('Error loading roles:', err)
    });
  }

  loadMenuItems(): void {
    if (this.roleId !== null) { // Ensure roleId is valid
      this.authService.getMenuItemsByRole(this.roleId).subscribe({
        next: menus => {
          this.menuItems = menus;
          console.log('Menu items loaded:', this.menuItems);
        },
        error: err => console.error('Error loading menu items:', err)
      });
    } else {
      console.error('Role ID is not defined');
    }
  }
  
  // selectApplication(item: any) {
  //   this.selectedApplication = item;
  //   this.selectedMenu = item.name === 'Staff Creation' ? 'staffManagement' : 'applicationDetails';
    
  //   if (this.selectedMenu === 'staffManagement') {
  //     this.loadStaff();
  //   }
  //   this.selectedMenu=item.name==='Company'?'companyManagement':'applicationDetails';
  //   if(this.selectedMenu === 'Company'){this.loadCompany();}
  // }
  selectApplication(item: any) {
    // Set the selected application
    this.selectedApplication = item;
  
    // Determine which menu to display
    if (item.name === 'Staff Creation') {
      this.selectedMenu = 'staffManagement';
      this.loadStaff(); // Load staff data if 'Staff Creation' is selected
    } else if (item.name === 'Company') {
      this.selectedMenu = 'companyManagement';
      console.log("Company button clicked");
      this.router.navigate(['company']);
      
      //this.loadCompany(); // Load company data if 'Company' is selected
    } else {
      this.selectedMenu = 'applicationDetails'; // Default to application details for other items
    }
  }
  


  goBack() {
    this.selectedMenu = 'applicationDetails';
    this.isAddingStaff = false;
    this.staffForm.reset();
    this.companyForm.reset();
  }

  addStaff() {
    this.isAddingStaff = true;
    this.staffForm.reset();
  }

  cancelAddStaff() {
    this.isAddingStaff = false;
    this.staffForm.reset();
  }

  saveNewStaff() {
    if (this.staffForm.valid) {
      debugger
      const now = new Date().toISOString();
      const idValue = this.staffForm.get('id')?.value;
      const staff: Staff = {
        id:idValue ? parseInt(idValue) : 0,
        firstName: this.staffForm.get('firstName')?.value,
        lastName: this.staffForm.get('lastName')?.value,
         roleName: " ",
        mobile: this.staffForm.get('mobile')?.value,
        userName: this.staffForm.get('userName')?.value,
        password: this.staffForm.get('password')?.value,
        roleId: parseInt(this.staffForm.get('roleId')?.value),
        createdBy: this.staffForm.get('userName')?.value,
        createdDate:now, 
        updatedBy:this.staffForm.get('userName')?.value, 
        updatedDate: now
      };
      if (staff.id) {
        // If ID is present, update the existing staff
        this.authService.addStaff(staff).subscribe({
          next: () => {
            this.loadStaff();
            this.snackBar.open('Staff updated successfully!', 'Close', {
              duration: 3000, 
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.isAddingStaff = false;
            this.staffForm.reset();
          },
          error: err => console.error('Error updating staff:', err)
        });
      } else {

      this.authService.addStaff(staff).subscribe({
        
        next: () => {
          
           this.loadStaff();
           this.snackBar.open('Staff saved successfully!', 'Close', {
            duration: 3000, 
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.isAddingStaff = true;
          this.staffForm.reset();
        },
        error: err => console.error('Error adding staff:', err)
      });
    } 
  }else {
      console.error('Form is not valid');
    }
  }

  editStaff(staff: Staff) {
    
    this.staffForm.patchValue(staff);
    this.isAddingStaff = true;
  }

  deleteStaff(staff: Staff) {
    if (staff.id != null) {
      this.authService.deleteStaff(staff.id).subscribe({
        next: () => this.loadStaff(),
        error: err => console.error('Error deleting staff:', err)
      });
    } else {
      console.error('Staff ID is undefined or null');
    }
  }

  // addCompany(): void {
  //   this.isAddingCompany = true;
  //   //this.isEditingCompany = false;
  //   this.companyForm.reset();
  // }
  // loadCompany(): void {
  //   this.authService.getAllCompanies().subscribe({
  //     next: staff => this.companyList = staff,
  //     error: err => console.error('Error loading staff:', err)
  //   });
  // }

  
  // editCompany(company: Company): void {
  //   this.isEditingCompany = true;
  //   this.isAddingCompany = false;
  //   this.companyForm.patchValue(company);
  //   this.editingCompanyId = company.id;
  // }

  // saveNewCompany(): void {
  //   if (this.companyForm.valid) {
  //     const now = new Date().toISOString();
  //     const idValue = this.companyForm.get('id')?.value;
  //     const company: Company = {
  //       id: idValue ? parseInt(idValue) : 0,
  //       name: this.companyForm.get('name')?.value,
  //       description: this.companyForm.get('description')?.value,
  //       code: this.companyForm.get('code')?.value,
  //       email: this.companyForm.get('email')?.value,
  //       address: this.companyForm.get('address')?.value,
  //       website: this.companyForm.get('website')?.value,
  //       createdBy: '',
  //       createdDate: '',
  //       updatedBy: '',
  //       updatedDate: ''
  //     };

  //     if (company.id) {
  //       // If ID is present, update the existing company
  //       this.authService.updateCompany(company.id, company).subscribe({
  //         next: () => {
  //           this.loadCompany();
  //           this.snackBar.open('Company updated successfully!', 'Close', {
  //             duration: 3000,
  //             horizontalPosition: 'right',
  //             verticalPosition: 'top'
  //           });
  //           this.isAddingCompany = false;
  //           this.companyForm.reset();
  //         },
  //         error: err => console.error('Error updating company:', err)
  //       });
  //     } else {
  //       // If ID is not present, add a new company
  //       this.authService.createCompany(company).subscribe({
  //         next: () => {
  //           this.loadCompany();
  //           this.snackBar.open('Company saved successfully!', 'Close', {
  //             duration: 3000,
  //             horizontalPosition: 'right',
  //             verticalPosition: 'top'
  //           });
  //           this.isAddingCompany = false;
  //           this.companyForm.reset();
  //         },
  //         error: err => console.error('Error adding company:', err)
  //       });
  //     }
  //   } else {
  //     console.error('Form is not valid');
  //   }
  // }

  // deleteCompany(company: Company) {
  //   if (company.id != null) {
  //     this.authService.deleteCompany(company.id).subscribe({
  //       next: () => this.loadCompany(),
  //       error: err => console.error('Error deleting company:', err)
  //     });
  //   } else {
  //     console.error('Company ID is undefined or null');
  //   }
  // }

  // cancelAddCompany(): void {
  //   this.isAddingCompany = false;
  //   this.isEditingCompany = false;
  // }

  
}
