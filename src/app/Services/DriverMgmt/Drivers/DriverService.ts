import { Injectable } from '@angular/core';
import { ApiCallerService } from '../../Shared/api-caller.service';
import { HttpMethod } from '../../../shared/HttpMethod';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../../../Modules/Helpers/ApiResponse';
import { DriverDto, DriverSearchDto } from '../../../Modules/DriverMgmt/Driver/Driver';
import { PaginationModel } from '../../../Modules/Common/PaginationModel';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private apiCaller: ApiCallerService) {}

  // Create a new driver
  createDriver(driverDto: DriverDto): Observable<ApiResponse<DriverDto>> {
    return this.apiCaller.makeRequest<DriverDto>(
      HttpMethod.POST,
      '/Driver/Create',
      driverDto,
      undefined,
      true
    );
  }

  // Get all drivers with filters and pagination
  getAllDrivers(driverSearchDto: DriverSearchDto): Observable<ApiResponse<PaginationModel<DriverDto>>> {
    return this.apiCaller
      .makeRequest<PaginationModel<DriverDto>>(
        HttpMethod.POST,
        '/Driver/GetAll',
        driverSearchDto,
        undefined,
        true
      )
      .pipe(
        map((response) => response.data || { items: [], totalCount: 0 }), // Handle missing data gracefully
        catchError((error) => {
          console.error('Error fetching drivers', error);
          return of({ items: [], totalCount: 0 }); // Return empty pagination model in case of error
        })
      );
  }




  

  // Get a driver by ID
  getDriverById(id: number): Observable<ApiResponse<DriverDto>> {
    return this.apiCaller
      .makeRequest<DriverDto>(
        HttpMethod.GET,
        `/Driver/GetById?id=${id}`,
        null,
        undefined,
        true
      )
      .pipe(
        map((response) => response.data || null), // Ensure null if no data
        catchError((error) => {
          console.error('Error fetching driver by ID', error);
          return of(null); // Return null in case of error
        })
      );
  }

  // Update a driver
  updateDriver(driverDto: DriverDto): Observable<ApiResponse<DriverDto>> {
    return this.apiCaller.makeRequest<DriverDto>(
      HttpMethod.PUT,
      '/Driver/Update',
      driverDto,
      undefined,
      true
    );
  }

  // Delete a driver (soft delete)
  deleteDriver(id: number): Observable<ApiResponse<boolean>> {
    return this.apiCaller.makeRequest<boolean>(
      HttpMethod.DELETE,
      `/Driver/Delete?id=${id}`,
      null,
      undefined,
      true
    );
  }


}
