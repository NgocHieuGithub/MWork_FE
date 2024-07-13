import {Component, inject, OnInit} from '@angular/core';
import {GroupModel} from "./group.model";
import {GroupService} from "./group.service";
import {TokenStorage} from "../../Config/Storage/TokenStorage";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})

export class GroupComponent implements OnInit{
  protected group_service = inject(GroupService);
  protected storage = inject(TokenStorage);
  protected i = 1
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

  protected readonly Array = Array;
}
