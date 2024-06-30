import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

const ProviderPage = lazy(() => import('@/modules/buy/pages/provider'))
const ProviderFormPage = lazy(() => import('@/modules/buy/pages/provider/components/provider-form'))
const ProviderDetallPage = lazy(() => import('@/modules/buy/pages/provider/components/detailsProvider'))
const ProviderProductForm = lazy(() => import('@/modules/buy/pages/provider/components/provider-product-form'))
const PurchaseOrderPage = lazy(() => import('@/modules/buy/pages/purchase-order'))
const PurchaseOrderFormPage = lazy(() => import('@/modules/buy/pages/purchase-order/purchase-order-form'))
const OrderDetailPage = lazy(() => import('@/modules/buy/pages/purchase-order/order-detail'))
const BuyPage = lazy(() => import('@/modules/buy/pages/buy'))
const BuyDetailsPage = lazy(() => import('@/modules/buy/pages/buy/buy-details'))
const BuyFormPage = lazy(() => import('@/modules/buy/pages/buy/buy-form'))

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
  },
  {
    path: PrivateRoutes.PROVIDER_DETAILS,
    element: createElement(ProviderDetallPage),
    permissions: [PERMISSION.PROVIDER, PERMISSION.PROVIDER_SHOW]
  },
  {
    path: PrivateRoutes.PROVIDER_PRODUCT_CREATE,
    element: createElement(ProviderProductForm, { buttonText: 'Asignar', title: 'Asignar nuevo producto al proveedor' }),
    permissions: [PERMISSION.PROVIDER]
  },
  {
    path: PrivateRoutes.PROVIDER_PRODUCT_EDIT,
    element: createElement(ProviderProductForm, { buttonText: 'Actualizar', title: 'Editar el producto del proveedor' }),
    permissions: [PERMISSION.PROVIDER]
  },
  {
    path: PrivateRoutes.PURCHASE_ORDER,
    element: createElement(PurchaseOrderPage),
    permissions: [PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW]
  },
  {
    path: PrivateRoutes.PURCHASE_ORDER_CREATE,
    element: createElement(PurchaseOrderFormPage, { buttonText: 'Guardar', title: 'Crear Orden de Compra' }),
    permissions: [PERMISSION.PURCHASE_ORDER]
  },
  {
    path: PrivateRoutes.PURCHASE_ORDER_EDIT,
    element: createElement(PurchaseOrderFormPage, { buttonText: 'Actualizar', title: 'Actualizar Orden de Compra' }),
    permissions: [PERMISSION.PURCHASE_ORDER]
  },
  {
    path: PrivateRoutes.PURCHASE_ORDER_DETAIL,
    element: createElement(OrderDetailPage),
    permissions: [PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW]
  },
  {
    path: PrivateRoutes.BUY,
    element: createElement(BuyPage),
    permissions: [PERMISSION.BUY_NOTE, PERMISSION.BUY_NOTE_SHOW]
  },
  {
    path: PrivateRoutes.BUY_DETAILS,
    element: createElement(BuyDetailsPage),
    permissions: [PERMISSION.BUY_NOTE, PERMISSION.BUY_NOTE_SHOW]
  },
  {
    path: PrivateRoutes.BUY_CREATE,
    element: createElement(BuyFormPage, { buttonText: 'Guardar', title: 'Crear Nota de Compra' }),
    permissions: [PERMISSION.BUY_NOTE]
  },
  {
    path: PrivateRoutes.BUY_EDIT,
    element: createElement(BuyFormPage, { buttonText: 'Actualizar', title: 'Actualizar Nota de Compra' }),
    permissions: [PERMISSION.BUY_NOTE]
  }
]
