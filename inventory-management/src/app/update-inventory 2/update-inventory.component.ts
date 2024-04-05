import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSnackBarConfig} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgModel} from "@angular/forms";


interface ItemDetails {
  inventoryId:number;
  type: string;
  brand: string;
  price: number;
  date: Date;
  description:string;
  userId:number;
}

@Component({
  selector: 'app-add-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent implements OnInit{

  // @Input() itemId: number | undefined;
  itemDetails: ItemDetails | undefined;

  updateInventoryForm! :  FormGroup<any>;
  type:String ="";
  typeControl!:FormControl;
  brand:String="";
  brandControl!:FormControl;
  description:String="";
  descriptionControl!:FormControl;
  price :number= 0;
  priceControl!:FormControl;
  date:Date= new Date();
  dateControl!:FormControl;
  // notApplicableControl!:FormControl;
  notApplicableControl: FormControl<boolean | null> = new FormControl(false);
  constructor(private route:Router,private http:HttpClient,private datePipe: DatePipe,private snackBar:MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: { itemId: number }) {


  }

  ngOnInit() {

    if (this.data.itemId !== undefined) {
      this.fetchItemDetails(this.data.itemId);
    }

    this.typeControl = new FormControl('', [Validators.required]);
    this.brandControl = new FormControl('', [Validators.required]);
    this.descriptionControl = new FormControl('', [Validators.required]);
    this.priceControl = new FormControl('', [Validators.required, Validators.min(0)]);
    this.dateControl = new FormControl('', [Validators.required]);


    this.updateInventoryForm = new FormGroup<any>({
      typeControl : this.typeControl,
      brandControl : this.brandControl,
      descriptionControl : this.descriptionControl,
      priceControl : this.priceControl,
      dateControl : this.dateControl,
      notApplicableControl: this.notApplicableControl
    });

    // this.updateInventoryForm.patchValue({
    //   typeControl: this.itemDetails?.type,
    //   brandControl: this.itemDetails?.brand,
    //   descriptionControl: this.itemDetails?.description,
    //   priceControl: this.itemDetails?.price,
    //   dateControl: this.itemDetails?.date,
    // });

  }


  fetchItemDetails(itemId: number | undefined) {
    console.log(itemId);
    this.http.get<ItemDetails>(`http://localhost:8080/inventory/find?inveId=${itemId}`)
      .subscribe((resultData) => {
        this.itemDetails = resultData;
        console.log(this.itemDetails);

        this.updateInventoryForm.patchValue({
          typeControl: this.itemDetails?.type,
          brandControl: this.itemDetails?.brand,
          descriptionControl: this.itemDetails?.description,
          priceControl: this.itemDetails?.price,
          dateControl: this.itemDetails?.date,
        });
      });
  }

  onUpdateInventory(){

    this.type = this.updateInventoryForm.get('typeControl')!.value;
    this.brand = this.updateInventoryForm.get('brandControl')!.value;
    this.description = this.updateInventoryForm.get('descriptionControl')!.value;
    this.price = this.updateInventoryForm.get('priceControl')!.value;
    this.date = this.updateInventoryForm.get('dateControl')!.value;
    const formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    let bodydata = {

      type:this.type,
      brand:this.brand,
      description:this.description,
      price : this.price,
      date : this.date

    }

    this.http.put(`http://localhost:8080/inventory?inveId=${this.itemDetails?.inventoryId}`,bodydata,{ responseType: 'text' }).subscribe((resultData:any)=>{


      if (resultData.includes('Inventory is updated')) {
        console.log('Inventory is Inventory is updated!');

      }

    });

    const snackbarConfig: MatSnackBarConfig = {
      duration: 3000, // You can adjust the duration (in milliseconds) as needed
      verticalPosition: 'top', // Center the snackbar vertically
      horizontalPosition: 'center', // Center the snackbar horizontally
      panelClass: ['custom-snackbar'], // Add a custom CSS class for further customization
    };

    // Show a snackbar message
    this.snackBar.open('Inventory is updated successfully!', 'Close', snackbarConfig);

    // this.dialogRef.close();
  }

  onclose(){

    this.route.navigateByUrl('/dashboard');
  }

  onClear(event: Event){
    event.preventDefault();
    this.updateInventoryForm.reset();
  }

  filterDates = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison

    return date ? date >= today : false;
  };



  // protected readonly onclose = onclose;
}

