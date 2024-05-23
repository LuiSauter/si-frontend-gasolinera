import { PrivateRoutes } from '@/models/routes.model'
import { Building2Icon, BuildingIcon, FlameIcon, FuelIcon, HomeIcon, KeyIcon, LayoutDashboardIcon, PackageIcon, ScrollTextIcon, UserCogIcon, UserIcon, UsersIcon } from 'lucide-react'
import { createElement } from 'react'

export interface MenuHeaderRoute {
  path?: string
  label: string
  icon?: JSX.Element
  children?: MenuHeaderRoute[]
  permission?: string
}

// TODO: add permissions to routes
export const MenuSideBar: MenuHeaderRoute[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: createElement(HomeIcon, { width: 20, height: 20 })
  },
  {
    label: 'Gestión de Usuarios',
    icon: createElement(UserCogIcon, { width: 20, height: 20 }),
    path: '/usuarios',
    children: [
      {
        path: '/usuarios',
        label: 'Usuarios',
        icon: createElement(UsersIcon, { width: 20, height: 20 })
      },
      {
        path: '/usuarios/roles',
        label: 'Roles',
        icon: createElement(UserIcon, { width: 20, height: 20 })
      },
      {
        path: '/usuarios/permisos',
        label: 'Permisos',
        icon: createElement(KeyIcon, { width: 20, height: 20 })
      }
    ]
  },
  {
    label: 'Administrar Empresa',
    icon: createElement(Building2Icon, { width: 20, height: 20 }),
    path: '/empresa',
    children: [
      {
        path: PrivateRoutes.COMPANY,
        label: 'Empresa',
        icon: createElement(BuildingIcon, { width: 20, height: 20 })
      },
      {
        path: PrivateRoutes.BRANCH,
        label: 'Sucursales',
        icon: createElement(FuelIcon, { width: 20, height: 20 })
      },
      {
        path: PrivateRoutes.BINACLE,
        label: 'Bitácora',
        icon: createElement(ScrollTextIcon, { width: 20, height: 20 })
      }
    ]
  },
  {
    label: 'Inventario',
    icon: createElement(PackageIcon, { width: 20, height: 20 }),
    path: '/productos',
    children: [
      {
        path: PrivateRoutes.PRODUCT,
        label: 'Productos',
        icon: createElement(FuelIcon, { width: 20, height: 20 })
      },
      {
        path: PrivateRoutes.FUEL,
        label: 'Combustibles',
        icon: createElement(FlameIcon, { width: 20, height: 20 })
      },
      {
        path: PrivateRoutes.CATEGORY,
        label: 'Categorías',
        icon: createElement(LayoutDashboardIcon, { width: 20, height: 20 })
      },
      {
        path: PrivateRoutes.GROUP,
        label: 'Grupos',
        icon: createElement(UsersIcon, { width: 20, height: 20 })
      }
    ]
  }
]
