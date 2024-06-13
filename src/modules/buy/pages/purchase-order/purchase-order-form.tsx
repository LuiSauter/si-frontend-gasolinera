import { CheckCheckIcon, ChevronLeftIcon, ChevronsUpDownIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useHeader } from '@/hooks'

import { type IFormProps, PrivateRoutes } from '@/models'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { useCreateOrUpdateProduct, useGetAllCategories, useGetAllGroups, useGetProduct } from '../../hooks/useProduct'
import { useGetAllBranches } from '@/modules/company/hooks/useBranch'
// import MultiSelect from './multiselect'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useGetPurchaseOrder } from '../../hooks/usePurchaseOrder'
import { useGetAllProvider } from '../../hooks/useProvider'

const formSchema = z.object({
  code: z.number().int().positive().min(1, 'El código es requerido'),
  reason: z.string({ required_error: 'La razón es requerida' }).min(1, 'La razón es requerida'),
  state: z.string({ required_error: 'El estado es requerido' }).min(1, 'El estado es requerido'),
  branchId: z.string({ required_error: 'La sucursal es requerida' }).min(1, 'La sucursal es requerida'),
  providerId: z.string({ required_error: 'El proveedor es requerido' }).min(1, 'El proveedor es requerido')
})

function PurchaseOrderFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Productos', path: PrivateRoutes.PRODUCT },
    { label: title }
  ])

  const navigate = useNavigate()
  const { id } = useParams()

  // const { createPurchaseOrder, isMutating } = useCreatePurchaseOrder()
  // const { updatePurchaseOrder, isMutating: isMutatingUpdate } = useUpdatePurchaseOrder()
  const { purchaseOrder } = useGetPurchaseOrder(id)
  const { branches } = useGetAllBranches()
  const { providers } = useGetAllProvider()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      code: purchaseOrder?.code ?? 1,
      reason: purchaseOrder?.reason ?? '',
      state: purchaseOrder?.state ?? '',
      branchId: purchaseOrder?.branch?.id ?? '',
      providerId: purchaseOrder?.provider?.id ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // if (id) {
    //   toast.promise(updateProduct({ ...data, id }), {
    //     loading: 'Actualizando producto...',
    //     success: () => {
    //       setTimeout(() => {
    //         navigate(PrivateRoutes.PRODUCT, { replace: true })
    //       }, 1000)
    //       return 'Producto actualizado exitosamente'
    //     },
    //     error(error) {
    //       return error.errorMessages[0] && 'Error al actualizar el producto'
    //     }
    //   })
    // } else {
    //   toast.promise(createProduct(data), {
    //     loading: 'Creando producto...',
    //     success: () => {
    //       setTimeout(() => {
    //         navigate(PrivateRoutes.PRODUCT, { replace: true })
    //       }, 1000)
    //       return 'Producto creado exitosamente'
    //     },
    //     error(error) {
    //       return error.errorMessages[0] && 'Error al crear el producto'
    //     }
    //   })
    // }
  }

  // let subscribe = true
  // useEffect(() => {
  //   if (subscribe && error) {
  //     toast.error(error.errorMessages[0])
  //   }
  //   return () => {
  //     subscribe = false
  //   }
  // }, [error])

  return (
    <section className="grid flex-1 items-start gap-4 lg:gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full flex flex-col gap-4 lg:gap-6"
        >
          <div className="flex items-center gap-4">
            <Button
              type="button"
              onClick={() => { navigate(-1) }}
              variant="outline"
              size="icon"
              className="h-7 w-7"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
            <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {title}
            </h2>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type="button" onClick={() => { navigate(PrivateRoutes.PURCHASE_ORDER) }} variant="outline" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm">{buttonText}</Button>
            </div>
          </div>
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader className='px-4 lg:px-6'>
                  <CardTitle>Detalles de la orden</CardTitle>
                </CardHeader>
                <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código *</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder="0001, 0002, 000A2, etc..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Gasolina, Diesel, aceite, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader className='px-4 lg:px-6'>
                  <CardTitle>Identificadores</CardTitle>
                </CardHeader>
                <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6 w-full relative">
                    <FormField
                      control={form.control}
                      name="branchId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between space-y-1 pt-1">
                          <FormLabel className='leading-normal'>Sucursal *</FormLabel>
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
                                      {branches?.find(
                                        (branch) => branch.id === field.value
                                      )?.name}
                                    </span>)
                                    : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar sucursal</span>}
                                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput placeholder="Seleccionar un producto..." />
                                <CommandList>
                                  <CommandEmpty>Producto no encontrado.</CommandEmpty>
                                  <CommandGroup>
                                    {branches?.map((branch) => (
                                      <CommandItem
                                        value={branch.name}
                                        key={branch.id}
                                        onSelect={() => { form.setValue('branchId', branch.id) }}
                                      >
                                        <CheckCheckIcon
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            branch.id === field.value ? 'opacity-100' : 'opacity-0'
                                          )}
                                        />
                                        {branch.name}
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
                    />
                    <FormField
                      control={form.control}
                      name="providerId"
                      defaultValue={purchaseOrder?.provider?.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between space-y-2 pt-1">
                          <FormLabel>Categoría *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'justify-between font-normal w-full',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? <span className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                      {providers?.find(
                                        (provider) => provider.id === field.value
                                      )?.name}
                                    </span>
                                    : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar categoría</span>}
                                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput placeholder="Seleccionar una categoría..." />
                                <CommandList>
                                  <CommandEmpty>Proveedor no encontrado.</CommandEmpty>
                                  <CommandGroup>
                                    {providers?.map((provider) => (
                                      <CommandItem
                                        value={provider.name}
                                        key={provider.id}
                                        onSelect={() => {
                                          form.setValue('providerId', provider.id)
                                          form.clearErrors('providerId')
                                        }}
                                      >
                                        <CheckCheckIcon
                                          className={cn(
                                            'mr-2 h-4 w-4', provider.id === field.value ? 'opacity-100' : 'opacity-0'
                                          )}
                                        />
                                        {provider.name}
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
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button onClick={() => { navigate(PrivateRoutes.PRODUCT) }} type="button" variant="outline" size="sm">
              Descartar
            </Button>
            <Button type="submit" size="sm">
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default PurchaseOrderFormPage
