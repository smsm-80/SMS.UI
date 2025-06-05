import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; // Import the CookieService

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  
  private tokenKey = 'auth_token';

  constructor(private cookieService: CookieService) {}

  // Store token in cookies
  setToken(token: string, expirationDays: number = 1): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expirationDays);
    this.cookieService.set(this.tokenKey, token, expiryDate);
  }

  // Get token from cookies
  getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }

  // Remove token from cookies
  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
  }
}
