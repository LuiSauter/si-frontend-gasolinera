import { PrivateRoutes, type Route } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { createElement, lazy } from 'react'

const CompanyPage = lazy(() => import('@/modules/company/pages/company'))
const BranchesPage = lazy(() => import('@/modules/company/pages/branches'))
const BranchesFormPage = lazy(() => import('@/modules/company/pages/branches/components/branches-form'))
const BinaclePage = lazy(() => import('@modules/company/pages/binnacle'))

export const companyRoutes: Route[] = [
  {
    path: PrivateRoutes.COMPANY,
    element: createElement(CompanyPage),
    permissions: [PERMISSION.COMPANY]
  },
  {
    path: PrivateRoutes.BRANCH,
    element: createElement(BranchesPage),
    permissions: [PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW]
  },
  {
    path: PrivateRoutes.BRANCH_CREATE,
    element: createElement(BranchesFormPage, { buttonText: 'Guardar', title: 'Crear Sucursal' }),
    permissions: [PERMISSION.BRANCH]
  },
  {
    path: PrivateRoutes.BINACLE,
    element: createElement(BinaclePage),
    permissions: [PERMISSION.BINNACLE]
  }
]
