import { type Breadcrumb, type IHeaderContext } from '@/models'
import { type ReactNode, createContext, useState, useMemo, useContext, useCallback } from 'react'

export const HeaderContext = createContext<IHeaderContext>({} as IHeaderContext)

export const useSidebar = (): IHeaderContext => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useSidebar must be used within a HeaderProvider')
  }
  return context
}

export const HeaderProvider = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] }) => {
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([{ label: 'Dashboard' }])

  const handleBreadcrumb = useCallback((value: Breadcrumb[]) => {
    setBreadcrumb(value)
  }, [])

  const value = useMemo(() => ({
    breadcrumb,
    handleBreadcrumb
  }), [breadcrumb, handleBreadcrumb])

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  )
}
