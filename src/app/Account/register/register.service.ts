import {inject, Injectable} from "@angular/core";
import {RegisterModel} from "./register.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigServiceService} from "../../Config/application-config.service.service";

export interface user_req {
  name:string|undefined,
  username:string|undefined,
  email:string|undefined,
  sdt:string|undefined,
  password:string|undefined
  url:string|undefined
}
@Injectable({providedIn:"root"})
export class RegisterService{
  protected http = inject(HttpClient)
  protected app_config = inject(ApplicationConfigServiceService)
  register(user_regis: RegisterModel): Observable<any>{
    console.log("start here");
    return this.http.post(this.app_config.getEndpointFor("user/create"),user_regis);
  }
}
