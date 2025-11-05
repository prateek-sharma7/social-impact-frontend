/**
 * Filter Option
 */
export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

/**
 * Number Range
 */
export interface NumberRange {
  min: number;
  max: number;
}

/**
 * Date Range
 */
export interface DateRange {
  min: string;
  max: string;
}

/**
 * Search Filters Response
 */
export interface SearchFiltersResponse {
  categories: FilterOption[];
  locations: FilterOption[];
  skills: FilterOption[];
  dateRange: DateRange;
  volunteersNeededRange: NumberRange;
}

/**

Project Search Request
*/
export interface ProjectSearchRequest {
  keyword?: string;
  categories?: string[];
  skills?: string[];
  location?: string;
  startDateFrom?: string;
  startDateTo?: string;
  minVolunteersNeeded?: number;
  maxVolunteersNeeded?: number;
  projectStatus?: string[];
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  page?: number;
  size?: number;
}
/**

Search Response
*/
export interface SearchResponse<T = any> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  facets: Record<string, number>;
}
