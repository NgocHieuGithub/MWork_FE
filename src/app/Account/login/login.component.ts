import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router, Routes} from "@angular/router";
import {TokenStorage} from "../../Config/Storage/TokenStorage";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
}
