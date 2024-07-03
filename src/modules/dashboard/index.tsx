import { useHeader } from '@/hooks'
import React from 'react'

const DashboardPage = (): React.ReactNode => {
  useHeader([
    { label: 'Dashboard' }
  ])
  return (
    <>
      <h2>DashboardPage</h2>
    </>
  )
}

export default DashboardPage
