import {inject, Injectable} from "@angular/core";
import {ApplicationConfigServiceService} from "../../Config/application-config.service.service";
import {Observable} from "rxjs";
import {ProjectModel} from "./project.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
type Project_res = {
  code:number
  result: ProjectModel[]
}
@Injectable({providedIn:"root"})
export class ProjectService{
  protected app_config = inject(ApplicationConfigServiceService)
  protected http = inject(HttpClient)
  protected headers = new HttpHeaders()
    .set('Authorization', `Bearer ${sessionStorage.getItem('mwork_ac')}`)
    .set('Content-Type', 'application/json');

  GetListProject(x: string):Observable<any>{
    return this.http.get<any>(
      this.app_config.getEndpointFor('project/getlist'),
      {headers:this.headers, params: {id_group:x}}
    );
  }

  CreateProject(x: any): Observable<HttpResponse<any>>{
    return this.http.post<any>(this.app_config.getEndpointFor('project/create'),x,{headers:this.headers})
  }
}
