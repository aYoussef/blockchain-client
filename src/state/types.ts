export interface BackendResponse<T> {
  loading: boolean;
  data: T | undefined;
  error?: string;
}
