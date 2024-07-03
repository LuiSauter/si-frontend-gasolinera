import { CheckCheckIcon, ChevronLeftIcon, ChevronsUpDownIcon, MoreHorizontal } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import { useCreatePurchaseOrder, useGetPurchaseOrder, useUpdatePurchaseOrder } from '../../hooks/usePurchaseOrder'
import { useGetAllProvider } from '../../hooks/useProvider'
import { STATE } from '../../constants/state.constants'
import { type Provider } from '../../models/provider.model'
import { type Branch } from '@/modules/company/models/branch.model'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetAllProductsProviders } from '../../hooks/useProviderProduct'
import { type ProviderProduct } from '../../models/providerProduct.model'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { type CreatePurchaseOrder } from '../../models/purchase-order.model'

const formSchema = z.object({
  name: z.string({ required_error: 'La razón es requerida' }).min(1, 'La razón es requerida'),
  description: z.string({ required_error: 'El estado es requerido' }).min(1, 'El estado es requerido'),
  type: z.string({ required_error: 'El estado es requerido' }).min(1, 'El estado es requerido'),
  initial_date: z.string({ required_error: 'El estado es requerido' }).min(1, 'El estado es requerido'),
  final_date: z.string({ required_error: 'El estado es requerido' }).min(1, 'El estado es requerido'),
  percentage: z.number().int().positive().min(1, 'La cantidad es requerida'),
  branchId: z.string({ required_error: 'La sucursal es requerida' }).min(1, 'La sucursal es requerida'),
  productIds: z.array(z.string({ required_error: 'El producto es requerido' }).min(1, 'El producto es requerido')).min(1, 'Debes agregar al menos un producto')
})

const formSchemaDetails = z.object({
  productId: z.string({ required_error: 'El producto es requerido' }).min(1, 'El producto es requerido')
  // amount: z.number({ required_error: 'La cantidad es requerida' })
  //   .int('La cantidad debe ser un número entero')
  //   .positive('La cantidad debe ser positiva').min(1, 'La cantidad es requerida')
})

const ArrState = [
  { id: 0, name: STATE.DRAFT },
  { id: 1, name: STATE.EARRING }
]

function PurchaseOrderFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Descuentos', path: PrivateRoutes.DISCOUNT },
    { label: buttonText }
  ])

  const [providerParam, setProviderParam] = useState('')
  const [selectProduct, setSelectProduct] = useState<Record<string, string | number> | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const { purchaseOrder, error: errorGetPurchase } = useGetPurchaseOrder(id)
  const { branches, error: errorBranchs } = useGetAllBranches()
  const { providers, error: errorProvider } = useGetAllProvider()
  const { createPurchaseOrder, isMutating: isMutatingCreate } = useCreatePurchaseOrder()
  const { updatePurchaseOrder, isMutating: isMutatingUpdate } = useUpdatePurchaseOrder()

  const { providerProducts } = useGetAllProductsProviders(providerParam)

  const [searchParams, setSearchParams] = useSearchParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      reason: purchaseOrder?.reason ?? '',
      state: purchaseOrder?.state ?? STATE.DRAFT,
      branchId: purchaseOrder?.branch?.id ?? '',
      providerId: purchaseOrder?.provider?.id ?? '',
      details: purchaseOrder?.purchaseOrderDetails?.map((detail) => ({
        amount: detail.amount, productId: detail.product?.id ?? ''
      })) ?? []
    }
  })

  const formDetails = useForm<z.infer<typeof formSchemaDetails>>({
    resolver: zodResolver(formSchemaDetails),
    values: { productId: '', amount: 1 }
  })

  useEffect(() => {
    if (selectProduct) {
      formDetails.setValue('productId', String(selectProduct.productId))
      formDetails.setValue('amount', Number(selectProduct.amount))
    }
  }, [selectProduct])

  const onSubmit = (data: z.infer<typeof formSchema> | CreatePurchaseOrder) => {
    if (id) {
      toast.promise(updatePurchaseOrder({ ...data, id }), {
        loading: 'Actualizando orden de compra...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PURCHASE_ORDER, { replace: true })
          }, 1000)
          return 'Orden de compra actualizada exitosamente'
        },
        error(error) {
          return error.errorMessages[0] && 'Error al actualizar la orden de compra'
        }
      })
    } else {
      toast.promise(createPurchaseOrder(data), {
        loading: 'Creando orden de compra...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PURCHASE_ORDER, { replace: true })
          }, 1000)
          return 'Orden de compra creada exitosamente'
        },
        error(error) {
          return error.errorMessages[0] && 'Error al crear la orden de compra'
        }
      })
    }
  }

  const onSubmitDetails = (data: z.infer<typeof formSchemaDetails>) => {
    if (selectProduct) {
      form.setValue('details', form.watch('details').map((detail) => {
        if (detail.productId === selectProduct.productId) {
          return { ...detail, amount: data.amount }
        }
        return detail
      }))
      unSelectProduct()
    } else {
      form.setValue('details', [...form.watch('details'), data])
    }
    formDetails.reset()
    setIsDialogOpen(false)
  }

  const unSelectProduct = () => {
    setSelectProduct(null)
    formDetails.reset()
  }

  useEffect(() => {
    if (searchParams.get('id') !== providerParam) {
      setProviderParam(searchParams.get('id') ?? '')
      form.setValue('providerId', searchParams.get('id') ?? '')
    }
  }, [searchParams.get('id')])

  let subscribePurchaseOrder = true
  useEffect(() => {
    if (subscribePurchaseOrder && purchaseOrder) {
      setProviderParam(purchaseOrder.provider.id)
      setSearchParams({ id: purchaseOrder.provider.id })
    }
    return () => {
      subscribePurchaseOrder = false
    }
  }, [purchaseOrder])

  let subscribe = true
  useEffect(() => {
    if (subscribe && (errorGetPurchase ?? errorBranchs ?? errorProvider)) {
      const error = errorGetPurchase ?? errorBranchs ?? errorProvider
      toast.error(error?.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [errorGetPurchase, errorBranchs, errorProvider])

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
              onClick={() => { navigate(PrivateRoutes.PURCHASE_ORDER) }}
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
              <Button type="submit" size="sm" disabled={isMutatingCreate || isMutatingUpdate}>{buttonText}</Button>
            </div>
          </div>
          <div className='grid gap-4 lg:gap-6 lg:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr]'>
            <div className="grid gap-4 lg:gap-6">
              <div className="flex flex-col gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                  <CardHeader className='px-4 lg:px-6'>
                    <CardTitle>Detalles de la orden</CardTitle>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Razón *</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Razón de la orden de compra..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 lg:gap-6 w-full relative">
                      <FormField
                        control={form.control}
                        name="providerId"
                        defaultValue={purchaseOrder?.provider?.id}
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-between space-y-1 pt-1">
                            <FormLabel className='leading-normal'>Proveedor *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn('justify-between font-normal', !field.value && 'text-muted-foreground')}
                                  >
                                    {field.value
                                      ? (<span className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                        {providers?.find((provider: Provider) => provider.id === field.value)?.name}
                                      </span>)
                                      : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar proveedor</span>}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="p-0">
                                <Command>
                                  <CommandInput placeholder="Seleccionar un producto..." />
                                  <CommandList>
                                    <CommandEmpty>Proveedor no encontrado.</CommandEmpty>
                                    <CommandGroup>
                                      {providers?.map((provider: Provider) => (
                                        <CommandItem
                                          value={provider.name}
                                          key={provider.id}
                                          onSelect={() => {
                                            form.setValue('providerId', provider.id)
                                            form.clearErrors('providerId')
                                            if (searchParams.get('id') !== provider.id) {
                                              form.setValue('details', [])
                                              formDetails.reset()
                                            }
                                            setSearchParams({ id: provider.id })
                                          }}
                                        >
                                          <CheckCheckIcon
                                            className={cn('mr-2 h-4 w-4', provider.id === field.value ? 'opacity-100' : 'opacity-0')}
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
                                    className={cn('justify-between font-normal', !field.value && 'text-muted-foreground')}
                                  >
                                    {field.value
                                      ? (<span className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                        {branches?.find((branch: Branch) => branch.id === field.value)?.name}
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
                                    <CommandEmpty>Sucursal no encontradoa.</CommandEmpty>
                                    <CommandGroup>
                                      {branches?.map((branch: Branch) => (
                                        <CommandItem
                                          value={branch.name}
                                          key={branch.id}
                                          onSelect={() => {
                                            form.setValue('branchId', branch.id)
                                            form.clearErrors('branchId')
                                          }}
                                        >
                                          <CheckCheckIcon
                                            className={cn('mr-2 h-4 w-4', branch.id === field.value ? 'opacity-100' : 'opacity-0')}
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
                        name="state"
                        defaultValue={purchaseOrder?.state}
                        render={({ field }) => (
                          <FormItem className="flex flex-col space-y-2 pt-1">
                            <FormLabel className='leading-normal'>Estado</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn('justify-between font-normal', !field.value && 'text-muted-foreground')}
                                  >
                                    {field.value
                                      ? (<span className='text-ellipsis whitespace-nowrap overflow-hidden'>
                                        {ArrState?.find((state) => state.name === field.value)?.name}
                                      </span>)
                                      : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar estado</span>}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="p-0">
                                <Command>
                                  <CommandInput placeholder="Seleccionar un producto..." />
                                  <CommandList>
                                    <CommandEmpty>Estado no encontrado</CommandEmpty>
                                    <CommandGroup>
                                      {ArrState?.map((state) => (
                                        <CommandItem
                                          value={state.name}
                                          key={state.name}
                                          onSelect={() => { form.setValue('state', state.name) }}
                                        >
                                          <CheckCheckIcon
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              state.name === field.value ? 'opacity-100' : 'opacity-0'
                                            )}
                                          />
                                          {state.name === STATE.DRAFT ? 'Borrador (Solo tú lo verás)' : 'Pendiente (Todos lo verán)'}
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

            <div className="grid gap-4 lg:gap-6 h-fit">
              <Card x-chunk="dashboard-07-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
                <CardHeader>
                  <CardTitle className='w-full flex items-center'>
                    Productos
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <AlertDialogTrigger asChild className='w-fit ml-auto'>
                        <Button
                          onClick={(event) => { event.stopPropagation() }}
                          variant='outline'
                          className='!mt-0 h-8'
                          disabled={form.watch('providerId') === '' || !searchParams.get('id')}
                        >
                          Agregar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='bg-light-bg-secondary dark:bg-dark-bg-secondary'>
                        <Form {...formDetails}>
                          <form
                            onSubmit={() => { }}
                            className="w-full flex flex-col gap-4 lg:gap-6 relative"
                          >
                            <AlertDialogHeader>
                              <AlertDialogTitle>Productos del proveedor</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="grid gap-4 lg:gap-6 relative w-full ">
                              <FormField
                                control={formDetails.control}
                                name="productId"
                                defaultValue=''
                                render={({ field }) => {
                                  const productProvider = providerProducts?.find((providerProduct: ProviderProduct) => providerProduct.product.id === field.value)
                                  return (
                                    <FormItem className="flex flex-col space-y-1 pt-1 w-full relative">
                                      <FormLabel className='leading-normal w-fit'>Producto *</FormLabel>
                                      <Popover>
                                        <PopoverTrigger asChild className='w-full bg-red-500 overflow-hidden relative max-w-full'>
                                          <FormControl className='overflow-hidden'>
                                            <Button
                                              variant="outline"
                                              role="combobox"
                                              className={cn('w-full justify-between font-normal text-ellipsis whitespace-nowrap overflow-hidden', !field.value && 'text-muted-foreground')}
                                              disabled={selectProduct !== null}
                                            >
                                              {field.value
                                                ? (<span className='relative text-ellipsis whitespace-nowrap overflow-hidden'>
                                                  {productProvider?.product.name}
                                                </span>)
                                                : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar producto.</span>}
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
                                                {providerProducts?.map((providerProduct: ProviderProduct) =>
                                                  !form.watch('details').map(pod => pod.productId).includes(providerProduct.product.id) && (
                                                    <CommandItem
                                                      value={providerProduct.product.name}
                                                      key={providerProduct.product.id}
                                                      onSelect={() => {
                                                        formDetails.clearErrors('productId')
                                                        formDetails.setValue('productId', providerProduct.product.id)
                                                      }}
                                                    >
                                                      <CheckCheckIcon
                                                        className={cn('mr-2 h-4 w-4', providerProduct.product.id === field.value ? 'opacity-100' : 'opacity-0')}
                                                      />
                                                      {providerProduct.product.name}
                                                    </CommandItem>
                                                  ))}
                                              </CommandGroup>
                                            </CommandList>
                                          </Command>
                                        </PopoverContent>
                                      </Popover>
                                      <FormMessage />
                                    </FormItem>
                                  )
                                }}
                              />
                              <FormField
                                control={formDetails.control}
                                name="amount"
                                defaultValue={1}
                                render={({ field }) => (
                                  <FormItem className='flex flex-col space-y-2 pt-1 w-full relative'>
                                    <FormLabel>Cantidad</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type='number'
                                        placeholder="Ingresa la cantidad..."
                                        onChange={(e) => {
                                          if (selectProduct) {
                                            setSelectProduct({ ...selectProduct, amount: Number(e.target.value) })
                                          } else {
                                            field.onChange(Number(e.target.value))
                                          }
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div>
                              <AlertDialogDescription>
                                Precio de compra: {providerProducts?.find((product) => product.product.id === formDetails.watch('productId'))?.product?.price_purchase ?? 0} bs.
                              </AlertDialogDescription>
                              <AlertDialogDescription>
                                SubTotal: {(providerProducts?.find((product) => product.product.id === formDetails.watch('productId'))?.product?.price_purchase ?? 0) * formDetails.watch('amount')} Bs.
                              </AlertDialogDescription>
                            </div>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={unSelectProduct} className='h-fit'>Cancelar</AlertDialogCancel>
                              <AlertDialogAction className='h-full' type='button' onClick={formDetails.handleSubmit(onSubmitDetails)}>
                                {selectProduct ? 'Actualizar' : 'Agregar producto'}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </form>
                        </Form>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardTitle>
                  {
                    form.formState.errors.details &&
                    form.watch('details').length === 0 &&
                    <CardDescription className='!text-danger'>
                      Debe seleccionar al menos un producto para poder crear la orden de compra.
                    </CardDescription>}
                </CardHeader>
                {/* <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    </div> */}
                <CardContent className='overflow-hidden relative w-full'>
                  <div className='overflow-x-auto'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead>Cantidad</TableHead>
                          <TableHead>SubTotal</TableHead>
                          {/* <TableHead className="hidden md:table-cell">Productos</TableHead> */}
                          <TableHead><div className='sr-only'></div></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {form.watch('details')?.map((detail, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {providerProducts?.find((product) => product.product.id === detail.productId)?.product.name}
                            </TableCell>
                            <TableCell>
                              {detail.amount}
                            </TableCell>
                            <TableCell>
                              Bs. {(providerProducts?.find((product) => product.product.id === detail.productId)?.product?.price_purchase ?? 0) * detail.amount}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => {
                                    setSelectProduct(detail)
                                    setIsDialogOpen(true)
                                  }}>Editar</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    form.setValue('details', form.watch('details').filter((_, i) => i !== index))
                                  }}>Remover</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {form.watch('details').length === 0 && (
                      <p className='pt-4 px-4 text-muted-foreground dark:text-dark-text-secondary'>No hay productos agregados</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button onClick={() => { navigate(PrivateRoutes.PRODUCT) }} type="button" variant="outline" size="sm">
              Descartar
            </Button>
            <Button type="submit" size="sm" disabled={isMutatingCreate || isMutatingUpdate}>
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default PurchaseOrderFormPage
