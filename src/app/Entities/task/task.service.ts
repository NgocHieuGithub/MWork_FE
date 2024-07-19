import {inject, Injectable} from "@angular/core";
import {TaskModel} from "./task.model";
import {ApplicationConfigServiceService} from "../../Config/application-config.service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
type task_res = {
  code:number,
  result:{
    id:number,
    name:string,
    dateCreate:string,
    tasks: TaskModel[]
  }
}
@Injectable({providedIn:"root"})
export class TaskService{
  protected app_config = inject(ApplicationConfigServiceService)
  protected http = inject(HttpClient);
  protected headers = new HttpHeaders()
    .set('Authorization', `Bearer ${sessionStorage.getItem('mwork_ac')}`)
    .set('Content-Type', 'application/json');
  GetListTask(x:string):Observable<task_res>{
    return this.http.get<task_res>(this.app_config.getEndpointFor('project/read'),{headers:this.headers, params:{id_project:x}})
  }

  GetYourTask(x:string):Observable<any>{
    return this.http.get(this.app_config.getEndpointFor('task/list'),{headers:this.headers, params:{id_group:x}})
  }
}
