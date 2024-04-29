import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { type AuthContextState } from '../models'

const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext)
  return context
}

export { useAuth }
