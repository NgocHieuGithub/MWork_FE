import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TaskService} from "../task.service";
import {FooterComponent} from "../../../Layout/footer/footer.component";
import {LeftContainerComponent} from "../../../Layout/left-container/left-container.component";
import {NavbarComponent} from "../../../Layout/navbar/navbar.component";

@Component({
  selector: 'app-youttask',
  standalone: true,
  imports: [
    FooterComponent,
    LeftContainerComponent,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './youttask.component.html',
  styleUrl: './youttask.component.css'
})
export class YouttaskComponent implements OnInit{
  protected route = inject(ActivatedRoute)
  id =  this.route.snapshot.params['id_group']
  protected task_service = inject(TaskService)
  data: any
  ngOnInit() {
    this.GetYourTask()
  }
  GetYourTask(){
    this.task_service.GetYourTask(this.id).subscribe({
      next:res =>{
        this.data = res.result
      }, error:err => {
        console.log(err)
      }
    })
  }

  protected readonly sessionStorage = sessionStorage;
}
