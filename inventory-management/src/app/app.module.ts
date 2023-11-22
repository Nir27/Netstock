import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {CommonModule, DatePipe} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { SearchInventoryComponent } from './search-inventory/search-inventory.component';
import {MatSelectModule} from "@angular/material/select";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AddInventoryComponent,
    SearchInventoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
