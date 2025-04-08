import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {User} from '../../models/user.model';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.backendHost + '/api/users';

  constructor(private http: HttpClient) {}

  login(userId: number | undefined): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(error => {
        return throwError(() => new Error('User not found. Please check the ID.'));
      })
    );
  }

  getAllUsers(params : any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, params).pipe(
      catchError(error => {
        return throwError(() => new Error('Error fetching user list.'));
      })
    );
  }
}
