import { Routes } from '@angular/router';
import {LoginComponent} from "./Account/login/login.component";
import {RegisterComponent} from "./Account/register/register.component";
import {HomeComponent} from "./Layout/home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent
  }
];
