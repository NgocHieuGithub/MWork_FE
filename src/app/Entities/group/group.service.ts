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
  GetListGroup(): Observable<Group_res>{
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${sessionStorage.getItem('mwork_ac')}`)
      .set('Content-Type', 'application/json');
    return this.http.get<Group_res>(this.app_config.getEndpointFor('group/getlist'),{headers:headers});
  }
}
