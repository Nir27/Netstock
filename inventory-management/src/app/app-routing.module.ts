import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SearchInventoryComponent} from "./search-inventory/search-inventory.component";

const routes: Routes = [

  {
    path:'',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },

  {
    path:'dashboard/search-inventory',
    component:SearchInventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
