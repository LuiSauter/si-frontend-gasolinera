import { Building2Icon, BuildingIcon, FuelIcon, HomeIcon, KeyIcon, UserCogIcon, UserIcon, UsersIcon } from 'lucide-react'
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
        path: '/empresa',
        label: 'Empresa',
        icon: createElement(BuildingIcon, { width: 20, height: 20 })
      },
      {
        path: '/empresa/sucursales',
        label: 'Sucursales',
        icon: createElement(FuelIcon, { width: 20, height: 20 })
      }
    ]
  }
]
