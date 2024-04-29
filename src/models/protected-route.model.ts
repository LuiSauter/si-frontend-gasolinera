export interface ProtectedRoute {
  isAllowed: boolean
  redirectTo?: string
  children?: React.ReactNode
}
