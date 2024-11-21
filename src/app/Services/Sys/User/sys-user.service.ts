import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sys_User } from '../../../Modules/Sys/User/Sys_User';
import { Sys_UserSearchDto } from '../../../Modules/Sys/User/Sys_User';
import { ApiCallerService } from '../../Shared/api-caller.service';
import { HttpMethod } from '../../../shared/HttpMethod';

@Injectable({
  providedIn: 'root'
})

export class SysUserService {
  constructor(private http: HttpClient,private apiCaller: ApiCallerService) {}

  getAllSysUsers(Sys_UserSearchDto:Sys_UserSearchDto) {
        // Use ApiCallerService to make the request
        var ResponseData=  this.apiCaller.makeRequest<Sys_User>(
          HttpMethod.POST,          // Specify POST method
          '/Sys_User/GetAll',            // The endpoint (no need for the full URL)
          Sys_UserSearchDto,                 // The request body
          undefined,                // Optional headers (no custom headers, so use undefined)
          true                     // No authorization needed for login
        );
        return ResponseData
  }
}