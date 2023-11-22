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

  pageNum :number=0;
  displayedColumns: string[] = ['type', 'brand', 'price', 'description','date','actions'];
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

    const typeString = this.type.join(',');
    const brandsString = this.brands.join(',');

    this.http.get(`http://localhost:8080/inventory?brands=${brandsString}&types=${typeString}&description=${this.description}&page=${this.pageNum}&limit=10`,{ responseType: 'json' }).subscribe((resultData:any)=>{

      console.log(resultData);
      this.dataSource.data = resultData.content;

    });
  }

  onMore(){

    this.pageNum = this.pageNum+1;

    const typeString = this.type.join(',');
    const brandsString = this.brands.join(',');

    this.http.get(`http://localhost:8080/inventory?brands=${brandsString}&types=${typeString}&description=${this.description}&page=${this.pageNum}&limit=5`,{ responseType: 'json' }).subscribe((resultData:any)=>{

      console.log(resultData);
      this.dataSource.data = resultData.content;

    });

  }

  onClear() {

    this.type = [];
    this.brands = [];
    this.description = "";
    this.dataSource.data = [];
  }

  onDelete(inveId:number){

    this.http.delete(`http://localhost:8080/inventory?inveId=${inveId}`,{ responseType: 'json' }).subscribe((resultData:any)=>{

      console.log(resultData);

    });

  }

}
