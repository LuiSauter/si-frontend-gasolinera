import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

const DispenserPage = lazy(() => import('@/modules/sales/pages/dispenser'))
const DispenserForm = lazy(() => import('@/modules/sales/pages/dispenser/components/dispenser-form'))
const DiscountPage = lazy(() => import('@/modules/sales/pages/discount'))
const DiscountForm = lazy(() => import('@/modules/sales/pages/discount/components/discount-form'))

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
  },
  {
    path: PrivateRoutes.DISCOUNT,
    element: createElement(DiscountPage),
    permissions: [PERMISSION.DISCOUNT, PERMISSION.DISCOUNT_SHOW]
  },
  {
    path: PrivateRoutes.DISCOUNT_CREATE,
    element: createElement(DiscountForm, { buttonText: 'Guardar Descuento', title: 'Crear Descuento' }),
    permissions: [PERMISSION.DISCOUNT]
  },
  {
    path: PrivateRoutes.DISCOUNT_EDIT,
    element: createElement(DiscountForm, { buttonText: 'Editar Descuento', title: 'Actualizar Descuento' }),
    permissions: [PERMISSION.DISCOUNT]
  }
]
