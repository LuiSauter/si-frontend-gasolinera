import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { authStatus } from '@/utils'
import { useAuth } from '@/hooks'
import { type ChildrenProps } from '@/models'
import Loading from '@/components/shared/loading'

interface ProtectedRouteProps extends Partial<ChildrenProps> {
  isPrivate?: boolean
  redirectTo?: string
}

const ProtectedRoute = (
  { isPrivate = false, redirectTo = '/login', children }: ProtectedRouteProps
) => {
  const { status } = useAuth()
  const [render, setRender] = useState(true)

  let subscribe = false
  useEffect(() => {
    !subscribe && setRender(false)
    return () => {
      subscribe = true
    }
  }, [])

  if (render && status === authStatus.loading) {
    console.log(status, 'render')
    return (
      <div className='grid place-content-center place-items-center min-h-screen text-action'>
        <Loading />
      </div>
    )
  } else if ((status === authStatus.unauthenticated && isPrivate) ||
    (status === authStatus.authenticated && !isPrivate)) {
    console.log(status, 'navigate')

    return <Navigate to={redirectTo} replace />
  } else {
    return children ?? <Outlet />
  }
}

export default ProtectedRoute
