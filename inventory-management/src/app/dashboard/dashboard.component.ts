import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Dialog} from "@angular/cdk/dialog";
import {AddInventoryComponent} from "../add-inventory/add-inventory.component";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(private route:Router,private http:HttpClient,public dialog:Dialog){
    }

  logout(){

    this.route.navigateByUrl('');
    }

    openAddInventoryPopup(){

      const dialogRef= this.dialog.open(AddInventoryComponent,{width:'600px'});

      // dialogRef.afterClosed.subscribe(() => {
      //   // Handle the result or perform actions when the popup is closed
      //   console.log('Popup closed with result:');
      // });

    }

    searchInventory(){

      this.route.navigateByUrl('/dashboard/search-inventory')
    }
}
