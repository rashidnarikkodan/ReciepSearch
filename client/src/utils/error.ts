import axios from 'axios';

export function getErrorMessage(
  error: unknown,
  fallbackMessage: string = 'An unexpected error occurred. Please try again.'
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data) {
      if (typeof data.message === 'string' && data.message.trim()) {
        return data.message;
      }
      if (typeof data.error === 'string' && data.error.trim()) {
        return data.error;
      }
      if (typeof data.error?.message === 'string' && data.error.message.trim()) {
        return data.error.message;
      }
      if (Array.isArray(data.error?.details) && data.error.details.length > 0) {
        const first = data.error.details[0];
        if (typeof first?.message === 'string') {
          return first.message;
        }
      }
    }

    if (error.response?.status === 401) {
      return 'Invalid email or password. Please try again.';
    }
    if (error.response?.status === 403) {
      return 'You do not have permission to perform this action.';
    }
    if (error.response?.status === 404) {
      return 'The requested resource could not be found.';
    }
    if (error.response?.status === 409) {
      return 'An account with this email already exists.';
    }
    if (error.response?.status && error.response.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Please check your internet connection.';
    }
    if (error.message && !error.message.startsWith('Request failed with status code')) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message && !error.message.startsWith('Request failed with status code')) {
    return error.message;
  }

  return fallbackMessage;
}
