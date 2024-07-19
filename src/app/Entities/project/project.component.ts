import {Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "./project.service";
import {ProjectModel} from "./project.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {GroupService} from "../group/group.service";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  protected project_service = inject(ProjectService)
  protected route = inject(ActivatedRoute);
  protected id = this.route.snapshot.params['id_group'];
  protected router = inject(Router);
  protected group_service = inject(GroupService)
  projects?: ProjectModel[];
  group_infor:any
  ngOnInit() {
    this.GetListProject()
  }
  GetListProject(){
    this.project_service.GetListProject(this.id).subscribe({
      next:data => {
        this.projects = data.result
    }, error:err => {
        alert(err)
      }
    })
  }
  GetInforGroup(){
    this.group_service.GetInforGroup(this.id).subscribe({
      next:res =>{
        console.log(res)
        this.group_infor = res
      }
    })
  }
  OnClick(id_projec:string){
    this.router.navigate(['/task', id_projec]);
  }
}
