import Loading from '@/components/shared/loading'
import { type ChildrenProps } from '@/models'
import { Suspense } from 'react'

function MainPage({ children }: ChildrenProps) {
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto relative">
      <main className='min-h-[calc(100dvh-56px)] lg:min-h-[calc(100dvh-60px)] p-4 lg:p-6 max-w-screen-xl mx-auto'>
        <Suspense
          fallback={
            <div className='grid place-content-center place-items-center min-h-[calc(100dvh-55px-54px)] lg:min-h-[calc(100dvh-63px-54px)] text-action text-light-action dark:text-dark-action'>
              <Loading />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  )
}

export default MainPage
