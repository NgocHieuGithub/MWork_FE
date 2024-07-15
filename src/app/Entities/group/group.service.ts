import {inject, Injectable} from "@angular/core";
import {ApplicationConfigServiceService} from "../../Config/application-config.service.service";
import {Observable} from "rxjs";
import {GroupModel} from "./group.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
type Group_res = {
  code:number
  result: GroupModel[]
}
@Injectable({providedIn:"root"})
export class GroupService{
  protected http = inject(HttpClient);
  protected app_config = inject(ApplicationConfigServiceService);
  protected headers = new HttpHeaders()
    .set('Authorization', `Bearer ${sessionStorage.getItem('mwork_ac')}`)
    .set('Content-Type', 'application/json');
  GetListGroup(): Observable<Group_res>{
    return this.http.get<Group_res>(this.app_config.getEndpointFor('group/getlist'),{headers:this.headers});
  }
  JoinGroup(x: string):Observable<any>{
    return this.http.get(this.app_config.getEndpointFor('group/join'), {headers: this.headers, params:{code_group:x}})
  }
  CreateGroup(x: GroupModel):Observable<GroupModel>{
    return this.http.post<GroupModel>(this.app_config.getEndpointFor('group/create'),x,{headers:this.headers});
  }
  GetInforGroup(x:string):Observable<any>{
    return this.http.get(this.app_config.getEndpointFor('group/read'),{headers:this.headers,params:{id_group:x}})
  }
}
