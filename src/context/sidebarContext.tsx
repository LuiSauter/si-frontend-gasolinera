import { PrivateRoutes } from '@/models/routes.model'
import { STORAGE_MENU_ACTIVE, STORAGE_MENU_SELECTED, getStorage, setStorage } from '@/utils'
import { MenuSideBar } from '@/utils/sidebar.utils'
import { type ReactNode, createContext, useState, useMemo, useContext } from 'react'

export interface ISidebarContext {
  isContract: boolean
  selectedMenu: string
  menuActive: Record<string, boolean>
  toggleContract: () => void
  handleSelectedMenu: (menu: string) => void
  handleActivateMenu: (menu: string) => void
}

const MENUACTIVE = {
  'Gestión de Usuarios': false,
  'Administrar Empresa': false,
  Inventario: false,
  Ventas: false,
  Compras: false
}

export const SidebarContext = createContext<ISidebarContext>({} as ISidebarContext)

export const useSidebar = (): ISidebarContext => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

const persistedContract = getStorage('contract')
const persistedSelected = getStorage(STORAGE_MENU_SELECTED) ?? PrivateRoutes.DASHBOARD
const persistedMenuActive: Record<string, boolean> = JSON.parse(getStorage(STORAGE_MENU_ACTIVE)!) ?? MENUACTIVE

export const SidebarProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [isContract, setIsContract] = useState<boolean>(persistedContract === 'true')
  const [selectedMenu, setSelectedMenu] = useState<string>(persistedSelected)
  const [menuActive, setMenuActive] = useState<Record<string, boolean>>(persistedMenuActive)

  function toggleContract(): void {
    if (!isContract) {
      setStorage(STORAGE_MENU_ACTIVE, JSON.stringify(MENUACTIVE))
      setMenuActive(MENUACTIVE)
    } else {
      const labelMenu = MenuSideBar.find(item => item.children?.find(child => child.path === selectedMenu)
      )?.label
      setMenuActive((prev) => ({ ...prev, [labelMenu!]: true }))
    }
    setStorage('contract', String(!isContract))
    setIsContract(!isContract)
  }

  function handleSelectedMenu(menu: string): void {
    setSelectedMenu(menu)
    setStorage(STORAGE_MENU_SELECTED, menu)
  }

  function handleActivateMenu(menu: string): void {
    setMenuActive((prev) => ({ ...prev, [menu]: !prev[menu] }))
    setStorage(STORAGE_MENU_ACTIVE, JSON.stringify({ ...menuActive, [menu]: !menuActive[menu] }))
  }

  const value = useMemo(() => ({
    isContract,
    menuActive,
    selectedMenu,
    toggleContract,
    handleSelectedMenu,
    handleActivateMenu
  }), [isContract, selectedMenu, toggleContract, handleSelectedMenu, handleActivateMenu, menuActive])

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
