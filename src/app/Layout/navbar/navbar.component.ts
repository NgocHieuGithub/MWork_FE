import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {GroupService} from "../../Entities/group/group.service";
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  router = inject(Router)
  group_service = inject(GroupService)
  readonly dialog = inject(MatDialog);
  check?: boolean
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Lấy URL hiện tại sau khi thay đổi route
      const currentUrl = this.router.url;
      console.log('Current URL:', currentUrl);
      // Kiểm tra URL và áp dụng kiểu navbar tương ứng
      if (currentUrl.includes('/home')) {
        // Áp dụng kiểu navbar cho trang A
        this.check = true
      }
      else {
        this.check = false
      }
    });
  }


  CreateGroup(){

  }
  JoinGroup(){
    this.openDialog('0','0')
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('data receive from dialog is: ' , res)
      this.group_service.JoinGroup(res).subscribe({
        next:data=>{
          console.log('data valueisiss: ', data)
          if (data.result == 'Join group successfully'){
            window.location.reload()
            //this.router.navigate(['home'])
          }
          else{
            alert('Group is joined')
          }
        }, error:err => {
          alert('not found group')
        }
      })
    })
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './DialogJoinGroup.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, FormsModule, MatInput, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  input_value?: string
  readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  closeDialog(){
    this.dialogRef.close()
  }
  submitValue(){
    console.log('input_value is:', this.input_value)
    this.dialogRef.close(this.input_value)
  }
}
