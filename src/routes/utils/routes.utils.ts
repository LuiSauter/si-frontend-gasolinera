import { createElement, lazy } from 'react'
import { companyRoutes, userRoutes } from '.'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { inventoryRoutes } from './inventory.utils'
import { type PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { buyRoutes } from './buy.utils'

const DashboardPage = lazy(() => import('@modules/dashboard'))
const SettingPage = lazy(() => import('@modules/settings/pages/setting'))
const NotFound = lazy(() => import('@/components/not-found'))

export const PrivateAllRoutes: Route[] = [
  {
    path: '/*',
    element: createElement(NotFound),
    permissions: [] as PERMISSION[]
  },
  {
    path: PrivateRoutes.DASHBOARD,
    element: createElement(DashboardPage),
    permissions: [] as PERMISSION[]
  },
  {
    path: PrivateRoutes.SETTINGS,
    element: createElement(SettingPage),
    permissions: [] as PERMISSION[]
  },
  ...userRoutes,
  ...companyRoutes,
  ...inventoryRoutes,
  ...buyRoutes
]
