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

  GetListTask(x:string):Observable<task_res>{
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${sessionStorage.getItem('mwork_ac')}`)
      .set('Content-Type', 'application/json');
    return this.http.get<task_res>(this.app_config.getEndpointFor('project/read'),{headers:headers, params:{id_project:x}})
  }
}
