import { Component } from '@angular/core';
import {NgModel} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search-inventory',
  templateUrl: './search-inventory.component.html',
  styleUrls: ['./search-inventory.component.css']
})
export class SearchInventoryComponent {

  constructor(private http:HttpClient) {
  }


  type:string="";
  brands:string[]=[];
  description: string="";
  onSearchInventory(){

    console.log(this.type);
    console.log(this.brands);
    console.log(this.description);



    this.http.post("http://localhost:8080/inventory?",{ responseType: 'text' }).subscribe((resultData:any)=>{

        console.log(resultData);

    });
  }
}
