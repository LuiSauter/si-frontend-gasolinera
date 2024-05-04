import { HeaderContext } from '@/context/headerContext'
import { type Breadcrumb, type IHeaderContext } from '@/models'
import { useContext, useEffect } from 'react'

export const useHeader = (value?: Breadcrumb[]): IHeaderContext => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe) {
      const { handleBreadcrumb } = context
      value && handleBreadcrumb(value)
    }
    return () => {
      subscribe = false
    }
  }, [])

  return context
}
