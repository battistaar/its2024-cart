import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtSrv: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.jwtSrv.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = authToken ? req.clone({
                                  headers: req.headers.set('Authorization', ` Bearer ${authToken}`)
                                }) : req;

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
