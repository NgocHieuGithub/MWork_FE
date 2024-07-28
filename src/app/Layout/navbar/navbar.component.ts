import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {GroupService} from "../../Entities/group/group.service";
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
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
import {CGroupDialogComponent} from "../Dialog/cgroup-dialog/cgroup-dialog.component";
import {TokenStorage} from "../../Config/Storage/TokenStorage";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  cdr = inject(ChangeDetectorRef)
  router = inject(Router)
  group_service = inject(GroupService)
  readonly dialog = inject(MatDialog);
  protected check = this.router.url.includes('home')
  protected storage = inject(TokenStorage)


  CreateGroup(){
    this.openDialog2('0','0')
  }
  JoinGroup(){
    this.openDialog('0','0')
  }

  Logout(){
    this.storage.clearToken()
    window.location.replace('/')
    //this.router.navigate([''])
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('data receive from dialog is: ' , res)
      if(res){
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
      }
    })
  }

  openDialog2(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(CGroupDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('data receive from dialog is: ' , res)
      if(res){
        this.group_service.CreateGroup(res).subscribe({
          next:data=>{
            console.log('data valueisiss: ', data)
            if (data.code == 1000){
              window.location.reload()
              //this.router.navigate(['home'])
            }
            else{
              alert('Create group not successfully')
            }
          }, error:err => {
            alert('Errrr: ' + err)
          }
        })
      }
    })
  }

  protected readonly sessionStorage = sessionStorage;
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
