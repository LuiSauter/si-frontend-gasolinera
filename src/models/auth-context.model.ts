import { type AuthLogin } from '@/modules/auth/models/login.model'
import { type authStatus } from '@/utils'

export interface AuthContextState {
  status: authStatus
  error: string[] | string
  signWithEmailPassword: (loginForm: AuthLogin) => Promise<void>
  // recoverPasswordWithEmail: (email: string) => Promise<boolean | undefined>
  // resetPasswordWithEmail: (loginForm: AuthLoginWithToken) => Promise<boolean | undefined>
  signOut: () => void
  isMutating: boolean
}
