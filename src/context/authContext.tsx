import { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { STORAGE_TOKEN, authStatus, getStorage } from '../utils'
import { type AuthContextState } from '../models'
import { resetUser } from '@/redux/slices/user.slice'
import { type ChildrenProps } from '@/models/common.model'

export const AuthContext = createContext<AuthContextState>({} as AuthContextState)

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [status, setStatus] = useState<authStatus>(authStatus.loading)
  const [error, setError] = useState<string[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([])
      }, 5000)
      return () => { clearTimeout(timer) }
    }
  }, [error])

  useEffect(() => {
    const checkAuthStatus = () => {
      const accessToken = getStorage(STORAGE_TOKEN)
      if (!accessToken) {
        setStatus(authStatus.unauthenticated)
        dispatch(resetUser())
        return
      }
      // development: simule que NO estamos autenticados
      setStatus(authStatus.unauthenticated)
    }
    checkAuthStatus()
    return () => { }
  }, [])

  return (
    <AuthContext.Provider value={{ status, error }}>
      {children}
    </AuthContext.Provider>
  )
}
