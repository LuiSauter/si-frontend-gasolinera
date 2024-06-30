import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

const ProductPage = lazy(() => import('@modules/inventory/pages/product'))
const ProductFormPage = lazy(() => import('@modules/inventory/pages/product/product-form'))
const ProductDetailsPage = lazy(() => import('@/modules/inventory/pages/product/details'))
const BatchFormPage = lazy(() => import('@modules/inventory/pages/product/components/batch-form'))
const FuelPage = lazy(() => import('@modules/inventory/pages/fuel'))
const FuelForm = lazy(() => import('@modules/inventory/pages/fuel/components/fuel-form'))
const GroupPage = lazy(() => import('@/modules/inventory/pages/group'))
const OuputProductsPage = lazy(() => import('@/modules/inventory/pages/output-product'))

export const inventoryRoutes: Route[] = [
  {
    path: PrivateRoutes.PRODUCT,
    element: createElement(ProductPage),
    permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW]
  },
  {
    path: PrivateRoutes.PRODUCT_ADD,
    element: createElement(ProductFormPage, { buttonText: 'Guardar Producto', title: 'Crear Producto' }),
    permissions: [PERMISSION.PRODUCT]
  },
  {
    path: PrivateRoutes.PRODCUT_EDIT,
    element: createElement(ProductFormPage, { buttonText: 'Actualizar Producto', title: 'Editar Producto' }),
    permissions: [PERMISSION.PRODUCT]
  },
  {
    path: PrivateRoutes.PRODUCT_DETAILS,
    element: createElement(ProductDetailsPage),
    permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW]
  },
  {
    path: PrivateRoutes.BATCH_CREATE,
    element: createElement(BatchFormPage, { buttonText: 'Guardar Lote', title: 'Crear Lote' }),
    permissions: [PERMISSION.PRODUCT]
  },
  {
    path: PrivateRoutes.FUEL,
    element: createElement(FuelPage),
    permissions: [PERMISSION.FUEL, PERMISSION.FUEL_SHOW]
  },
  {
    path: PrivateRoutes.FUEL_ADD,
    element: createElement(FuelForm, { buttonText: 'Guardar Combustible', title: 'Crear Combustible' }),
    permissions: [PERMISSION.FUEL]
  },
  {
    path: PrivateRoutes.FUEL_EDIT,
    element: createElement(FuelForm, { buttonText: 'Actualizar Combustible', title: 'Editar Combustible' }),
    permissions: [PERMISSION.FUEL]
  },
  {
    path: PrivateRoutes.GROUP,
    element: createElement(GroupPage),
    permissions: [PERMISSION.GROUP, PERMISSION.GROUP_SHOW]
  },
  {
    path: PrivateRoutes.OUPUT_PRODUCT,
    element: createElement(OuputProductsPage),
    permissions: [PERMISSION.PRODUCT_OUTPUT, PERMISSION.PRODUCT_OUTPUT_SHOW]
  }
]
