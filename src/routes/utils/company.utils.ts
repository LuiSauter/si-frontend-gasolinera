import { PrivateRoutes, type Route } from '@/models/routes.model'
import { createElement, lazy } from 'react'

const CompanyPage = lazy(() => import('@modules/company/pages/company'))
const BranchesPage = lazy(() => import('@modules/company/pages/branches'))

// TODO: add permissions to routes
export const companyRoutes: Route[] = [
  {
    path: PrivateRoutes.COMPANY,
    element: createElement(CompanyPage)
  },
  {
    path: PrivateRoutes.BRANCH,
    element: createElement(BranchesPage)
  }
]
