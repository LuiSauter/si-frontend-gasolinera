import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import { PrivateRoutes } from '@/models/routes.model'
import { PrivateAllRoutes } from './utils/routes.utils'

const Layout = lazy(() => import('@/layout/index'))

const Private = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path='/'
          element={<Navigate to={PrivateRoutes.DASHBOARD} replace />}
        />

        {PrivateAllRoutes.map(({ element, path }, index) => (
          <Route key={index} path={path} element={element} />
        ))}

      </Route>
    </Routes>
  )
}

export default Private
