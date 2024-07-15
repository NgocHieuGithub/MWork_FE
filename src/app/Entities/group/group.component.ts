import {Component, inject, OnInit} from '@angular/core';
import {GroupModel} from "./group.model";
import {GroupService} from "./group.service";
import {Router, Routes} from "@angular/router";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})

export class GroupComponent implements OnInit{
  protected group_service = inject(GroupService);
  protected router = inject(Router);

  groups: GroupModel[] | undefined;

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
}
