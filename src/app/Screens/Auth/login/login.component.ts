import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Services/Authentication/auth/auth.service';
import { UserInfo } from '../../../Modules/Authentication/UserInfo';
import { ApiResponse } from '../../../Modules/Helpers/ApiResponse';
import { SysUserService } from '../../../Services/Sys/User/sys-user.service';
import { Sys_UserSearchDto } from '../../../Modules/Sys/User/Sys_User';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { NgIf ,CommonModule  } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-login',
  standalone: true,  // Standalone component
  imports: [FormsModule,MatSelectModule,MatFormFieldModule,NgIf,MatInputModule,MatCheckboxModule,CommonModule ],  // Import HttpClientModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    UserName: '',
    UserPassword: '',
    Language: null as number | null,
    RememberMe: false
  };

    // Static language options
    languageOptions = [
      { code: 1, name: 'العربية' },    // Language 1 (Arabic)
      { code: 2, name: 'English' }    // Language 2 (English)
    ];

  constructor(private router: Router,private authService: AuthService,private sysUserService:SysUserService) { }

  onLogin(): void {
    const userSearchDto: Sys_UserSearchDto = {
      PageIndex: 1,
      PageSize: 10,
      NameAr: '',
      NameEn: '',
      Email: '',
      UserName: '',
      TypeID: 0,
      BranchID: 0,
      EmpID: 0,
      Enable: true,
      GroupID: 0
    };
    
    this.authService.login(
      this.loginData.UserName,
      this.loginData.UserPassword,
      this.loginData.Language,
      this.loginData.RememberMe
    ).subscribe({
      next: (response: ApiResponse<UserInfo>) => {
        if (response.succeeded && response.data) {
          // Store token using AuthService
          if (response.data.token) {
            this.authService.LoginConfig(response.data);
            this.router.navigate(['/Main']); // Ensure this is correct
          } else {
            console.error('Token is undefined');
          }
        }
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

  onInputChange(value: string | number, field: 'UserName' | 'UserPassword' | 'Language' | 'RememberMe'): void {
    switch (field) {
      case 'UserName':
      case 'UserPassword':
        this.loginData[field] = value as string;
        break;
      case 'Language':
        this.loginData[field] = +value;  // Convert to number
        break;
      case 'RememberMe':
        this.loginData[field] = !!value;  // Ensure boolean for RememberMe
        break;
      default:
        break;
    }
  }
}