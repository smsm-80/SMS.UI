import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DriverService } from '../../../../Services/DriverMgmt/Drivers/DriverService'; 
import { DriverDto } from '../../../../Modules/DriverMgmt/Driver/Driver'; 
import { DriverSearchDto } from '../../../../Modules/DriverMgmt/Driver/Driver';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input'; 
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SyslookupDataService } from '../../../../Services/Sys/Main/SysLookup/syslookup-data.service';
import { MatSelect,MatOption } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [
    MatTableModule, MatPaginatorModule, MatSortModule,MatInputModule,
    MatSelect,MatOption,MatDatepickerModule,MatNativeDateModule,FormsModule,
    MatSelectModule,MatFormFieldModule,ReactiveFormsModule
  ],
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})

// export class DriverListComponent implements OnInit, AfterViewInit {
export class DriverListComponent implements OnInit,AfterViewInit {
  filterForm: FormGroup;
  displayedColumns: string[] = ['code', 'idCardNo', 'fullName', 'actions'];
  drivers = new MatTableDataSource<DriverDto>([]);
  rowsCount: number = 0;
  pageSize: number = 5;
  pageIndex: number = 1;
  paymentTypes: any[] = [];
  driverTypes: any[] = [];

  constructor(private driverService: DriverService,private router: Router, private syslookupDataService: SyslookupDataService,  private fb: FormBuilder,) 
  {
    this.filterForm = this.fb.group({
      paymentTypeCode: [null],
      driverTypeCode: [null],
      Status: [null],
      fullName: [''],
      licenseNumber: [''],
      hireDate: [''],
    });
  }
  




  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.drivers.paginator = this.paginator;
    this.syslookupDataService.BindListData(this.driverTypes,1);
    this.syslookupDataService.BindListData(this.paymentTypes,2);
  }
  
  
  ngOnInit(): void {
    this.loadDrivers();  // Load drivers
  }


  loadDrivers(): void {
    const driverSearchDto: DriverSearchDto = {
      ...this.filter, // Include filter criteria dynamically
      pageNumber: this.pageIndex,
      pageSize: this.pageSize*2,
    };

    this.driverService.getAllDrivers(driverSearchDto).subscribe((response) => {
      console.log(response); 
      if (response.succeeded && response.data) {
        this.drivers.data = response.data.list.map(driver => ({
          FullName: driver.fullName,
          Code: driver.code,
          IDCardNo: driver.idCardNo,
          ...driver
        }));
        this.rowsCount = response.data.rowsCount;
      } else {
        console.error(response.status?.message || 'Failed to fetch drivers');
      }
    });
  }


  filter: DriverSearchDto = {
    id: undefined,
    fullName: '',
    licenseNumber: '',
    status: undefined,
    driverTypeCode: undefined,
    paymentTypeCode: undefined,
    hireDate: undefined,
    pageNumber: 1,
    pageSize: this.pageSize,
  };
  
  applyFilters(): void {
    this.pageIndex = 1; // Reset to the first page when filters are applied
    this.loadDrivers();
  }
  
  clearFilters(): void {
    this.filter = {
      id: undefined,
      fullName: '',
      licenseNumber: '',
      status: undefined,
      driverTypeCode: undefined,
      paymentTypeCode: undefined,
      hireDate: undefined,
      pageNumber: 1,
      pageSize: this.pageSize,
    };
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadDrivers();
  }
  
  editDriver(driver: DriverDto): void {
    this.router.navigate(['/DriverMgmt/EditDriver', driver.id]);
  }
  

  deleteDriver(driverId: number): void {
    this.driverService.deleteDriver(driverId).subscribe((response) => {
       if(response.succeeded)
       {
        console.log("show sucess messg")
        this.loadDrivers();
       }
    })
  }

  AddDriver() {
    this.router.navigate(['/DriverMgmt/AddDriver']);
  }




}

