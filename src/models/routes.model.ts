import { type PERMISSION } from '@/modules/auth/utils/permissions.constants'

export enum PublicRoutes {
  LOGIN = '/login',
  RESET_PASSWORD = '/reset-password',
}

export enum PrivateRoutes {
  DASHBOARD = '/',
  SETTINGS = '/configuracion',
  // users
  USER = '/usuarios',
  USER_CREAR = PrivateRoutes.USER + '/crear',
  USER_EDIT = PrivateRoutes.USER + '/:id',
  ROLES = PrivateRoutes.USER + '/roles',
  ROLE_FORM = PrivateRoutes.ROLES + '/crear',
  ROLE_EDIT = PrivateRoutes.ROLES + '/:id',
  PERMISSIONS = PrivateRoutes.USER + '/permisos',
  PERMISSIONS_CREATE = PrivateRoutes.PERMISSIONS + '/crear',
  PERMISSIONS_EDIT = PrivateRoutes.PERMISSIONS + '/:id',
  // company
  COMPANY = '/empresa',
  BRANCH = PrivateRoutes.COMPANY + '/sucursales',
  BRANCH_CREATE = PrivateRoutes.BRANCH + '/crear',
  BINACLE = PrivateRoutes.COMPANY + '/bitacora',
  // inventory
  PRODUCT = '/productos',
  PRODUCT_ADD = PrivateRoutes.PRODUCT + '/crear',
  PRODCUT_EDIT = PrivateRoutes.PRODUCT + '/:id',
  FUEL = PrivateRoutes.PRODUCT + '/combustibles',
  FUEL_ADD = PrivateRoutes.PRODUCT + '/combustibles/crear',
  FUEL_EDIT = PrivateRoutes.PRODUCT + '/combustibles/:id',
  CATEGORY = PrivateRoutes.PRODUCT + '/categorias',
  CATEGORY_CREAR = PrivateRoutes.CATEGORY + '/crear',
  CATEGORY_EDIT = PrivateRoutes.CATEGORY + '/:id',
  GROUP = PrivateRoutes.PRODUCT + '/grupos',
  GROUP_CREAR = PrivateRoutes.GROUP + '/crear',
  GROUP_EDIT = PrivateRoutes.GROUP + '/:id',
  // Buys
  PROVIDER = '/proveedores',
  PROVIDER_CREATE = PrivateRoutes.PROVIDER + '/crear',
  PROVIDER_EDIT = PrivateRoutes.PROVIDER + '/:id'
}

export interface Route {
  path: PrivateRoutes | PublicRoutes | '/*'
  element: JSX.Element | JSX.Element[]
  permissions?: PERMISSION[]
}
