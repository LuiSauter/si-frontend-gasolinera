import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

const ProviderPage = lazy(() => import('@/modules/buy/pages/provider'))
const ProviderFormPage = lazy(() => import('@/modules/buy/pages/provider/components/provider-form'))

export const buyRoutes: Route[] = [
  {
    path: PrivateRoutes.PROVIDER,
    element: createElement(ProviderPage),
    permissions: [PERMISSION.PROVIDER, PERMISSION.PROVIDER_SHOW]
  },
  {
    path: PrivateRoutes.PROVIDER_CREATE,
    element: createElement(ProviderFormPage, { buttonText: 'Guardar Proveedor', title: 'Crear Proveedor' }),
    permissions: [PERMISSION.PROVIDER]
  },
  {
    path: PrivateRoutes.PROVIDER_EDIT,
    element: createElement(ProviderFormPage, { buttonText: 'Editar Proveedor', title: 'Actualizar Proveedor' }),
    permissions: [PERMISSION.PROVIDER]
  }
]
