/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    code: string;
    statusCode: number;
    fields?: Record<string, string[]>;
  };
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Common database fields
 */
export interface TimestampFields {
  created_at: string;
  updated_at: string;
}

/**
 * Entity status
 */
export type EntityStatus = 'draft' | 'published' | 'archived';

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Filter operator
 */
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in';
