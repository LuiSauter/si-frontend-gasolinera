export enum PublicRoutes {
  LOGIN = '/login',
  RESET_PASSWORD = '/reset-password',
}

export enum PrivateRoutes {
  DASHBOARD = '/',
  USER = '/usuarios',
  ROLES = PrivateRoutes.USER + '/roles',
  PERMISSIONS = PrivateRoutes.USER + '/permisos',
  COMPANY = '/empresa',
  BRANCH = PrivateRoutes.COMPANY + '/sucursales',
}

export interface Route {
  path: PrivateRoutes | PublicRoutes | '/*'
  element: JSX.Element | JSX.Element[]
  permission?: string
}
