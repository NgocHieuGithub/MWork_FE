import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected registerService = inject(RegisterService);
  protected router = inject(Router);

  regisForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    sdt: new FormControl('')
  })
  register(): void{
    console.log(this.regisForm.getRawValue())
    this.registerService.register(this.regisForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/home'])
    }, error:() => {
        alert("Username is existed !")
      }
    })
  }

}
