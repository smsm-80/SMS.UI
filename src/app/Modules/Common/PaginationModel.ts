
  export interface PaginationModel<T> {
    totalItems: number; // Total count of items in the dataset
    currentPage: number; // Current page number
    pageSize: number; // Number of items per page
    totalPages: number; // Total page count
    data: T[]; // Array of items (generic type T)
  }
  