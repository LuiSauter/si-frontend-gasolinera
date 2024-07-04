import { Button } from '@/components/ui/button'
import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models'
import { CheckCheckIcon, ChevronLeftIcon, ChevronsUpDownIcon, FuelIcon, PackageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetAllDispensers } from '../../hooks/useDispenser'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useSelector } from 'react-redux'
import { type RootState } from '@/redux/store'

const formSchema = z.object({
  dispenserId: z.string({ required_error: 'El dispensador es requerido' }).min(1, 'El dispensador es requerido')
})

function BuyFormPage() {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Crear Venta' }
  ])
  const [showForm, setShowForm] = useState(false)

  const navigate = useNavigate()
  const { dispensers } = useGetAllDispensers()
  const { branch } = useSelector((state: RootState) => state.user)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dispenserId: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    navigate(`${PrivateRoutes.SALES}/combustible/${data.dispenserId}`)
  }

  return (
    <section className="flex flex-col gap-4 lg:gap-6 h-full min-h-[calc(100dvh-88px)] md:min-h-[calc(100dvh-108px)]">
      <div className='flex gap-2'>
        <Button
          type="button"
          onClick={() => { navigate(-1) }}
          variant="outline"
          size="icon"
          className="h-7 w-7 shrink-0"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className="sr-only">Volver</span>
        </Button>
        <h2 className='text-xl font-medium'>
          Tipo de venta
        </h2>
      </div>
      <p className='text-light-text-secondary dark:text-dark-text-secondary'>
        Selecciona el tipo de venta que deseas realizar
      </p>
      <div className='grid place-content-center place-items-center h-full my-auto gap-4 lg:gap-6'>
        <Form {...form}>
          <form
            onSubmit={() => { }}
            className="mx-auto w-full flex flex-col gap-4 lg:gap-6"
          // hidden={!showForm}
          >
            <button
              onClick={showForm ? form.handleSubmit(onSubmit) : () => { setShowForm(true) }}
              // navigate(`${PrivateRoutes.SALES}/combustible/${'xdxd'}`)
              type='button'
              className="flex items-center justify-center w-full md:w-96 p-6 lg:px-8 h-fit bg-primary-500 text-white text-xl rounded-lg shadow-md bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            >
              <FuelIcon className="h-8 w-8 mr-2 lg:mr-4 shrink-0" />
              Venta de combustible
            </button>
            {showForm && <FormField
              control={form.control}
              name="dispenserId"
              render={({ field }) => (
                <FormItem className={'flex flex-col justify-between space-y-1 pt-1'}>
                  <FormLabel className='leading-normal'>Dispensador *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'justify-between font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? (<span className='text-ellipsis whitespace-nowrap overflow-hidden'>
                              {dispensers?.find(
                                (item) => item.id === field.value
                              )?.ubication}
                            </span>)
                            : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar dispensador</span>}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Seleccionar un producto..." />
                        <CommandList>
                          <CommandEmpty>Sucursal no encontrada</CommandEmpty>
                          <CommandGroup>
                            {dispensers?.map((item) => item.branch.id === branch.id && (
                              <CommandItem
                                value={item.ubication}
                                key={item.id}
                                onSelect={() => { form.setValue('dispenserId', item.id) }}
                              >
                                <CheckCheckIcon
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    item.id === field.value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {item.ubication}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />}
          </form>
        </Form>
        {!showForm && <button
          onClick={() => { navigate(PrivateRoutes.SALES_CREATE_NOT_FUEL) }}
          className="flex items-center justify-center w-full md:w-96 p-6 lg:px-8 h-fit bg-primary-500 text-white text-xl rounded-lg shadow-md bg-light-bg-secondary dark:bg-dark-bg-secondary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
        >
          <PackageIcon className="h-8 w-8 mr-2 lg:mr-4 shrink-0" />
          Venta de producto
        </button>}
      </div>
    </section >
  )
}

export default BuyFormPage
