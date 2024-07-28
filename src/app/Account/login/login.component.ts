import {AfterViewInit, Component, ElementRef, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router, RouterLink, Routes} from "@angular/router";
import {TokenStorage} from "../../Config/Storage/TokenStorage";
import {NgClass} from "@angular/common";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
  ]
})
export class LoginComponent {
  protected http = inject(HttpClient);
  private loginService = inject(LoginService);
  protected router = inject(Router);
  protected storage = inject(TokenStorage);
  loginForm = new FormGroup({
    username: new FormControl('',{nonNullable:true, validators:[Validators.required]}),
    password: new FormControl('', {nonNullable:true, validators:[Validators.required]})
  })
  login(){
    console.log(this.loginForm.getRawValue())
    this.loginService.login(this.loginForm.getRawValue()).subscribe({
      next: data => {
          this.router.navigate(["/home"]);
    },error:()=>{
        alert("Wrong password")
      }
    })
  }
  showingPage: string = 'account-page';
  toggleView(){
    this.showingPage = this.showingPage == 'login-page' ? 'account-page' : 'login-page';
  }
}
