import { Outlet } from 'react-router-dom'

import Header from './components/header'
import MainPage from './components/main-page'
import Aside from './components/aside'
import { useSidebar } from '@/context/sidebarContext'

const Dashboard = () => {
  const { isContract } = useSidebar()
  return (
    <div className={`${isContract ? 'md:grid-cols-[84px_1fr] lg:grid-cols-[84px_1fr] xl:grid-cols-[84px_1fr]' : 'md:grid-cols-[286px_1fr] lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]'} flex flex-col min-h-[100dvh] w-full bg-light-bg-primary dark:bg-dark-bg-primary overflow-hidden relative md:grid`}>
      <Aside />
      <div className='max-h-[100dvh overflow-hidden]'>
        {/* <Toaster richColors /> */}
        <Header />
        <div className='flex flex-row w-full h-[calc(100dvh-56px)] lg:h-[calc(100dvh-60px)] relative overflow-hidden bg-light-bg-primary dark:bg-dark-bg-primary'>
          {/* <Aside /> */}
          <MainPage>
            <Outlet />
          </MainPage>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
