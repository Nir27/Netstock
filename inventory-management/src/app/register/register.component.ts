import {Component, OnInit, Optional} from '@angular/core';
import {FormControl,FormGroup,Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  hide :boolean = true;
  hide1:boolean = true;
  registerForm! : FormGroup;
  firstName:String="";
  lastName:String="";
  email:String="";
  password:String="";

  constructor(private http:HttpClient,@Optional() public dialogRef: MatDialogRef<RegisterComponent>,private snackBar:MatSnackBar) {
  }

  ngOnInit() {
    // @ts-ignore
    this.registerForm = new FormGroup<any>(

      {

        firstName : new FormControl('',[Validators.required]),
        lastName : new FormControl('',[Validators.required]),
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',[Validators.required,Validators.minLength(6)]),
        confirmPassword : new FormControl('',[Validators.required]),
      }
      // , { validators: this.passwordMatchValidator }
    )

  }

//   passwordMatchValidator= () => {
//
//    const  password = this.registerForm.get('password')?.value;
//    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
//
//    return password ===confirmPassword ? null :{passwordMissMatch:true};
// }

 onRegister(){

   this.firstName =this.registerForm.get('firstName')!.value;
   this.lastName =this.registerForm.get('firstName')!.value;
   this.email =this.registerForm.get('email')!.value;
   this.password = this.registerForm.get('password')!.value;

   let bodydata = {

     firstName:this.firstName,
     lastName:this.lastName,
     email:this.email,
     password : this.password

   }

   this.http.post("http://localhost:8080/user",bodydata,{ responseType: 'text' }).subscribe((resultData:any)=>{


     if (resultData.includes('user is added')) {
       console.log('Registration is successful!');

     }

   });

   const snackbarConfig: MatSnackBarConfig = {
     duration: 3000, // You can adjust the duration (in milliseconds) as needed
     verticalPosition: 'top', // Center the snackbar vertically
     horizontalPosition: 'center', // Center the snackbar horizontally
     panelClass: ['custom-snackbar'], // Add a custom CSS class for further customization
   };

   // Show a snackbar message
   this.snackBar.open('Registration successful!', 'Close', snackbarConfig);

   this.dialogRef.close();


 }


}
