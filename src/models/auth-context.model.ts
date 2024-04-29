import { type authStatus } from '@/utils'

export interface AuthContextState {
  status: authStatus
  error: string[] | string
}
