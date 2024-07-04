import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

const DispenserPage = lazy(() => import('@/modules/sales/pages/dispenser'))
const DispenserDetail = lazy(() => import('@/modules/sales/pages/dispenser/components/detailsProvider'))
const DispenserForm = lazy(() => import('@/modules/sales/pages/dispenser/components/dispenser-form'))
const DiscountPage = lazy(() => import('@/modules/sales/pages/discount'))
const DiscountForm = lazy(() => import('@/modules/sales/pages/discount/components/discount-form'))
const SalesPage = lazy(() => import('@/modules/sales/pages/sale'))
const SaleDetails = lazy(() => import('@/modules/sales/pages/sale/sale-details'))
const SaleForm = lazy(() => import('@/modules/sales/pages/sale/sale-form'))
const SaleFuelForm = lazy(() => import('@/modules/sales/pages/sale/sale-fuel-form'))
const SaleProductForm = lazy(() => import('@/modules/sales/pages/sale/sale-product-form'))

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
    path: PrivateRoutes.DISPENSER_DETAILS,
    element: createElement(DispenserDetail),
    permissions: [PERMISSION.DISPENSER, PERMISSION.DISPENSER_SHOW]
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
  },
  {
    path: PrivateRoutes.SALES,
    element: createElement(SalesPage),
    permissions: [PERMISSION.SALE_NOTE, PERMISSION.SALE_NOTE_SHOW]
  },
  {
    path: PrivateRoutes.SALES_DETAILS,
    element: createElement(SaleDetails),
    permissions: [PERMISSION.SALE_NOTE, PERMISSION.SALE_NOTE_SHOW]
  },
  {
    path: PrivateRoutes.SALES_CREATE,
    element: createElement(SaleForm),
    permissions: [PERMISSION.SALE_NOTE]
  },
  {
    path: PrivateRoutes.SALES_CREATE_FUEL,
    element: createElement(SaleFuelForm, { buttonText: 'Crear', title: 'Venta de Combustible' }),
    permissions: [PERMISSION.SALE_NOTE]
  },
  {
    path: PrivateRoutes.SALES_CREATE_NOT_FUEL,
    element: createElement(SaleProductForm, { buttonText: 'Crear', title: 'Venta de Producto' }),
    permissions: [PERMISSION.SALE_NOTE]
  }
]
