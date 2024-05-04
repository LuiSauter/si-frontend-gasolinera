import { Button } from '@/components/ui/button'
import Navigation from './navigation'
import { ChevronLeftIcon, FuelIcon } from 'lucide-react'
import { useSidebar } from '@/context/sidebarContext'

const Aside = () => {
  const { isContract, toggleContract } = useSidebar()

  return (
    <aside className='hidden md:flex md:flex-col h-[100dvh] relative border-r dark:bg-dark-bg-secondary bg-light-bg-primary'>
      <div
        className={'h-14 border-b lg:h-[60px] flex gap-3 px-4 items-center justify-center relative shrink-0 text-light-text-primary dark:text-dark-text-primary font-medium text-lg'}
      >
        <div className={`${isContract ? 'hidden' : ''} flex items-center gap-3 w-full justify-center px-4`}>
          <FuelIcon />
          <h1>Mi Gasolinera</h1>
        </div>
        <Button
          variant='outline'
          size='icon'
          onClick={toggleContract}
          className='shrink-0'
          title={isContract ? 'Expandir menú' : 'Contraer menú'}
        >
          <ChevronLeftIcon width={20} height={20} className={`${isContract ? '-rotate-180' : ''} transition-transform ease-linear`} />
        </Button>
      </div>
      <Navigation />
    </aside>
  )
}

export default Aside
