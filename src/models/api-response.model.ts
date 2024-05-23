export interface ApiResponse {
  statusCode?: number
  message?: string | string[]
  error?: string
  data?: any
  countData?: number
}
