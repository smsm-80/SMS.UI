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
import { SyslookupDataSearchDto } from '../../../../Modules/Sys/Main/SyslookupData';


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
    CommonModule
  ],
})
export class AddDriverComponent implements AfterViewInit {
  addDriverForm: FormGroup;
  paymentTypes: any[] = [];
  driverTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private syslookupDataService: SyslookupDataService
  ) {
    this.addDriverForm = this.fb.group({
      IDCardNo: [''],
      FullName: ['', Validators.required],
      Code: ['', Validators.required],
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
    this.loadPaymentTypes();
    this.loadDriverTypes();
  }

  // Method to load payment types from the API
  loadPaymentTypes(): void {
    this.syslookupDataService.BindListData(2).subscribe({
      next: (data) => {
        this.paymentTypes = data; // Update paymentTypes with the fetched data

      },
      error: (error) => {
        console.error('Error loading payment types', error);
      }
    });
  }
  





  // Method to load driver types from the API
  loadDriverTypes(): void {
    this.syslookupDataService.BindListData(1).subscribe({
      next:  (data) => {
        this.driverTypes = data; // Update driverTypes with the fetched data
      },
      error: (error) => {
        console.error('Error loading driver types', error);
      }
    });
  }

  onSubmit(): void {
    if (this.addDriverForm.valid) {
      console.log('Form Submitted', this.addDriverForm.value);
      // Process the form data here, e.g., call an API to save the driver data.
    }
  }
}