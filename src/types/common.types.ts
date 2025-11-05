/**
 * Generic API Response
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

/**
 * Error Response
 */
export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

/**
 * Pageable
 */
export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

/**
 * Page Response
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

/**
 * Sort Object
 */
export interface SortObject {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

/**
 * File Upload Response
 */
export interface FileUploadResponse {
  id: number;
  fileName: string;
  downloadUrl: string;
  fileType: string;
  size: number;
  message: string;
}

/**
 * Select Option
 */
export interface SelectOption {
  value: string;
  label: string;
}
