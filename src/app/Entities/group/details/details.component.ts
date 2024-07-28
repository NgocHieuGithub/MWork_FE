import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {GroupService} from "../group.service";
import {FooterComponent} from "../../../Layout/footer/footer.component";
import {LeftContainerComponent} from "../../../Layout/left-container/left-container.component";
import {NavbarComponent} from "../../../Layout/navbar/navbar.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    FooterComponent,
    LeftContainerComponent,
    NavbarComponent,
    RouterLink
  ],
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
        console.log(this.data)
      }, error:err => {
        console.log(err)
      }
    })
  }
}
