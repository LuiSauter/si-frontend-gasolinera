import { createContext, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { STORAGE_BRANCH, STORAGE_TOKEN, STORAGE_USER, authStatus, getStorage, removeStorage } from '../utils'
import { type AuthContextState } from '../models'
import { createUser, resetUser } from '@/redux/slices/user.slice'
import { type ChildrenProps } from '@/models/common.model'
import { useAuthLogin, useCheckToken } from '@/modules/auth/hooks/useAuth'
import { type AuthLogin } from '@/modules/auth/models/login.model'

export const AuthContext = createContext<AuthContextState>({} as AuthContextState)

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [status, setStatus] = useState<authStatus>(authStatus.loading)
  const [error, setError] = useState<string[]>([])
  const { authLogin, isLoggingIn } = useAuthLogin()
  const { checkToken } = useCheckToken()

  const dispatch = useDispatch()

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([])
      }, 5000)
      return () => { clearTimeout(timer) }
    }
  }, [error])

  let subscribe = false
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getStorage(STORAGE_TOKEN)
      if (!token) {
        setStatus(authStatus.unauthenticated)
        dispatch(resetUser())
        removeStorage(STORAGE_USER)
        return
      }
      try {
        const responseUser = await checkToken({ token })
        dispatch(createUser(responseUser))
        setStatus(authStatus.authenticated)
      } catch (error) {
        removeStorage(STORAGE_TOKEN)
        removeStorage(STORAGE_USER)
        removeStorage(STORAGE_BRANCH)
        setStatus(authStatus.unauthenticated)
        dispatch(resetUser())
      }
    }
    if (!subscribe) {
      void checkAuthStatus()
    }
    return () => {
      subscribe = true
    }
  }, [])

  const signOut = () => {
    removeStorage(STORAGE_TOKEN)
    removeStorage(STORAGE_USER)
    removeStorage(STORAGE_BRANCH)
    dispatch(resetUser())
    setStatus(authStatus.unauthenticated)
  }

  const signWithEmailPassword = async (formData: AuthLogin) => {
    try {
      if (formData.password === '') throw new Error('La contraseña es requerida')
      setStatus(authStatus.loading)
      const userResponse = await authLogin(formData)
      dispatch(createUser(userResponse))
      setStatus(authStatus.authenticated)
    } catch (error: Error | any) {
      if (!error.errorInfo) {
        setError([error.message])
      } else {
        setError([error.errorInfo?.message ?? 'Servicio no disponible, intente más tarde.'])
      }
      setStatus(authStatus.unauthenticated)
    }
  }

  const value = useMemo(() => {
    return { status, error, signOut, signWithEmailPassword, isMutating: isLoggingIn }
  }, [status, error, isLoggingIn])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
