export class ApiResponse<T> {
  data?: T | null; // Allow null as a valid type for data
  status?: {
    code?: number; // Optional property
    message?: string; // Optional property
  };
  succeeded?: boolean; // Optional property

  constructor(data?: T | null, statusCode?: number, statusMessage?: string, succeeded?: boolean) {
    this.data = data; // `data` can now be `T`, `null`, or `undefined`
    this.status = {
      code: statusCode,
      message: statusMessage,
    };
    this.succeeded = succeeded;
  }
}



export interface PaginationApiResponse<T> {
  data: PaginationModel<T>;
  status?: {
    code?: number; // Optional property
    message?: string; // Optional property
  }; 
  succeeded: boolean;
}

export interface PaginationModel<T> {
  pageIndex: number; // Current page number
  pageSize: number; // Number of items per page
  rowsCount: number; // Total page count
  list: T[]; // Use 'list' to match the API response
}

