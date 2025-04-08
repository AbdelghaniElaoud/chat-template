import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {SessionStorageService} from "../sessionStorage/session.storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;

  constructor(private http: HttpClient, private router : Router, private sessionStorageService : SessionStorageService) { }

  public login(username : string, password : string){
    let options = {
      headers : new HttpHeaders().set("content-type", "application/x-www-form-urlencoded")
    }
    let params = new HttpParams()
      .set("username", username).set("password", password)
    return this.http.post(environment.backendHost + "/auth/login", params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;

  }

  logout() {
    this.isAuthenticated = false;
    this.sessionStorageService.clear();
    this.router.navigateByUrl("auth/login");
  }

  public refreshToken(refreshToken : string){
    return this.http.post(environment.backendHost + "/auth/refresh-token", refreshToken);
  }

}
