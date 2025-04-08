import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, finalize, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/authentication/auth.service";
import {SessionStorageService} from "../services/sessionStorage/session.storage.service";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService, private sessionStorageService : SessionStorageService) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //
  //   console.log(`"The interceptor is called`)
  //   console.log(`"The tken is `, this.sessionStorageService.getToken())
  //   if (!request.url.includes("/auth/login")) {
  //     let newRequest = request.clone({
  //       headers: request.headers.set("Authorization", "Bearer " + this.sessionStorageService.getToken())
  //     });
  //     return next.handle(newRequest);
  //
  //   }
  //   return next.handle(request).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         this.authService.logout();
  //       }
  //       return throwError(() => error);
  //     })
  //   );
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.sessionStorageService.getToken();


    if (token !== undefined && token !== null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('auth/refresh-token') &&
          error.status === 401
        ) {
          // Chain finalize after the refresh token process
          return this.onRefreshToken(authReq, next);
        }
        return throwError(error);
      })
    );
  }


  private onRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const refreshToken = this.sessionStorageService.getRefreshToken();

    // console.log("The refresh token method is called")
    // console.log("This is the refreshToken", refreshToken)

    if (refreshToken) {
      return this.authService.refreshToken(refreshToken).pipe(
        switchMap((token: any) => {
          this.sessionStorageService.setToken(token.accessToken);
          this.sessionStorageService.setRefreshToken(token.refreshToken);
          return next.handle(this.addTokenHeader(request, token.accessToken));
        }),
        catchError((err) => {
          this.authService.logout();
          return throwError(err);
        })
      );
    } else {
      this.authService.logout();
      return throwError('Refresh token is not available');
    }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {

    return request.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      }
    });
  }
}
