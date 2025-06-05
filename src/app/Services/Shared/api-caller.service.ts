import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from '../Authentication/Token/token.service';
import { ApiResponse } from '../../Modules/Helpers/ApiResponse';
import { HttpMethod } from '../../shared/HttpMethod';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiCallerService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  makeRequest<T>(
    method: HttpMethod,
    endpoint: string,
    body?: any,
    headers?: HttpHeaders,
    useAuth: boolean = false,
    responseType?: string // Optional responseType for special cases
  ): Observable<T> {
    const url = `${environment.apiBaseUrl}${endpoint}`;

    // Set up headers with Authorization if needed
    if (useAuth) {
      const token = this.tokenService.getToken();
      if (token) {
        headers = headers ? headers : new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.warn('Authorization token is missing.');
      }
    }

    // Add query parameters dynamically if provided
    const options: any = {
      headers: headers ? headers : new HttpHeaders(),
      params: new HttpParams(),
    };

    if (body?.params) {
      Object.keys(body.params).forEach(key => {
        options.params = options.params.append(key, body.params[key]);
      });
    }

    // Add responseType if provided
    if (responseType) {
      options.responseType = responseType;
    }

    let request$: Observable<any>;

    // Handle dynamic HTTP methods
    switch (method) {
      case HttpMethod.GET:
        request$ = this.http.get<T>(url, options);
        break;
      case HttpMethod.POST:
        request$ = this.http.post<T>(url, body, options);
        break;
      case HttpMethod.PUT:
        request$ = this.http.put<T>(url, body, options);
        break;
      case HttpMethod.DELETE:
        request$ = this.http.delete<T>(url, options);
        break;
      default:
        console.warn("Invalid HTTP method");
        throw new Error('');
    }

    // Process response and handle errors
    return request$.pipe(
      map((response: T) => response),
      catchError((error) => {
        console.warn("ApiCallerService Error :" + error.message);
        return throwError(() => new Error(""));
      })
    );
  }
}
