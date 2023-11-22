import { Component } from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-search-inventory',
  templateUrl: './search-inventory.component.html',
  styleUrls: ['./search-inventory.component.css']
})
export class SearchInventoryComponent {

  type:string="";
  brands:string[]=[];
  description: string="";
  onSearchInventory(){


  }
}
