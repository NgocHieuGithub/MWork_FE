import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../group.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  protected route = inject(ActivatedRoute)
  id = this.route.snapshot.params['id_group']
  protected group_service = inject(GroupService)
  data:any|undefined

  ngOnInit() {
    this.GetDetailGroup()
  }

  GetDetailGroup(){
    this.group_service.GetInforGroup(this.id).subscribe({
      next: res => {
        this.data = res.result
      }, error:err => {
        console.log(err)
      }
    })
  }
}
