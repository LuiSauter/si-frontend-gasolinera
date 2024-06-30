import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GroupsList from './components/groups'
import CategoryList from './components/categories'
import { ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const GroupPage = () => {
  const navigate = useNavigate()

  return (
    <section className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
        <Tabs defaultValue="groups" className='grid gap-4'>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => { navigate(-1) }}
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
            <TabsList>
              <TabsTrigger value="groups">Grupos</TabsTrigger>
              <TabsTrigger value="categories">Categorias</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="groups">
            <GroupsList />
          </TabsContent>
          <TabsContent value="categories">
            <CategoryList />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default GroupPage
