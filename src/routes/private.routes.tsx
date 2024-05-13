import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
// import { PrivateRoutes } from '@/models/routes.model'
import { PrivateAllRoutes } from './utils/routes.utils'
import { SidebarProvider } from '@/context/sidebarContext'
import { HeaderProvider } from '@/context/headerContext'

const Layout = lazy(() => import('@/layout/index'))

const Private = () => {
  return (
    <Routes>
      <Route element={
        <SidebarProvider>
          <HeaderProvider>
            <Layout />
          </HeaderProvider>
        </SidebarProvider>
      }>
        {/* <Route
          path='/'
          element={<Navigate to={PrivateRoutes.DASHBOARD} replace />}
        /> */}

        {
          PrivateAllRoutes.map(({ element, path }, index) => (
            <Route key={index} path={path} element={element} />
          ))
        }

      </Route >
    </Routes >
  )
}

export default Private
