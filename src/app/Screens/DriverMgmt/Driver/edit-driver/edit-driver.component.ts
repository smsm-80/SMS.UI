import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SyslookupDataService } from '../../../../Services/Sys/Main/SysLookup/syslookup-data.service';
import { DriverDto } from '../../../../Modules/DriverMgmt/Driver/Driver';
import { DriverService } from '../../../../Services/DriverMgmt/Drivers/DriverService';
import { ReactiveFormsModule } from '@angular/forms';  // Import this



@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class EditDriverComponent implements OnInit {
  editDriverForm: FormGroup;
  paymentTypes: any[] = [];
  driverTypes: any[] = [];
  driverId: number=0; // Store the ID of the driver being edited

  constructor(
    private fb: FormBuilder,
    private syslookupDataService: SyslookupDataService,
    private driverService: DriverService,
    private route: ActivatedRoute,  // To get driver ID from route parameters
    private router: Router          // To navigate after success
  ) {
    this.editDriverForm = this.fb.group({
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
      PerTripRate: [null],
    });
  }

  ngOnInit(): void {
    // Get driver ID from URL
    this.driverId = +this.route.snapshot.paramMap.get('id')!; // Get driver ID from route parameter
    this.syslookupDataService.BindListData(this.driverTypes,1);
    this.syslookupDataService.BindListData(this.paymentTypes,2);
    this.loadDriverData(); // Load driver data for editing
  }



  // Load driver data to edit
  loadDriverData(): void {
    this.driverService.getDriverById(this.driverId).subscribe({
      next: (driver) => {
        // Populate form with the driver data
        this.editDriverForm.patchValue({
          ...driver,
          Status: driver.data?.status?.toString(), // Ensure correct type for form control
          VehicleID: driver.data?.vehicleId?.toString(),
          PaymentTypeCode: driver.data?.paymentTypeCode?.toString(),
          DriverTypeCode: driver.data?.driverTypeCode?.toString(),
          MonthlySalary: driver.data?.monthlySalary?.toString(),
          FixedMonthlyAmount: driver.data?.fixedMonthlyAmount?.toString(),
          PerTripRate: driver.data?.perTripRate?.toString(),
        });
      },
      error: (error) => {
        console.error('Error loading driver data', error);
      },
    });
  }

  // Submit the form to update the driver
  onSubmit(): void {
    if (this.editDriverForm.valid) {
      const formValue = this.editDriverForm.value;

      // Convert form values to match the expected data format
      const driverDto: DriverDto = {
        ...formValue,
        id:this.driverId,
        Status: parseInt(formValue.Status, 10),
        VehicleID: parseInt(formValue.VehicleID, 10),
        PaymentTypeCode: parseInt(formValue.PaymentTypeCode, 10),
        DriverTypeCode: parseInt(formValue.DriverTypeCode, 10),
        MonthlySalary: parseFloat(formValue.MonthlySalary),
        FixedMonthlyAmount: parseFloat(formValue.FixedMonthlyAmount),
        PerTripRate: parseFloat(formValue.PerTripRate),
      };

      this.driverService.updateDriver(driverDto).subscribe({
        next: (response) => {
          if (response.succeeded) {
            alert('Driver updated successfully!');
            this.router.navigate(['/drivers']); // Navigate to the drivers list or another page
          } else {
            console.error('Failed to update driver:', response);
            alert('Failed to update driver. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error updating driver:', error);
          alert('An error occurred while updating the driver. Please try again.');
        },
      });
    } else {
      console.log('Form is invalid:', this.editDriverForm.errors);
      alert('Please fill out the form correctly before submitting.');
    }
  }
}
