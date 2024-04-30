import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'

const UserPage = lazy(() => import('@modules/users/pages/users'))
const RolesPage = lazy(() => import('@modules/auth/pages/roles'))
const PermissionsPage = lazy(() => import('@modules/auth/pages/permissions'))

// TODO: add permissions to routes
export const userRoutes: Route[] = [
  {
    path: PrivateRoutes.USER,
    element: createElement(UserPage)
  },
  {
    path: PrivateRoutes.ROLES,
    element: createElement(RolesPage)
  },
  {
    path: PrivateRoutes.PERMISSIONS,
    element: createElement(PermissionsPage)
  }
]
