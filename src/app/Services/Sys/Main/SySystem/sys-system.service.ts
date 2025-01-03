import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../Shared/api-caller.service';
import { SysSystem } from '../../../../Modules/Sys/Main/SysSystem';
import { HttpMethod } from '../../../../shared/HttpMethod';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../../../../Modules/Helpers/ApiResponse';



@Injectable({
  providedIn: 'root'
})
export class SysSystemService {

  constructor(private apiCaller: ApiCallerService) {}

  GetAllSysSystems(): Observable<SysSystem[]> {
    return this.apiCaller.makeRequest<ApiResponse<SysSystem[]>>(
      HttpMethod.GET,
      '/SysSystem/GetAll',
      null,
      undefined,
      true
    ).pipe(
      map((response: ApiResponse<SysSystem[]>) => response.data || [])
    );
  }
}