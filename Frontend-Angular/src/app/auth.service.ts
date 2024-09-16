import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Staff } from './staff.model';
import { Company } from './company.model';
// Define the interface for ApplicationMenu

export interface ApplicationMenu {
  id: number;
  name: string;
  description: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  roleId: number;
}
export interface Role {
value: any;
label: any;
id: number;
name: string;
}
export interface RolesApiResponse {
  result: Role[];
  id: number;
  exception: any;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getApplicationMenus(roleId: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'https://localhost:44300/api'; // Base URL for API
  private createUserApiUrl = `${this.baseUrl}/LoginDetails/Create`; // URL to create a user
  private readonly applicationMenuApiUrl = 'https://localhost:44300/api/ApplicationMenu/GetApplicationMenus';
 
  private readonly rolesApiUrl = 'https://localhost:44300/api/Lookup?name=Roles'; 
  private readonly orgnizationsApiUrl='https://localhost:44300/api/Organizations'
  constructor(private http: HttpClient) { }

  getRoleId(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/LoginDetails/Login`);
  }
  public getRoles(): Observable<Role[]> {
    return this.http.get<RolesApiResponse>(this.rolesApiUrl).pipe(
      map((response: { result: any; }) => response.result) // Extract the 'result' array from the response
    );
  }
  // Method to get a list of staff members
  getStaff(): Observable<Staff[]> {
    
    return this.http.get<Staff[]>(`${this.baseUrl}/LoginDetails/Get`);
  }

  // Method to add a new staff member
  addStaff(staff: Staff): Observable<Staff> {
    
    debugger
    console.log('Adding staff:', staff);
    return this.http.post<Staff>(this.createUserApiUrl, staff);
  }

  // Method to update an existing staff member
  updateStaff(staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.baseUrl}/Update/${staff.id}`, staff);
  }

  // Method to delete a staff member by ID
  deleteStaff(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/LoginDetails/Delete/${id}`);
  }

  // Method to get menu items based on role ID (if this is needed separately)
  getMenuItemsByRole(roleId: number): Observable<any[]> {
    debugger
    const params = new HttpParams().set('roleId', roleId.toString());
    return this.http.get<any[]>(`${this.baseUrl}/ApplicationMenu/GetApplicationMenus`, { params });
  }
  getAllCompanies(): Observable<Company[]> {
    
    return this.http.get<Company[]>(`${this.baseUrl}/Organizations/Get`);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/Organizations/GetById${id}`);
  }
  
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.baseUrl}/Organizations/Create`, company);
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/Organizations/Create/${company.id}`, company);
  }

  deleteCompany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Organizations/Delete/${id}`);
  }
}
