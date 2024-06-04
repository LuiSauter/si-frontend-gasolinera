import { createElement, lazy } from 'react'
import { PrivateRoutes, type Route } from '@/models/routes.model'
import GroupForm from '@/modules/inventory/pages/group/components/group-form'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import OuputProductsPage from '@/modules/inventory/pages/output-product'

const ProductPage = lazy(() => import('@modules/inventory/pages/product'))
const ProductFormPage = lazy(() => import('@modules/inventory/pages/product/product-form'))
const ProductDetailsPage = lazy(() => import('@/modules/inventory/pages/product/details'))
const FuelPage = lazy(() => import('@modules/inventory/pages/fuel'))
const FuelForm = lazy(() => import('@modules/inventory/pages/fuel/components/fuel-form'))
const CategoryPage = lazy(() => import('@modules/inventory/pages/category-group'))
const CategoryForm = lazy(() => import('@/modules/inventory/pages/category-group/components/category-group-form'))
const GroupPage = lazy(() => import('@/modules/inventory/pages/group'))

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
    path: PrivateRoutes.CATEGORY,
    element: createElement(CategoryPage),
    permissions: [PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW]
  },
  {
    path: PrivateRoutes.CATEGORY_CREAR,
    element: createElement(CategoryForm),
    permissions: [PERMISSION.CATEGORY]
  },
  {
    path: PrivateRoutes.CATEGORY_EDIT,
    element: createElement(CategoryForm),
    permissions: [PERMISSION.CATEGORY]
  },
  {
    path: PrivateRoutes.GROUP,
    element: createElement(GroupPage),
    permissions: [PERMISSION.GROUP, PERMISSION.GROUP_SHOW]
  },
  {
    path: PrivateRoutes.GROUP_CREAR,
    element: createElement(GroupForm),
    permissions: [PERMISSION.GROUP]
  },
  {
    path: PrivateRoutes.GROUP_EDIT,
    element: createElement(GroupForm),
    permissions: [PERMISSION.GROUP]
  },
  {
    path: PrivateRoutes.OUPUT_PRODUCT,
    element: createElement(OuputProductsPage),
    permissions: [PERMISSION.CATEGORY]
  }
]
