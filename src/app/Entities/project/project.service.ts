import {inject, Injectable} from "@angular/core";
import {ApplicationConfigServiceService} from "../../Config/application-config.service.service";
import {Observable} from "rxjs";
import {ProjectModel} from "./project.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
type Project_res = {
  code:number
  result: ProjectModel[]
}
@Injectable({providedIn:"root"})
export class ProjectService{
  protected app_config = inject(ApplicationConfigServiceService)
  protected http = inject(HttpClient)
  GetListProject(x: string):Observable<Project_res>{
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${sessionStorage.getItem('mwork_ac')}`)
      .set('Content-Type', 'application/json');
    return this.http.get<Project_res>(
      this.app_config.getEndpointFor('project/getlist'),
      {headers:headers, params: {id_group:x}}
    );
  }
}
