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
  PERMISSIONS = PrivateRoutes.USER + '/permisos',
  // company
  COMPANY = '/empresa',
  BRANCH = PrivateRoutes.COMPANY + '/sucursales',
}

export interface Route {
  path: PrivateRoutes | PublicRoutes | '/*'
  element: JSX.Element | JSX.Element[]
  permission?: string
}
