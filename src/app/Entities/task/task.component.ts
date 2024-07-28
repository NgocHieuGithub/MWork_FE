import {Component, inject, OnInit} from '@angular/core';
import {TaskService} from "./task.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TaskModel} from "./task.model";
import {FooterComponent} from "../../Layout/footer/footer.component";
import {LeftContainerComponent} from "../../Layout/left-container/left-container.component";
import {NavbarComponent} from "../../Layout/navbar/navbar.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    FooterComponent,
    LeftContainerComponent,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  protected routes = inject(ActivatedRoute);
  protected id = this.routes.snapshot.params['id_group'];
  protected task_service = inject(TaskService)
  protected route = inject(ActivatedRoute)
  protected id_project = this.route.snapshot.params['id_project']
  tasks?:TaskModel[]
  ngOnInit() {
    this.GetListTask()
  }
  GetListTask(){
    this.task_service.GetListTask(this.id_project).subscribe({
      next:res => {
        this.tasks  = res.result.tasks
      }
    })
  }

    protected readonly sessionStorage = sessionStorage;
}
