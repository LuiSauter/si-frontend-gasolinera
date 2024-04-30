import { createElement, lazy } from 'react'
import { companyRoutes, userRoutes } from '.'
import { PrivateRoutes, type Route } from '@/models/routes.model'

const DashboardPage = lazy(() => import('@modules/dashboard/index'))
const NotFound = lazy(() => import('@/components/not-found'))

export const PrivateAllRoutes: Route[] = [
  {
    path: '/*',
    element: createElement(NotFound)
  },
  {
    path: PrivateRoutes.DASHBOARD,
    element: createElement(DashboardPage)
  },
  ...userRoutes,
  ...companyRoutes
]
