export class ApiResponse<T> {
  data?: T; // Optional property
  status?: {
    code?: number; // Optional property
    message?: string; // Optional property
  };
  succeeded?: boolean; // Optional property


  constructor(data?: T, statusCode?: number, statusMessage?: string, succeeded?: boolean) {
    this.data = data;
    this.status = {
      code: statusCode,
      message: statusMessage,
    };
    this.succeeded = succeeded;
  }




}


