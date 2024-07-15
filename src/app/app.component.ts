import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./Layout/navbar/navbar.component";
import {FooterComponent} from "./Layout/footer/footer.component";
import {LoginComponent} from "./Account/login/login.component";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./Account/register/register.component";
import {HomeComponent} from "./Layout/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MWorkFE';
  protected readonly sessionStorage = sessionStorage;
}
