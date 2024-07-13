import {inject, Injectable} from "@angular/core";
import {JwtToken} from "../../Account/login/login.service";

@Injectable({providedIn:"root"})
export class TokenStorage{
  private ac_key = 'mwork_ac';
  private rf_key = 'mwork_rf'
  saveToken(accessToken:string, refreshToken: string ){
    sessionStorage.setItem(this.ac_key, accessToken);
    sessionStorage.setItem(this.rf_key, refreshToken);
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
