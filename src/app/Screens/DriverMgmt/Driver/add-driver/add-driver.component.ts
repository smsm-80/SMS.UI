import { Component ,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule  } from '@angular/common';
import { SyslookupDataService } from '../../../../Services/Sys/Main/SysLookup/syslookup-data.service';
import { DriverDto } from '../../../../Modules/DriverMgmt/Driver/Driver';
import { DriverService } from '../../../../Services/DriverMgmt/Drivers/DriverService';


@Component({
  standalone: true,
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css'],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class AddDriverComponent implements AfterViewInit {
  addDriverForm: FormGroup;
  paymentTypes: any[] = [];
  driverTypes: any[] = [];


  constructor(
    private fb: FormBuilder,
    private syslookupDataService: SyslookupDataService,
    private driverService:DriverService
  ) {
    this.addDriverForm = this.fb.group({
      IDCardNo: [''],
      FullName: ['', Validators.required],
      Code: [null],
      LicenseNumber: [''],
      LicenseExpiryDate: [null],
      ContactNumber: [''],
      Address: [''],
      EmergencyContact: [''],
      Status: [null],
      HireDate: [null],
      VehicleID: [null],
      PaymentTypeCode: [null, Validators.required],
      DriverTypeCode: [null, Validators.required],
      MonthlySalary: [null],
      FixedMonthlyAmount: [null],
      PerTripRate: [null]
    });
  }



  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called 1'+this.driverTypes.length);
    this.syslookupDataService.BindListData(this.driverTypes, 1);
    console.log('ngAfterViewInit called 2'+this.driverTypes.length);
    console.log('--------------------------------------------------');
    console.log('ngAfterViewInit called 3'+this.paymentTypes.length);
    this.syslookupDataService.BindListData(this.paymentTypes, 2);
    console.log('ngAfterViewInit called 4'+this.paymentTypes.length);
  }

  onSubmit(): void {
    if (this.addDriverForm.valid) {
      // Prepare the form data as a DriverDto
      const formValue = this.addDriverForm.value;

      // Convert form values to match the server's expected types
      const driverDto: DriverDto = {
        ...formValue,
        Status: parseInt(formValue.Status, 10),
        VehicleID: parseInt(formValue.VehicleID, 10),
        PaymentTypeCode: parseInt(formValue.PaymentTypeCode, 10),
        DriverTypeCode: parseInt(formValue.DriverTypeCode, 10),
        MonthlySalary: parseFloat(formValue.MonthlySalary),
        FixedMonthlyAmount: parseFloat(formValue.FixedMonthlyAmount),
        PerTripRate: parseFloat(formValue.PerTripRate),
      };
      
      // Call the service to create the driver
      this.driverService.createDriver(driverDto).subscribe({
        next: (response) => {
          if (response.succeeded) {
            // Show success message or handle success action
            console.log('Driver created successfully:', response.data);
            alert('Driver created successfully!');
            this.addDriverForm.reset(); // Reset the form
          } else {
            // Handle API response indicating failure
            console.error('Failed to create driver:', response);
            alert('Failed to create driver. Please try again.');
          }
        },
        error: (err) => {
          // Handle network or server errors
          console.error('Error creating driver:', err);
          alert('An error occurred while creating the driver. Please try again.');
        },
      });
    } else {
      // Show validation errors
      console.log('Form is invalid:', this.addDriverForm.errors);
      alert('Please fill out the form correctly before submitting.');
    }
  }







}