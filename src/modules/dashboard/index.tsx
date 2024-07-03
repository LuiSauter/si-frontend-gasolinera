import { useHeader } from '@/hooks'
import React from 'react'
import { PruebaPage } from './components/newPrueba'

const DashboardPage = (): React.ReactNode => {
  useHeader([
    { label: 'Dashboard' }
  ])
  return (
    <>
      {/* <h2>DashboardPage</h2> */}
      <PruebaPage></PruebaPage>
    </>
  )
}

export default DashboardPage
