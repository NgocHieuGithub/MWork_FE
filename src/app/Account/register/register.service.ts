import {inject, Injectable} from "@angular/core";
import {RegisterModel} from "./register.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigServiceService} from "../../Config/application-config.service.service";

type user = {
  id:string,
  name:string,
  username:string,
  email:string,
  sdt:string
}
@Injectable({providedIn:"root"})
export class RegisterService{
  protected http = inject(HttpClient)
  protected app_config = inject(ApplicationConfigServiceService)
  register(user_regis: RegisterModel): Observable<user>{
    console.log("start here");
    return this.http.post<user>(this.app_config.getEndpointFor("user/create"),user_regis);
  }
}
