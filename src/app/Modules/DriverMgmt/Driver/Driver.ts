export class DriverDto {
    id!: number; // Driver ID (inherited from BaseDto in backend)
    idCardNo?: string; // Driver's ID Card Number
    fullName?: string; // Driver's Full Name
    code?: string; // Driver Code
    licenseNumber?: string; // Driver's License Number
    licenseExpiryDate?: Date; // Expiry Date of Driver's License
    contactNumber?: string; // Driver's Contact Number
    address?: string; // Driver's Address
    emergencyContact?: string; // Emergency Contact Details
    status?: number; // Status (e.g., Active, Inactive, Suspended)
    hireDate?: Date; // Date of Hiring
    vehicleId?: number; // ID of the Assigned Vehicle
  
    // Payment Information
    paymentTypeCode?: number; // Lookup Code for Payment Type
    paymentType?: string; // Payment Type Name (e.g., Cash, Salary)
    driverTypeCode?: number; // Lookup Code for Driver Type
    driverType?: string; // Driver Type Name (e.g., Full-time, Part-time)
    monthlySalary?: number; // Monthly Salary Amount
    fixedMonthlyAmount?: number; // Fixed Monthly Allowance
    perTripRate?: number; // Payment Per Trip
  }
  

  export class DriverSearchDto {
    id?: number; // Driver ID for filtering
    fullName?: string; // Filter by Driver's Full Name
    licenseNumber?: string; // Filter by License Number
    status?: number; // Filter by Status (Active, Inactive, Suspended)
    driverTypeCode?: number; // Filter by Driver Type Code
    paymentTypeCode?: number; // Filter by Payment Type Code
    hireDate?: Date; // Filter by Hire Date
    pageNumber?: number = 1; // Pagination: Current Page Number (default: 1)
    pageSize?: number = 10; // Pagination: Number of Items per Page (default: 10)
  }
  