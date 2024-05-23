import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import GroupForm from '@/modules/inventory/pages/group/components/group-form'

const ProductPage = lazy(() => import('@modules/inventory/pages/product'))
const ProductFormPage = lazy(() => import('@modules/inventory/pages/product/product-form'))
const FuelPage = lazy(() => import('@modules/inventory/pages/fuel'))
const FuelForm = lazy(() => import('@modules/inventory/pages/fuel/components/fuel-form'))
const CategoryPage = lazy(() => import('@modules/inventory/pages/category-group'))
const CategoryForm = lazy(() => import('@/modules/inventory/pages/category-group/components/category-group-form'))
const GroupPage = lazy(() => import('@/modules/inventory/pages/group'))
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
    path: PrivateRoutes.CATEGORY,
    element: createElement(CategoryPage)
  },
  {
    path: PrivateRoutes.CATEGORY_CREAR,
    element: createElement(CategoryForm)
  },
  {
    path: PrivateRoutes.CATEGORY_EDIT,
    element: createElement(CategoryForm)
  },
  {
    path: PrivateRoutes.GROUP,
    element: createElement(GroupPage)
  },
  {
    path: PrivateRoutes.GROUP_CREAR,
    element: createElement(GroupForm)
  },
  {
    path: PrivateRoutes.GROUP_EDIT,
    element: createElement(GroupForm)
  }
]
