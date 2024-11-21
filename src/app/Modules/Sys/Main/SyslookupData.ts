import {BaseModule} from '../../Common/BaseModule';

export interface SyslookupData extends BaseModule<number> {
    code: string | null;
    name: string | null;
    name2: string | null;
    categoriesID: number | null;
    sortNo: number | null;
}

export interface SyslookupDataDto extends BaseModule<number> {
    code: string | null;      // Code can be a number or null
    name: string | null;      // Name in one language can be a string or null
    name2: string | null;     // Name in another language can be a string or null
    categoryId: number | null; // Category ID can be a number or null
    sortNo: number | null;    // Sort order number can be a number or null
  }
  
export interface SyslookupDataSearchDto extends BaseModule<number> {
  code?: string; // Optional search filter for code
  name?: string; // Optional search filter for name
  name2?: string; // Optional search filter for second name
  categoriesID?: number; // Optional search filter for categoriesID
  sortNo?: number; // Optional search filter for sort order
}


export interface SyslookupDataSearchDto extends BaseModule<number> {
  code?: string; // Optional search filter for code
  name?: string; // Optional search filter for name
  name2?: string; // Optional search filter for second name
  categoriesID?: number; // Optional search filter for categoriesID
  sortNo?: number; // Optional search filter for sort order
}

