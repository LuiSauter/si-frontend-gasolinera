import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import { PrivateAllRoutes } from './utils/routes.utils'
import { SidebarProvider } from '@/context/sidebarContext'
import { HeaderProvider } from '@/context/headerContext'
import { useAuthorization } from '@/hooks/useAuthorization'

const Layout = lazy(() => import('@/layout/index'))

const Private = () => {
  const { verifyPermission } = useAuthorization()

  return (
    <Routes>
      <Route element={
        <SidebarProvider>
          <HeaderProvider>
            <Layout />
          </HeaderProvider>
        </SidebarProvider>
      }>
        {
          PrivateAllRoutes.map(({ element, path, permissions }, index) => {
            if (permissions?.length === 0 || verifyPermission(permissions!)) {
              return (
                <Route key={index} path={path} element={element} />
              )
            } else {
              return undefined
            }
          })
        }

      </Route >
    </Routes >
  )
}

export default Private
