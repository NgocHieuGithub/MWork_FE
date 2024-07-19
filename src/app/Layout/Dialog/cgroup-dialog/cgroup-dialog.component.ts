import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-cgroup-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogTitle,
    MatInput
  ],
  templateUrl: './cgroup-dialog.component.html',
  styleUrl: './cgroup-dialog.component.css'
})
export class CGroupDialogComponent {
  input_value?:string
  new_group =  {
    name: this.input_value,
    codeGroup: this.GenerateCodeGroup()
  }
  readonly dialogRef = inject(MatDialogRef<CGroupDialogComponent>)
  submitValue(){
    this.new_group.name = this.input_value
    this.dialogRef.close(this.new_group)
  }
  closeDialog(){
    this.dialogRef.close()
  }

  GenerateCodeGroup(): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString: string = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
}
