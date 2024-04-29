import { createElement, lazy } from 'react'

export enum PublicRoutes {
  LANDING = '/',
  LOGIN = '/login',
  REGISTER = '/register'
}

export enum PrivateRoutes {
  DASHBOARD = '/dashboard',
  USER = '/user',
  TASK = '/task',
  TASK_ID = '/task/:id',
}

const UserPage = lazy(() => import('@/pages/user'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const NotFound = lazy(() => import('@/components/not-found'))

export const PrivateAllRoutes = [
  {
    path: PrivateRoutes.DASHBOARD,
    element: createElement(DashboardPage)
  },
  {
    path: PrivateRoutes.USER,
    element: createElement(UserPage)
  },
  {
    path: '/*',
    element: createElement(NotFound)
  }
]
