import {Component, inject, OnInit} from '@angular/core';
import {TaskService} from "./task.service";
import {ActivatedRoute} from "@angular/router";
import {TaskModel} from "./task.model";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
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
