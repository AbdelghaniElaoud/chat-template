import {Injectable} from '@angular/core';

import {jwtDecode} from "jwt-decode";
import {User} from "../../models/user.model";

const USER = 'user';
const OFFER = 'offer';
const TOKEN = 'token';
const REFRESH_TOKEN = 'refresh-token';


@Injectable({providedIn: 'root'})
export class SessionStorageService {

    public clear() {
        window.sessionStorage.removeItem(USER);
        window.sessionStorage.removeItem(OFFER);
        window.sessionStorage.removeItem(TOKEN);
        window.sessionStorage.removeItem(REFRESH_TOKEN);
    }

    private getDecodedToken(): any {
        try {
            return jwtDecode(this.getToken());
        } catch(Error) {
            return null;
        }
    }

    public getAuthorities(): Array<any> {
        const token = this.getDecodedToken();
        return token?.scope || [];
    }

    public getUserCode(): any {
      const token = this.getDecodedToken();
      return token?.id || [];
    }

  public getUserUsername(): any {
    const token = this.getDecodedToken();
    return token?.sub || [];
  }



    public getToken(): string | null {
        return sessionStorage.getItem(TOKEN);
    }

    public getRefreshToken(): string | null{
        return sessionStorage.getItem(REFRESH_TOKEN);
    }

    public getUser(): User | null {
        const userJson = sessionStorage.getItem(USER);
        return userJson ? JSON.parse(userJson) : null;
    }

    public getTokenDecoded(): any {
        return this.getDecodedToken();
    }

    public setToken(token: string) {
        window.sessionStorage.removeItem(TOKEN);
        window.sessionStorage.setItem(TOKEN, token);
    }

    public setRefreshToken(refreshToken: string) {
        window.sessionStorage.removeItem(REFRESH_TOKEN);
        window.sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
    }


}
