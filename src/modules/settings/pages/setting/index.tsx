import { ModeToggle } from '@/components/mode-toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const SettingPage = (): JSX.Element => {
  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <div className="mx-auto grid w-full">
          <h1 className="text-3xl font-semibold text-light-text-primary dark:text-dark-text-primary">Configuración</h1>
        </div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Cuenta</TabsTrigger>
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="mx-auto grid w-full pt-2 lg:pt-4">
              <p className='text-light-text-secondary dark:text-dark-text-secondary'>
                Actualice la configuración de su cuenta
              </p>
            </div>
          </TabsContent>
          <TabsContent value="appearance">
            <div className="mx-auto grid w-full pt-2 lg:pt-4 gap-4 lg:gap-6">
              <h2 className='font-semibold text-2xl'>Tema</h2>
              <p className='text-light-text-secondary dark:text-dark-text-secondary'>
                Personaliza la apariencia de la aplicación. Cambia automáticamente entre temas diurnos y nocturnos.
              </p>
              <ModeToggle />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}

export default SettingPage
