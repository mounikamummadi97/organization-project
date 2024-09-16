import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Injectable,NgModule } from '@angular/core';
import { Observable } from 'rxjs';

// Define the ApplicationMenu interface outside the service
// export interface ApplicationMenu {
//   id: number;
//   name: string;
//   description: string;
//   createdBy: string;
//   createdDate: string;
//   updatedBy: string;
//   updatedDate: string;
//   roleId: number;
// }

@Injectable({
  providedIn: 'root'
})
export class MainService {
  // getMenuItems(roleId: number) {
  //   throw new Error('Method not implemented.');
  // }
  // getMenus(roleId: string) {
  //   throw new Error('Method not implemented.');
  // }
  private readonly baseUrl = 'https://localhost:44357/api';
  private readonly loginUrl = 'https://localhost:44300/api/LoginDetails/Login';
  private readonly cartDetailsUrl = `${this.baseUrl}/cartDetails/CartDetails`;
  private readonly deleteUrl = `${this.baseUrl}/RemoveFromCart/Delete`;
  private readonly categoriesUrl = `${this.baseUrl}/Categories/Products`;
  private readonly subCategoriesUrl = `${this.baseUrl}/SubcategoriesByID/GetSubCategories`;
  private readonly productsUrl = `${this.baseUrl}/Products/Products`;
  private readonly insertIntoCartUrl = `${this.baseUrl}/InsertIntoCart/InsertIntoCart`;
  //private readonly applicationMenuApiUrl = 'https://localhost:44300/api/ApplicationMenu/GetApplicationMenus';

  constructor(private http: HttpClient) {}

  public login(details: any): Observable<any> {
    debugger
    return this.http.post<any>(this.loginUrl, details);
  }

  public openMyCart(id: any): Observable<any> {
    return this.http.post<any>(this.cartDetailsUrl, id);
  }

  public deleteFromCart(ids: any): Observable<any> {
    return this.http.post(this.deleteUrl, ids);
  }

  public getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  public getSubCategoriesById(id: any): Observable<any> {
    return this.http.post<any>(this.subCategoriesUrl, id);
  }

  // public getApplicationMenus(roleId: number): Observable<ApplicationMenu[]> {
  //   return this.http.get<ApplicationMenu[]>(`${this.applicationMenuApiUrl}?roleId=${roleId}`);
  // }

  public productsApi(formdata: any): Observable<any> {
    return this.http.post(this.productsUrl, formdata);
  }

  public addIntoCart(data: any): Observable<any> {
    return this.http.post(this.insertIntoCartUrl, data);
  }

  public getImageUrl(imageName: string): string {
    return `${this.productsUrl}/getImage/${imageName}`;
  }

  public getProductsByCategories(ids: any): Observable<any> {
    return this.http.post(this.productsUrl, ids);
  }

  public getSubcategories(categoryId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/SubcategoriesByID/GetSubCategories`, { Category_Id: categoryId });
  }
}
