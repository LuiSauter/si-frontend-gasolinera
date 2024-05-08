import { createElement, lazy } from 'react'
import { companyRoutes, userRoutes } from '.'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { inventoryRoutes } from './inventory.utils'

const DashboardPage = lazy(() => import('@modules/dashboard'))
const SettingPage = lazy(() => import('@modules/settings/pages/setting'))
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
  {
    path: PrivateRoutes.SETTINGS,
    element: createElement(SettingPage)
  },
  ...userRoutes,
  ...companyRoutes,
  ...inventoryRoutes
]
