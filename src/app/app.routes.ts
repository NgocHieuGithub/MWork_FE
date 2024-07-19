import { Routes } from '@angular/router';
import {LoginComponent} from "./Account/login/login.component";
import {RegisterComponent} from "./Account/register/register.component";
import {HomeComponent} from "./Layout/home/home.component";
import {ProjectComponent} from "./Entities/project/project.component";
import {TaskComponent} from "./Entities/task/task.component";
import {DetailsComponent} from "./Entities/group/details/details.component";
import {YouttaskComponent} from "./Entities/task/youttask/youttask.component";
import {CreateComponent} from "./Entities/project/create/create.component";

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
  },
  {
    path:'project/:id_group',
    component: ProjectComponent
  },
  {
    path:'task/:id_project',
    component:TaskComponent
  },
  {
    path:'group/r/:id_group',
    component: DetailsComponent
  },
  {
    path:'group/t/:id_group',
    component:YouttaskComponent
  },
  {
    path:'group/c/:id_group',
    component:CreateComponent
  }
];
