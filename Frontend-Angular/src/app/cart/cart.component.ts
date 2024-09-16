import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  registerId : any;
  imagesFromDb : any;

  constructor(private service : MainService){}
  ngOnInit() {
    this.Mycart();
  }
  Mycart(){
    debugger;
    this.registerId = sessionStorage.getItem('ExistedUser')
    const id ={
      Registered_Id : this.registerId
    }

    this.service.openMyCart(id).subscribe(response => {
      debugger;
      this.imagesFromDb = response
    })
  }
  calculateGrandTotal() : any{
    let grandTotal = 0;
    for(const image of this.imagesFromDb){
      grandTotal += image.price
    }
    return grandTotal;
  }
  RemoveFromCart(product_Id:any){
    this.registerId = sessionStorage.getItem('RegisterId')
    const ids = {
      register_id : this.registerId,
      Product_id : product_Id
    }
    this.service.deleteFromCart(ids).subscribe(
      response =>
    console.log(response)
    )
  }

}
