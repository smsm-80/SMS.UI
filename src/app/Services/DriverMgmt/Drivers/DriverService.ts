import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../Shared/api-caller.service';
import { HttpMethod } from '../../../shared/HttpMethod';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse,PaginationApiResponse,PaginationModel } from '../../../Modules/Helpers/ApiResponse';
import { DriverDto, DriverSearchDto } from '../../../Modules/DriverMgmt/Driver/Driver';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private apiCaller: ApiCallerService) {}

  // Create a new driver
  createDriver(driverDto: DriverDto): Observable<ApiResponse<DriverDto>> {
    return this.apiCaller.makeRequest<ApiResponse<DriverDto>>(
      HttpMethod.POST,
      '/Driver/Create',
      driverDto,
      undefined,
      true
    );
  }

  // Get all drivers with filters and pagination
  getAllDrivers(driverSearchDto: DriverSearchDto): Observable<PaginationApiResponse<DriverDto>> {
    return this.apiCaller
      .makeRequest<PaginationApiResponse<DriverDto>>(
        HttpMethod.POST,
        '/Driver/GetAll',
        driverSearchDto,
        undefined,
        true
      )
      .pipe(
        map((response:PaginationApiResponse<DriverDto>) => response || []), // Handle missing data gracefully
        catchError((error) => {
        return of({
            data: {
              rowsCount: 0,
              pageIndex: 1,
              pageSize: 0,
              list: [],
            },
            succeeded: false, // Indicate the operation failed
            status: {
              code: 500,
              message: 'An error occurred while fetching drivers error.message=(' +error.message +")End of error.message",
            },
          }); // Return empty pagination model in case of error
        })
      );
  }


  

  // Get a driver by ID
  getDriverById(id: number): Observable<ApiResponse<DriverDto>> {
    return this.apiCaller
      .makeRequest<ApiResponse<DriverDto>>(
        HttpMethod.GET,
        `/Driver/GetById?id=${id}`,
        null,
        undefined,
        true
      )
      .pipe(
        map((response:ApiResponse<DriverDto>) => response || null), // Ensure null if no data
        catchError((error) => {
          console.error('Error fetching driver by ID', error);
          return of(new ApiResponse<DriverDto>(null, 500, 'An error occurred', false));
        })
      );
  }

  // Update a driver
  updateDriver(driverDto: DriverDto): Observable<ApiResponse<DriverDto>> {
    return this.apiCaller.makeRequest<ApiResponse<DriverDto>>(
      HttpMethod.PUT,
      '/Driver/Update',
      driverDto,
      undefined,
      true
    );
  }

  // Delete a driver (soft delete)
  deleteDriver(id: number): Observable<ApiResponse<boolean>> {
    return this.apiCaller.makeRequest<ApiResponse<boolean>>(
      HttpMethod.DELETE,
      `/Driver/Delete?id=${id}`,
      null,
      undefined,
      true
    );
  }


}
