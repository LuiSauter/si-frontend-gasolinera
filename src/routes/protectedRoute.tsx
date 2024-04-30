import { Navigate, Outlet } from 'react-router-dom'

import { type ChildrenProps } from '@/models'

import Loading from '@/components/shared/loading'
import { useEffect, useState } from 'react'
import { authStatus } from '@/utils'
import { useAuth } from '@/hooks'

interface ProtectedRouteProps extends Partial<ChildrenProps> {
  isPrivate?: boolean
  redirectTo?: string
}

const ProtectedRoute = ({ isPrivate = false, redirectTo = '/login', children }: ProtectedRouteProps) => {
  const { status } = useAuth()
  const [render, setRender] = useState(true)

  let subscribe = false
  useEffect(() => {
    !subscribe && setRender(false)
    return () => {
      subscribe = true
    }
  }, [])

  if (render) {
    return (
      <div className='flex gap-4 min-h-screen justify-center items-center text-action text-light-action dark:text-dark-action'>
        <Loading /><span className='text-light-text-secondary dark:text-dark-text-secondary'>Gasolinera S.A.</span>
      </div>
    )
  }

  if ((status === authStatus.unauthenticated && isPrivate) ||
    (status === authStatus.authenticated && !isPrivate)) {
    return <Navigate to={redirectTo} replace />
  }

  return children ?? <Outlet />
}

export default ProtectedRoute
