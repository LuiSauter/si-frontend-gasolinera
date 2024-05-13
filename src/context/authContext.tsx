import { createContext, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { STORAGE_TOKEN, STORAGE_USER, authStatus, getStorage, removeStorage } from '../utils'
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
  // const { recoverPassword, isRecoveringPassword } = useRecoverPassword()
  // const { resetPassword, isResettingThePassword } = useResetPasword()
  // const { getAllActiveModules } = useGetAllActiveModules()

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
        setStatus(authStatus.authenticated)
        dispatch(resetUser())
        removeStorage(STORAGE_USER)
        return
      }
      try {
        const responseUser = await checkToken({ token })
        // const resposeModules = await getAllActiveModules()
        dispatch(createUser(responseUser))
        // dispatch(addActiveModules(resposeModules))
        setStatus(authStatus.authenticated)
      } catch (error) {
        removeStorage(STORAGE_TOKEN)
        removeStorage(STORAGE_USER)
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
    dispatch(resetUser())
    // dispatch(resetActiveModules())
    setStatus(authStatus.unauthenticated)
  }

  const signWithEmailPassword = async (formData: AuthLogin) => {
    try {
      // if (!isEmailValid(formData.email)) throw new Error('Su correo electronico es inválido')
      if (formData.password === '') throw new Error('La contraseña es requerida')
      setStatus(authStatus.loading)
      const userResponse = await authLogin(formData)
      // const modulesResponse = await getAllActiveModules()
      dispatch(createUser(userResponse))
      // dispatch(addActiveModules(modulesResponse))
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

  // const recoverPasswordWithEmail = async (email: string) => {
  //   try {
  //     // if (!isEmailValid(email)) throw new Error('Su correo electronico es inválido')
  //     // setStatus(authStatus.loading)
  //     // const response = await recoverPassword({ email })
  //     // setStatus(authStatus.unauthenticated)
  //     // if (response.statusCode === 200) return true
  //     // setError(['Error al enviar el correo de recuperación de contraseña'])
  //     return false
  //   } catch (error: Error | any) {
  //     // if (!error.errorInfo) {
  //     //   setError([error.message])
  //     // } else {
  //     //   setError([error.errorInfo?.message ?? 'Servicio no disponible, intente más tarde.'])
  //     // }
  //   } finally {
  //     setStatus(authStatus.unauthenticated)
  //   }
  // }

  // const resetPasswordWithEmail = async ({ password, passwordConfirm, token }: { password: string, passwordConfirm: string, token: string }): Promise<boolean | undefined> => {
  //   try {
  //     if (password === '') throw new Error('La contraseña es requrida')
  //     if (password !== passwordConfirm) throw new Error('Las contraseñas no coinciden')
  //     setStatus(authStatus.loading)
  //     const response: User = await resetPassword({ password, token })
  //     dispatch(createUser(response))
  //     setStatus(authStatus.unauthenticated)
  //     return true
  //   } catch (error: Error | any) {
  //     if (!error.errorInfo) {
  //       setError([error.message])
  //     } else {
  //       setError([error.errorInfo?.message ?? 'Servicio no disponible, intente más tarde.'])
  //     }
  //     setStatus(authStatus.unauthenticated)
  //     throw new Error('Error al restablecer la contraseña')
  //   }
  // }

  const value = useMemo(() => {
    return { status, error, signOut, signWithEmailPassword, isMutating: isLoggingIn }
  }, [status, error, isLoggingIn])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
