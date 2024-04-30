import { Building2Icon, FuelIcon, HomeIcon, KeyIcon, UserIcon, UsersIcon } from 'lucide-react'
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
    path: '/dashboard',
    label: 'Dashboard',
    icon: createElement(HomeIcon, { width: 20, height: 20 })
  },
  {
    label: 'Gestión de Usuarios',
    icon: createElement(UsersIcon, { width: 20, height: 20 }),
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
    label: 'Configuración de Empresa',
    icon: createElement(Building2Icon, { width: 20, height: 20 }),
    children: [
      {
        path: '/empresa',
        label: 'Empresa',
        icon: createElement(Building2Icon, { width: 20, height: 20 })
      },
      {
        path: '/empresa/sucursales',
        label: 'Sucursales',
        icon: createElement(FuelIcon, { width: 20, height: 20 })
      }
    ]
  }
]
