import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepicker} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSnackBarConfig} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit{

  inventoryForm! :  FormGroup<any>;
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
  constructor(private route:Router,private http:HttpClient,private datePipe: DatePipe,private snackBar:MatSnackBar) {


  }

  ngOnInit() {

    // this.inventoryForm = new FormGroup(
    //   {
    //     type: new  FormControl ('',[Validators.required])
    //   }
    // )
    this.typeControl = new FormControl('', [Validators.required]);
    this.brandControl = new FormControl('', [Validators.required]);
    this.descriptionControl = new FormControl('', [Validators.required]);
    this.priceControl = new FormControl('', [Validators.required, Validators.min(0)]);
    this.dateControl = new FormControl('', [Validators.required]);


    this.inventoryForm = new FormGroup<any>({
      typeControl : this.typeControl,
      brandControl : this.brandControl,
      descriptionControl : this.descriptionControl,
      priceControl : this.priceControl,
      dateControl : this.dateControl,
      notApplicableControl: this.notApplicableControl
    });

  }

  onAddInventory(){

    this.type = this.inventoryForm.get('typeControl')!.value;
    this.brand = this.inventoryForm.get('brandControl')!.value;
    this.description = this.inventoryForm.get('descriptionControl')!.value;
    this.price = this.inventoryForm.get('priceControl')!.value;
    this.date = this.inventoryForm.get('dateControl')!.value;
    const formattedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

    let bodydata = {

      type:this.type,
      brand:this.brand,
      description:this.description,
      price : this.price,
      date : this.date

    }

    this.http.post("http://localhost:8080/inventory",bodydata,{ responseType: 'text' }).subscribe((resultData:any)=>{


      if (resultData.includes('Inventory is added')) {
        console.log('Inventory is added!');

      }

    });

    const snackbarConfig: MatSnackBarConfig = {
      duration: 3000, // You can adjust the duration (in milliseconds) as needed
      verticalPosition: 'top', // Center the snackbar vertically
      horizontalPosition: 'center', // Center the snackbar horizontally
      panelClass: ['custom-snackbar'], // Add a custom CSS class for further customization
    };

    // Show a snackbar message
    this.snackBar.open('Inventory is added successfully!', 'Close', snackbarConfig);

    // this.dialogRef.close();
  }

  onclose(){

    this.route.navigateByUrl('/dashboard');
  }

  onClear(event: Event){
    event.preventDefault();
    this.inventoryForm.reset();
  }

  filterDates = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison

    return date ? date >= today : false;
  };



  // protected readonly onclose = onclose;
}
