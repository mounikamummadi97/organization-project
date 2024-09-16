import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  UserDetails : any;
  
  imagePaths: string[] = [];
  
  selectedOption: string ='';
  
  selectOption(option:string){
    this.selectedOption = option;
    this.showCategories();
  }
  
  ProfileDetails(){
    console.log("Profile are : ", this.output);
    
  }

  constructor(private service: MainService,
    private route: Router

    ) { }

    categories: any[] = [];
    subcategories: any[] = [];
    Category_Id: any;
    RegisterId : any;
    output: any ;
    productid : any;
    
    ngOnInit(){

  }

  showCategories() {
    this.UserDetails = sessionStorage.getItem("UserDetails");
    this.service.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log('Categories:', this.categories);
      }
      );

    }
    
    getSubcategories(category: any, category_id: any) {
      this.RegisterId  = sessionStorage.getItem("RegisterId");
      this.service.getSubcategories(category.category_id).subscribe(data => {
        this.subcategories = data;
        this.Category_Id = category_id
        console.log('SubCategories:', this.subcategories);
        console.log('categoryId: ', category_id);
      });
    }
    
    catSbCat(sub_Category_id: any) {
      const ids = {
        Category_Id: this.Category_Id,
        SubCategoryId: sub_Category_id
      }
      debugger
      this.service.getProductsByCategories(ids).subscribe(response => {
        this.output = response;
        debugger;
        this.productid = sessionStorage.setItem("ProductId", this.output.productId)
        this.imagePaths = this.output.map((product: { image_path: any; })  => product.image_path);
      }
      )
    }
    getImageUrl(path: string): string {
      return this.service.getImageUrl(path);
    }
    
    addToCart(ProductId: any){
      const data = {
      RegisterId : this.RegisterId,
      ProductID : ProductId
    }
      this.service.addIntoCart(data).subscribe(response => {
        console.log(response);
        alert(response);
        })
    }

    cartFun(){
      this.route.navigate(['./cart']);
    }

    clear(){
      alert("Logged out")
      sessionStorage.clear();
      this.route.navigate(['/main']);
    }


}
