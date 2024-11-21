import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo, UserInfoEnum } from '../../../Modules/Authentication/UserInfo';
import { ApiResponse } from '../../../Modules/Helpers/ApiResponse';
import { TokenService } from '../Token/token.service';
import { HttpMethod } from '../../../shared/HttpMethod';
import { ApiCallerService } from '../../Shared/api-caller.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private apiCaller: ApiCallerService, private tokenService: TokenService) {}

  private sessionKey: string = 'userInfo';



  login(userName: string, userPassword: string, language: number | null, rememberMe: boolean): Observable<ApiResponse<UserInfo>> {
    // Create a plain object matching the LoginDto in C#
    const loginDto = {
      UserName: userName,
      UserPassword: userPassword,
      Language: language,  // Ensure this matches the C# property name
      RememberMe: rememberMe
    };

    // Use ApiCallerService to make the request
    return this.apiCaller.makeRequest<UserInfo>(
      HttpMethod.POST,          // Specify POST method
      '/Auth/Login',            // The endpoint (no need for the full URL)
      loginDto,                 // The request body
      undefined,                // Optional headers (no custom headers, so use undefined)
      false                     // No authorization needed for login
    );
  }
  
  // Save token on successful login
  saveToken(token: string): void {
    this.tokenService.setToken(token);
  }
  // Handle login and save token
  LoginConfig(userInfo: UserInfo): void {
    if (userInfo.token) {
      this.tokenService.setToken(userInfo.token); // Save token on successful login
      this.CreateSessions(userInfo);
    } else {
      console.error('Token is missing in UserInfo');
    }
  }

  // Logout: remove token
  logout(): void {
    this.tokenService.removeToken();
  }

  // Saving UserInfo to session storage
  CreateSessions(userInfo: UserInfo): void {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(userInfo));
  }

   // Clear session data
   clearSession(): void {
    sessionStorage.removeItem(this.sessionKey);
  }

  // Get specific data from UserInfo based on the provided key
  GetSessionData(key: UserInfoEnum): any {
    const userInfo = this.GetSessionUserInfo();
    return userInfo ? userInfo[key] : null; // Return the value for the specified key or null if not found
  }

    // Retrieve UserInfo from session storage
    GetSessionUserInfo(): UserInfo | null {
      const userInfoJson = sessionStorage.getItem(this.sessionKey);
      return userInfoJson ? JSON.parse(userInfoJson) : null;
    }

}