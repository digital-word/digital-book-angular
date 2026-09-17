import { Pagination } from './pagination.model';

export interface ListRes<T> {
  success: boolean;
  data: T[];
  message: string;
  timestamp: string;
  pagination: Pagination;
}

export interface DetailsRes<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}
