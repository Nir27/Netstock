import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NgModel} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


interface InventoryItem {
  type: string;
  brand: string;
  price: number;
  date : Date;
}

@Component({
  selector: 'app-search-inventory',
  templateUrl: './search-inventory.component.html',
  styleUrls: ['./search-inventory.component.css']
})
export class SearchInventoryComponent implements AfterViewInit{

  displayedColumns: string[] = ['type', 'brand', 'price', 'date'];
  dataSource: MatTableDataSource<InventoryItem>;
  constructor(private http:HttpClient) {
    this.dataSource = new MatTableDataSource<InventoryItem>([]);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator|undefined;


ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
}

  type:string[]=[];
  brands:string[]=[];
  description: string="";
  onSearchInventory(){

    // console.log(this.type);
    // console.log(this.brands);
    // console.log(this.description);


    const typeString = this.type.join(',');
    const brandsString = this.brands.join(',');

    console.log(typeString);
    console.log(brandsString);

    this.http.get(`http://localhost:8080/inventory?brands=${brandsString}&types=${typeString}&description=${this.description}&page=0&limit=3`,{ responseType: 'json' }).subscribe((resultData:any)=>{

      console.log(resultData);
      this.dataSource.data = resultData.content;

    });
  }
}
