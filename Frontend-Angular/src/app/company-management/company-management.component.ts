// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationMenu, AuthService, Role } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Company } from '../company.model';
import { Router } from '@angular/router'; 
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.css']
})
export class companyManagementComponent implements OnInit {
  
  navigateTo(route: string): void {
    this.router.navigate([DashboardComponent]);
  }
  selectedApplication: any;
  selectedMenu: string = 'applicationDetails';
  menuItems: ApplicationMenu[] = [];
  roles: Role[] = []; 
  roleId: any;//number | null = null; 
  id:any;
  companyList:Company[]=[];
  isAddingStaff: boolean = false;
  isAddingCompany: boolean = false;
  isEditingCompany: boolean = false;
  editingCompanyId: number | null = null;
  companyForm: any;
  constructor(private fb: FormBuilder, private authService: AuthService,private snackBar: MatSnackBar,private router: Router ) {
    const now = new Date().toISOString();
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
      updatedDate:[now],
      createddate:[now],
    });
  }
  ngOnInit(): void {
    this.loadRoleId();
    this.loadRoles();
    this.loadCompany();
  }
  navigate(route: string): void {
    this.router.navigate([route]);  // Use this.router.navigate
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
  selectApplication(item: any) {
    this.selectedApplication = item;
     if (item.name === 'Company') {
      this.selectedMenu = 'companyManagement';
      this.loadCompany(); 
    } else {
      this.selectedMenu = 'applicationDetails'; 
    }
  }
  goBack(): void {
    this.selectedMenu = 'applicationDetails';
    this.isAddingCompany = false;
    this.isEditingCompany = false;
    this.companyForm.reset();
    this.router.navigate(['dashboard']);
  }
  addCompany(): void {
    this.isAddingCompany = true;
    //this.isEditingCompany = false;
    this.companyForm.reset();
  }
  cancelAddCompany(): void {
    this.isAddingCompany = false;
    this.companyForm.reset();
  }
  loadCompany(): void {
    this.authService.getAllCompanies().subscribe({
      next: company => this.companyList = company,
      error: err => console.error('Error loading staff:', err)
    });
  }
  editCompany(company: Company): void {
    this.isEditingCompany = true;
    this.isAddingCompany = false;
    this.companyForm.patchValue(company);
    this.editingCompanyId = company.id;
  }
  saveNewCompany(): void {
    if (this.companyForm.valid) {
      const now = new Date().toISOString();
      const idValue = this.companyForm.get('id')?.value;
      const company: Company = {
        id: idValue ? parseInt(idValue) : 0,
        name: this.companyForm.get('name')?.value,
        description: this.companyForm.get('description')?.value,
        code: this.companyForm.get('code')?.value,
        email: this.companyForm.get('email')?.value,
        address: this.companyForm.get('address')?.value,
        website: this.companyForm.get('website')?.value,
        createdBy: this.companyForm.get('createdBy')?.value,
        createdDate: now,
        updatedBy: this.companyForm.get('updatedBy')?.value,
        updatedDate: now
      };
      if (company.id) {
        // If ID is present, update the existing company
        this.authService.addCompany( company).subscribe({
          next: () => {
            this.loadCompany();
            this.snackBar.open('Company updated successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.isAddingCompany = false;
            this.companyForm.reset();
          },
          error: err => console.error('Error updating company:', err)
        });
      } else {
        // If ID is not present, add a new company
        this.authService.addCompany(company).subscribe({
          next: () => {
            this.loadCompany();
            this.snackBar.open('Company saved successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
            this.isAddingCompany = false;
            this.companyForm.reset();
          },
          error: err => console.error('Error adding company:', err)
        });
      }
    } else {
      console.error('Form is not valid');
    }
  }
  deleteCompany(company: Company) {
    if (company.id != null) {
      this.authService.deleteCompany(company.id).subscribe({
        next: () => this.loadCompany(),
        error: err => console.error('Error deleting company:', err)
      });
    } else {
      console.error('Company ID is undefined or null');
    }
  }  
}
