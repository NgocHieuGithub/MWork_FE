import {Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "./project.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {GroupService} from "../group/group.service";
import {FooterComponent} from "../../Layout/footer/footer.component";
import {LeftContainerComponent} from "../../Layout/left-container/left-container.component";
import {NavbarComponent} from "../../Layout/navbar/navbar.component";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    LeftContainerComponent,
    NavbarComponent,
    NgForOf
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  // DI
  protected project_service = inject(ProjectService)
  protected route = inject(ActivatedRoute);
  protected id = this.route.snapshot.params['id_group'];
  protected router = inject(Router);
  protected group_service = inject(GroupService)
  protected http = inject(HttpClient)
  projects?: any[];
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
  content:string|undefined = ''
  // loadTextFromUrl(s:string){
  //
  //   this.getTextFromUrl(s)
  //     .subscribe(
  //       data => {
  //          this.content = data
  //
  //       },
  //       error => {
  //         console.error('Đã xảy ra lỗi:', error);
  //       }
  //     );
  // }
  async loadTextFromUrl(s: string, id_div:string) {
    try {
      this.content = await this.getTextFromUrl(s).toPromise();
      // @ts-ignore
      document.getElementById("btnShow " + id_div).style.display = 'none'
      if (this.content != ''){
        // @ts-ignore
        document.getElementById('divcontent ' + id_div).innerHTML = <string>this.content
      }
      // @ts-ignore
      document.getElementById(id_div).style.display = 'block'
      // @ts-ignore
      document.getElementById("btnHide " + id_div).style.display = 'block'
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  }
  getTextFromUrl(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
  hide(x:string){
    // @ts-ignore
    document.getElementById("btnShow " + x).style.display = 'block'
    // @ts-ignore
    document.getElementById(x).style.display = 'none'
    // @ts-ignore
    document.getElementById("btnHide " + x).style.display = 'none'
  }
  protected readonly console = console;
}
