import {inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorage} from "../Storage/TokenStorage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  protected storage = inject(TokenStorage);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = sessionStorage.getItem('mwork_ac');
    console.log("interceptor", token)
      const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next.handle(authReq);
  }
}
