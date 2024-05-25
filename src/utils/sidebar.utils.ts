import { PrivateRoutes } from '@/models/routes.model'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { Building2Icon, BuildingIcon, FlameIcon, FuelIcon, KeyIcon, LayoutDashboardIcon, PackageIcon, ScrollTextIcon, UserCogIcon, UserIcon, UsersIcon } from 'lucide-react'
import { createElement } from 'react'

export interface MenuHeaderRoute {
  path?: string
  label: string
  icon?: JSX.Element
  children?: MenuHeaderRoute[]
  permissions?: PERMISSION[]
}

export const MenuSideBar: MenuHeaderRoute[] = [
  {
    label: 'Gestión de Usuarios',
    icon: createElement(UserCogIcon, { width: 20, height: 20 }),
    path: '/usuarios',
    permissions: [PERMISSION.USER, PERMISSION.USER_SHOW, PERMISSION.ROLE, PERMISSION.ROLE_SHOW, PERMISSION.PERMISSION, PERMISSION.PERMISSION_SHOW],
    children: [
      {
        path: '/usuarios',
        label: 'Usuarios',
        icon: createElement(UsersIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.USER, PERMISSION.USER_SHOW]
      },
      {
        path: '/usuarios/roles',
        label: 'Roles',
        icon: createElement(UserIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.ROLE, PERMISSION.ROLE_SHOW]
      },
      {
        path: '/usuarios/permisos',
        label: 'Permisos',
        icon: createElement(KeyIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.PERMISSION, PERMISSION.PERMISSION_SHOW]
      }
    ]
  },
  {
    label: 'Administrar Empresa',
    icon: createElement(Building2Icon, { width: 20, height: 20 }),
    path: '/empresa',
    permissions: [PERMISSION.COMPANY, PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW, PERMISSION.BINNACLE],
    children: [
      {
        path: PrivateRoutes.COMPANY,
        label: 'Empresa',
        icon: createElement(BuildingIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.COMPANY]
      },
      {
        path: PrivateRoutes.BRANCH,
        label: 'Sucursales',
        icon: createElement(FuelIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.BRANCH, PERMISSION.BRANCH_SHOW]
      },
      {
        path: PrivateRoutes.BINACLE,
        label: 'Bitácora',
        icon: createElement(ScrollTextIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.BINNACLE]
      }
    ]
  },
  {
    label: 'Inventario',
    icon: createElement(PackageIcon, { width: 20, height: 20 }),
    path: '/productos',
    permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW, PERMISSION.FUEL, PERMISSION.FUEL_SHOW, PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW, PERMISSION.GROUP, PERMISSION.GROUP_SHOW, PERMISSION.PRODUCT_OUTPUT, PERMISSION.PRODUCT_OUTPUT_SHOW],
    children: [
      {
        path: PrivateRoutes.PRODUCT,
        label: 'Productos',
        icon: createElement(FuelIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW]
      },
      {
        path: PrivateRoutes.FUEL,
        label: 'Combustibles',
        icon: createElement(FlameIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.FUEL, PERMISSION.FUEL_SHOW]
      },
      {
        path: PrivateRoutes.CATEGORY,
        label: 'Categorías',
        icon: createElement(LayoutDashboardIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.CATEGORY, PERMISSION.CATEGORY_SHOW]
      },
      {
        path: PrivateRoutes.GROUP,
        label: 'Grupos',
        icon: createElement(UsersIcon, { width: 20, height: 20 }),
        permissions: [PERMISSION.GROUP, PERMISSION.GROUP_SHOW]
      }
    ]
  }
]
