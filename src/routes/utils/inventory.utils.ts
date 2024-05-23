import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'

const ProductPage = lazy(() => import('@modules/inventory/pages/product'))
const ProductFormPage = lazy(() => import('@modules/inventory/pages/product/product-form'))
const FuelPage = lazy(() => import('@modules/inventory/pages/fuel'))
const FuelForm = lazy(() => import('@modules/inventory/pages/fuel/components/fuel-form'))
const CategoryGroupPage = lazy(() => import('@modules/inventory/pages/category-group'))
const CategoryGroupForm = lazy(() => import('@modules/inventory/pages/category-group/components/category-group-form'))

// TODO: add permissions to routes
export const inventoryRoutes: Route[] = [
  {
    path: PrivateRoutes.PRODUCT,
    element: createElement(ProductPage)
  },
  {
    path: PrivateRoutes.PRODUCT_ADD,
    element: createElement(ProductFormPage, { buttonText: 'Guardar Producto', title: 'Crear Producto' })
  },
  {
    path: PrivateRoutes.PRODCUT_EDIT,
    element: createElement(ProductFormPage, { buttonText: 'Actualizar Producto', title: 'Editar Producto' })
  },
  {
    path: PrivateRoutes.FUEL,
    element: createElement(FuelPage)
  },
  {
    path: PrivateRoutes.FUEL_ADD,
    element: createElement(FuelForm)
  },
  {
    path: PrivateRoutes.CATEGORY_GROUP,
    element: createElement(CategoryGroupPage)
  },
  {
    path: PrivateRoutes.CATEGORY_GROUP_ADD,
    element: createElement(CategoryGroupForm)
  }
]
