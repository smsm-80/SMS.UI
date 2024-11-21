import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../../Shared/api-caller.service';
import { HttpMethod } from '../../../../shared/HttpMethod';
import { Observable, of } from 'rxjs';  // Import 'of' here
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../../../../Modules/Helpers/ApiResponse';
import { SyslookupDataDto, SyslookupDataSearchDto } from '../../../../Modules/Sys/Main/SyslookupData';
import { PaginationModel } from '../../../../Modules/Common/PaginationModel';

@Injectable({
  providedIn: 'root',
})
export class SyslookupDataService {
  constructor(private apiCaller: ApiCallerService) {}

  // Create SyslookupData
  createSyslookupData(syslookupDataDto: SyslookupDataDto) {
    return this.apiCaller.makeRequest<ApiResponse<SyslookupDataDto>>(
      HttpMethod.POST,
      '/SyslookupData/Create',
      syslookupDataDto,
      undefined,
      true
    );
  }

  // Get all SyslookupData with filters
  getAllSyslookupData(syslookupDataSearchDto: SyslookupDataSearchDto) {
    return this.apiCaller
      .makeRequest<ApiResponse<PaginationModel<SyslookupDataDto>>>(
        HttpMethod.POST,
        '/SyslookupData/GetAll',
        syslookupDataSearchDto,
        undefined,
        true
      )
      .pipe(map((response) => response.data || []));
  }



  // Get SyslookupData by ID
  getSyslookupDataById(id: number) {
    return this.apiCaller.makeRequest<ApiResponse<SyslookupDataDto>>(
      HttpMethod.GET,
      `/SyslookupData/GetById?id=${id}`,
      null,
      undefined,
      true
    );
  }

  // Update SyslookupData
  updateSyslookupData(syslookupDataDto: SyslookupDataDto) {
    return this.apiCaller.makeRequest<ApiResponse<SyslookupDataDto>>(
      HttpMethod.PUT,
      '/SyslookupData/Update',
      syslookupDataDto,
      undefined,
      true
    );
  }

  // Delete SyslookupData (soft delete)
  deleteSyslookupData(id: number) {
    return this.apiCaller.makeRequest<ApiResponse<boolean>>(
      HttpMethod.DELETE,
      `/SyslookupData/Delete?id=${id}`,
      null,
      undefined,
      true
    );
  }


    // Get SyslookupData by CategoryId
getSyslookupDataByCategoryId(categoryId: number): Observable<SyslookupDataDto[]> {
  return this.apiCaller.makeRequest<ApiResponse<SyslookupDataDto[]>>(
    HttpMethod.GET,
    `/SyslookupData/GetByCategoryId?categoryId=${categoryId}`,
    null,
    undefined,
    true
  ).pipe(
    map((response) => {
      // Ensure that response.data is an ApiResponse, or return an empty array if missing
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else {
        return [];  // Return an empty array if response.data is not as expected
      }
    }),
    catchError((error) => {
      console.error('Error fetching lookup data', error);
      return of([]);  // Return an empty array in case of error
    })
  );
}



  // Refactored BindListData method to return an observable of data
  BindListData(categoryId: number): Observable<any[]> {
    return this.getSyslookupDataByCategoryId(categoryId).pipe(
      map((response) => {
        return response.map((item: SyslookupDataDto) => ({
          code: item.code,    // Map 'id' to 'code'
          name: item.name,  // 'name' (Arabic)
          name2: item.name2 // 'name2' (English)
        }));
      }),
      catchError((error) => {
        return of([]);  // Return empty array in case of error
      })
    );
  }
  


}