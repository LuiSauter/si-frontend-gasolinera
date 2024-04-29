import { Route, Routes as BaseRoutes } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from '../utils/routes.utils'
import ProtectedRoute from './protectedRoute'
import Private from './private.routes'
import { lazy } from 'react'

const LoginPage = lazy(() => import('@/pages/login'))
const RegisterPage = lazy(() => import('@/pages/register'))
const LandingPage = lazy(() => import('@/pages/landing'))

const Routes = () => {
  return (
    <BaseRoutes>
      {/* Rutas públicas, pero si ya está autenticado ocultar dichas rutas */}
      <Route path={PublicRoutes.LANDING} element={<LandingPage />} />
      <Route element={<ProtectedRoute redirectTo={PrivateRoutes.DASHBOARD} />}>
        <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
        <Route path={PublicRoutes.REGISTER} element={<RegisterPage />} />
      </Route>
      {/* Rutas privadas */}
      <Route element={<ProtectedRoute isPrivate redirectTo={PublicRoutes.LOGIN} />}>
        <Route path='/*' element={<Private />} />
      </Route>
    </BaseRoutes >
  )
}

export default Routes
