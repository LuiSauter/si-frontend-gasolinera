import { Route, Routes as BaseRoutes } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import Private from './private.routes'
import { lazy } from 'react'
import { PrivateRoutes, PublicRoutes } from '@/models/routes.model'

const LoginPage = lazy(() => import('@modules/auth/pages/login'))

const Routes = () => {
  return (
    <BaseRoutes>
      {/* Rutas públicas, pero si ya está autenticado ocultar dichas rutas */}
      <Route element={<ProtectedRoute redirectTo={PrivateRoutes.DASHBOARD} />}>
        <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
      </Route>
      {/* Rutas privadas */}
      <Route element={<ProtectedRoute isPrivate redirectTo={PublicRoutes.LOGIN} />}>
        <Route path='/*' element={<Private />} />
      </Route>
    </BaseRoutes >
  )
}

export default Routes
