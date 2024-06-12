import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

const DispenserPage = lazy(() => import('@/modules/sales/pages/dispenser'))
const DispenserForm = lazy(() => import('@/modules/sales/pages/dispenser/components/dispenser-form'))

export const salesRoutes: Route[] = [
  {
    path: PrivateRoutes.DiSPENSER,
    element: createElement(DispenserPage),
    permissions: [PERMISSION.DISPENSER, PERMISSION.DISPENSER_SHOW]
  },
  {
    path: PrivateRoutes.DiSPENSER_CREATE,
    element: createElement(DispenserForm, { buttonText: 'Guardar Dispensador', title: 'Crear Dispensador' }),
    permissions: [PERMISSION.DISPENSER]
  },
  {
    path: PrivateRoutes.DISPENSER_EDIT,
    element: createElement(DispenserForm, { buttonText: 'Editar Dispensador', title: 'Actualizar Dispensador' }),
    permissions: [PERMISSION.DISPENSER]
  }
]
