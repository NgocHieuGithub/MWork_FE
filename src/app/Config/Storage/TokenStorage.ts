import {inject, Injectable} from "@angular/core";
import {JwtToken} from "../../Account/login/login.service";

@Injectable({providedIn:"root"})
export class TokenStorage{
  private ac_key = 'mwork_ac';
  private rf_key = 'mwork_rf';
  private id_user = 'mwork_id'
  saveToken(accessToken:string, refreshToken: string, id_user: string){
    sessionStorage.setItem(this.ac_key, accessToken);
    sessionStorage.setItem(this.rf_key, refreshToken);
    sessionStorage.setItem(this.id_user, id_user)
  }
  clearToken(): void {
    sessionStorage.removeItem(this.ac_key);
    sessionStorage.removeItem(this.rf_key);
    // localStorage.removeItem(this.authenticationKey);
  }
  getToken(){
    return sessionStorage.getItem(this.ac_key)
  }
}
