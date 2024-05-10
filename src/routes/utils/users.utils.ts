import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'

const UserPage = lazy(() => import('@modules/users/pages/users'))
const UserFormPage = lazy(() => import('@modules/users/pages/users/components/user-form'))
const RolesPage = lazy(() => import('@modules/auth/pages/roles'))
const RolesFormPage = lazy(() => import('@modules/auth/pages/roles/components/role-form'))
const PermissionsPage = lazy(() => import('@/modules/auth/pages/permissions'))
const PermissionsFormPage = lazy(() => import('@/modules/auth/pages/permissions/components/permissions-form'))

// TODO: add permissions to routes
export const userRoutes: Route[] = [
  {
    path: PrivateRoutes.USER,
    element: createElement(UserPage)
  },
  {
    path: PrivateRoutes.USER_CREAR,
    element: createElement(UserFormPage)
  },
  {
    path: PrivateRoutes.USER_EDIT,
    element: createElement(UserFormPage)
  },
  {
    path: PrivateRoutes.ROLES,
    element: createElement(RolesPage)
  },
  {
    path: PrivateRoutes.ROLE_FORM,
    element: createElement(RolesFormPage)
  },
  {
    path: PrivateRoutes.ROLE_EDIT,
    element: createElement(RolesFormPage)
  },
  {
    path: PrivateRoutes.PERMISSIONS,
    element: createElement(PermissionsPage)
  },
  {
    path: PrivateRoutes.PERMISSIONS_CREATE,
    element: createElement(PermissionsFormPage)
  },
  {
    path: PrivateRoutes.PERMISSIONS_EDIT,
    element: createElement(PermissionsFormPage)
  }
]
