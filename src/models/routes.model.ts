export enum PublicRoutes {
  LOGIN = '/login',
  RESET_PASSWORD = '/reset-password',
}

export enum PrivateRoutes {
  DASHBOARD = '/',
  SETTINGS = '/configuracion',
  // users
  USER = '/usuarios',
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
  FUEL = PrivateRoutes.PRODUCT + '/combustibles',
  FUEL_ADD = PrivateRoutes.PRODUCT + '/combustibles/crear',
  CATEGORY_GROUP = PrivateRoutes.PRODUCT + '/categorias-grupos',
  CATEGORY_GROUP_ADD = PrivateRoutes.CATEGORY_GROUP + '/crear',
}

export interface Route {
  path: PrivateRoutes | PublicRoutes | '/*'
  element: JSX.Element | JSX.Element[]
  permission?: string
}
