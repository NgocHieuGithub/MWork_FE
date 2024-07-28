import {Component, inject, OnInit} from '@angular/core';
import {GroupModel} from "./group.model";
import {GroupService} from "./group.service";
import {Router, Routes} from "@angular/router";
import {LeftContainerComponent} from "../../Layout/left-container/left-container.component";
import {NavbarComponent} from "../../Layout/navbar/navbar.component";
import {FooterComponent} from "../../Layout/footer/footer.component";
@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    LeftContainerComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})

export class GroupComponent implements OnInit{
  protected group_service = inject(GroupService);
  protected router = inject(Router);

  groups: any[] | undefined;

  ngOnInit(){
    console.log('mwork_ac', sessionStorage.getItem('mwork_ac'));
    this.GetListGroup();
  }

  GetListGroup(){
    this.group_service.GetListGroup().subscribe({
      next:data => {
        console.log(data)
        this.groups = data.result
        console.log("array value í: ", this.groups)
      }, error:() => {
        alert('find err')
      }
    })
  }

  OnClick(id_group:string){
    this.router.navigate(['project',id_group])
  }
  Delete(id_group:string){
    this.group_service.DeleteGroup(id_group).subscribe({
      next:res => {
        console.log(res)
        if (res.result){
          alert("Delete successfully")
          window.location.reload()
        } else {
          alert("Delete not successfuly")
        }
      }, error:err => {
        console.log("err", err)
      }
    })
  }
  protected readonly sessionStorage = sessionStorage;
}
