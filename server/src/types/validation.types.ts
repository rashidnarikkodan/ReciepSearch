export interface ValidationResult<T> {
  isValid: boolean;
  errors?: string[];
  sanitized?: T;
}
