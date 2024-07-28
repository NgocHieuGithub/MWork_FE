import {inject, Injectable} from "@angular/core";
import {LoginModel} from "./login.model";
import {Observable} from "rxjs";
import { map,tap } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {ApplicationConfigServiceService} from "../../Config/application-config.service.service";
import {TokenStorage} from "../../Config/Storage/TokenStorage";

export type JwtToken = {
  code:number,
  result:{
    accessToken: string,
    refreshToken: string,
    user:{
      id:string,
      name:string,
      username:string,
      email:string,
      sdt:string
    }
  }
}
@Injectable({providedIn: 'root'})

export class LoginService{
  protected http = inject(HttpClient);
  protected app_config = inject(ApplicationConfigServiceService);
  protected storage = inject(TokenStorage);

  login(login: LoginModel): Observable<any>{
    return this.http.post<JwtToken>(this.app_config.getEndpointFor("SignIn"), login)
      .pipe(map(x=>this.storage.saveToken(x.result.accessToken,x.result.refreshToken, x.result.user.id)))
  }
}
