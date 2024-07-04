import { toast } from 'sonner'
import { type ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CheckCheckIcon, ChevronLeftIcon, ChevronsUpDownIcon } from 'lucide-react'

import { useHeader } from '@/hooks'

import { cn } from '@/lib/utils'
import { type IFormProps, PrivateRoutes } from '@/models'
// import { getFirstLetterOfEachWord } from '@/utils/string.utils'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
// import { useGetMutationTanks } from '@/modules/inventory/hooks/useTank'
// import { type Tank } from '@/modules/inventory/models/tank.model'
// import { type CreateBuyDetail } from '@/modules/buy/models/buy-note.model'
import { useGetMutationPurchaseOrder } from '@/modules/buy/hooks/usePurchaseOrder'
// import { useCreateBuyNote } from '@/modules/buy/hooks/useBuyNote'
// import { STATE } from '@/modules/buy/constants/state.constants'
import { type CreateSaleDetail, type CreateSale } from '../../models/sale.model'
import { useGetDispenser } from '../../hooks/useDispenser'
import { useGetHoseMutation } from '../../hooks/useHose'
import { useCreateSale, useGetCustomerMutation } from '../../hooks/useSale'
import useDebounce from '@/hooks/useDebounce'
import { Switch } from '@/components/ui/switch'

const formSchemaDetails = z.object({
  amount: z.number()
    .min(1, 'La cantidad es requerida'),
  price: z.number().positive().min(1, 'El precio es requerido'),
  productId: z.string().min(1, 'El producto es requerido')
}) satisfies ZodType<CreateSaleDetail>

const formSchema = z.object({
  discount: z.number().optional(),
  amountPaid: z.number().min(1, 'El monto pagado es requerido'),
  amountReceivable: z.number().min(1, 'El monto recivido es requerido'),
  amountReturned: z.number().min(0, 'El monto devuelto es requerido'),
  customerName: z.string().min(1, 'El nombre del cliente es requerido'),
  nit: z.string().min(1, 'El nit es requerido'),
  plate: z.string().min(1, 'La placa es requerida'),
  hoseId: z.string().min(1, 'La manguera es requerida'),
  details: z.array(formSchemaDetails)

}) satisfies ZodType<CreateSale>

// interface ISelectProduct extends CreateBuyDetail {
//   productId: string
// }

function SaleProductFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Ventas', path: PrivateRoutes.SALES },
    { label: buttonText }
  ])

  // const [selectProduct, setSelectProduct] = useState<ISelectProduct | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  // const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const [SelectedTanks, setSelectedTanks] = useState<Tank[]>([] as Tank[])
  const [hasVehicle, setHasVehicle] = useState(false)
  const [searchCustomer, setSearchCustomer] = useState('')
  const debounceSearchNit = useDebounce(searchCustomer, 1000)

  // const { purchaseOrders } = useGetAllPurchaseOrders({ isGetAll: true })
  const { purchaseOrder } = useGetMutationPurchaseOrder()
  // const { createBuyNote, isMutating } = useCreateBuyNote()
  const { createSale, isMutating } = useCreateSale()
  // const { getTanksByProduct, tanks } = useGetMutationTanks()
  const { dispenser } = useGetDispenser(id)
  const { getHoseMutation, hose } = useGetHoseMutation()
  const { getCustomerMutation, customer, error: errorCustomer } = useGetCustomerMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discount: 0,
      amountPaid: 0,
      amountReceivable: 0,
      amountReturned: 0,
      customerName: 's/n',
      nit: 's/n',
      plate: 's/n',
      hoseId: '',
      details: [{ amount: 0, price: 0, productId: '' }]
    }
  })

  const formDetails = useForm<z.infer<typeof formSchemaDetails>>({
    resolver: zodResolver(formSchemaDetails),
    defaultValues: {
      amount: 0,
      price: 0,
      productId: ''
    }
  })

  // useEffect(() => {
  //   if (selectProduct) {
  //     formDetails.setValue('productId', String(selectProduct.productId))
  //     formDetails.setValue('amount', Number(selectProduct.amount))
  //     void getTanksByProduct(selectProduct.productId)
  //     formDetails.setValue('price', Number(selectProduct.price))
  //     // formDetails.setValue('tankId', String(selectProduct.tankId))
  //     // formDetails.setValue('newBatch.code', String(selectProduct.newBatch?.code))
  //     // formDetails.setValue('newBatch.detail', String(selectProduct.newBatch?.detail))
  //     // formDetails.setValue('newBatch.expiration_date', String(selectProduct.newBatch?.expiration_date))
  //     // formDetails.setValue('newBatch.initial_stock', Number(selectProduct.newBatch?.initial_stock))
  //     // formDetails.setValue('newBatch.productId', String(selectProduct.productId))
  //   }
  // }, [selectProduct])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // const cleanObject = data.details.map((detail) => {
    //   if (detail.tankId === 'lote') {
    //     const { tankId, productId, newBatch, ...rest } = detail
    //     const formatDDMMYYYY = newBatch.expiration_date.split('-').reverse().join('/')
    //     return { ...rest, newBatch: { ...newBatch, expiration_date: formatDDMMYYYY } }
    //   } else {
    //     const { newBatch, productId, ...rest } = detail
    //     return rest
    //   }
    // })
    // const objectData: CreateBuy = { ...data, details: cleanObject }
    const objectData: CreateSale = { ...data, details: data.details.map((detail) => ({ amount: detail.amount, price: detail.price })) }
    toast.promise(createSale(objectData), {
      loading: 'Creando nota de compra...',
      success: () => {
        setTimeout(() => {
          // navigate(PrivateRoutes.SALES, { replace: true })
        }, 1000)
        form.reset()
        formDetails.reset()
        return 'Nota de compra creada exitosamente'
      },
      error(error) {
        return error.errorMessages[0] && 'Error al crear la nota de compra'
      }
    })
  }

  // const onSubmitDetails = (data: z.infer<typeof formSchemaDetails>) => {
  // console.log(data)
  // const OrderProdcut = purchaseOrder?.purchaseOrderDetails.find(p => p.product?.id === data.productId)
  // const maxValue = Number(OrderProdcut?.amount)
  // if (OrderProdcut?.product?.fuel) {
  //   const tankSelected = SelectedTanks.find(t => t.id === data.tankId)!
  //   if (data.amount > (tankSelected?.capacity_max - tankSelected?.stock)) {
  //     formDetails.setFocus('amount')
  //     formDetails.setError('amount', { message: 'No puede ser mayor a la capacidad maxima del tanque, por favor seleccione menor o igual a: ' + (tankSelected?.capacity_max - tankSelected?.stock) })
  //     return
  //   }
  // }
  // if (data.amount > maxValue) {
  //   formDetails.setFocus('amount')
  //   formDetails.setError('amount', { message: 'No puede ser mayor a la cantidad de la orden: ' + maxValue })
  // } else {
  //   if (selectProduct) {
  //     form.setValue('details', form.watch('details').map((detail) => {
  //       if (detail.productId === selectProduct.productId) {
  //         return { ...detail, ...data }
  //       }
  //       return detail
  //     }))
  //     unSelectProduct()
  //   } else {
  //     form.setValue('details', [...form.watch('details'), data])
  //   }
  //   formDetails.reset()
  //   setSelectProduct(null)
  //   setIsDialogOpen(false)
  // }
  // }

  // const unSelectProduct = () => {
  //   setSelectProduct(null)
  //   formDetails.reset()
  // }

  // let subscribe = true
  useEffect(() => {
    if (searchParams.get('id') !== null) {
      const id = String(searchParams.get('id'))
      void getHoseMutation(id)
      form.setValue('hoseId', String(searchParams.get('id')) ?? '')
    }
    return () => {
      // subscribe = false
    }
  }, [searchParams.get('id')])

  let subscribeHose = true
  useEffect(() => {
    if (subscribeHose && hose) {
      const discount = hose.tank.product?.product_discount
      const price = hose.tank.product?.price_sale
      const applyDiscount = (price ?? 0) - ((price ?? 0) * (discount ?? 0) / 100)
      form.setValue('discount', discount ?? 0)
      form.setValue('details', [{ amount: 0, price: Number(applyDiscount ?? 0), productId: hose.tank.product?.id ?? '' }])
    }
    return () => {
      subscribeHose = false
    }
  }, [hose])

  // useEffect(() => {
  //   if (form.watch('nit') !== '') {
  //     // setSearchCustomer(form.watch('nit'))
  //   }
  // }, [form.watch('nit')])

  useEffect(() => {
    if (debounceSearchNit !== '' && debounceSearchNit.length > 5) {
      void getCustomerMutation(debounceSearchNit)
    }
  }, [debounceSearchNit])

  useEffect(() => {
    if (Object.entries(customer).length > 0) {
      form.setValue('nit', customer.nit)
      form.setValue('customerName', customer.name ?? 's/n')
      form.setValue('plate', customer.plate ?? 's/n')
    }
  }, [customer])

  useEffect(() => {
    const currentValue = form.watch('details.0.amount') ?? 0
    if (form.watch('details.0.amount') > 0) {
      form.setValue('amountPaid', parseFloat((currentValue * form.watch('details.0.price')).toFixed(2)))
      // form.clearErrors('amountPaid')
    } else {
      form.setValue('amountPaid', 0)
      form.clearErrors('amountPaid')
    }
    // const maxValue = Number(purchaseOrder?.purchaseOrderDetails.find(p => p.product?.id === formDetails.watch('productId'))?.amount)
    // const totalAmount = Number(form.watch('details').reduce((acc, product) => acc + (product.amount * product.price), 0))
    // form.setValue('totalAmount', totalAmount)
    // if (currentValue > maxValue) {
    //   formDetails.setError('amount', { message: 'No puede ser mayor a la cantidad de la orden: ' + maxValue })
    // } else {
    //   formDetails.clearErrors('amount')
    // }
  }, [form.watch('details.0.amount')])

  let subscribe = true
  useEffect(() => {
    if (subscribe && (errorCustomer)) {
      const error = errorCustomer
      toast.info(error?.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [errorCustomer])

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
              onClick={() => { navigate(PrivateRoutes.SALES) }}
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
              <Button type="button" onClick={() => { navigate(PrivateRoutes.BUY) }} variant="outline" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm" disabled={isMutating}>{buttonText}</Button>
            </div>
          </div>
          <div className='grid gap-4 lg:gap-6 lg:grid-cols-[300px_1fr] xl:grid-cols-[350px_1fr]'>
            <div className="grid gap-4 lg:gap-6">
              <div className="flex flex-col gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                  <CardHeader className='px-4 lg:px-6'>
                    <CardTitle>Detalles de la venta</CardTitle>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <div className='flex flex-row gap-4 justify-between items-center'>
                      <div className='flex flex-col'>
                        <div className='font-medium text-light-text-primary dark:text-dark-text-primary'>
                          ¿Tiene vehículo?
                        </div>
                      </div>
                      <Switch
                        checked={hasVehicle}
                        onCheckedChange={(e) => {
                          setHasVehicle(e)
                          if (!e) {
                            form.setValue('plate', 's/n')
                            form.clearErrors('plate')
                          }
                        }}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="hoseId"
                        defaultValue={purchaseOrder?.id ?? ''}
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-between space-y-1 pt-1">
                            <FormLabel className='leading-normal'>Manguera *</FormLabel>
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
                                        {dispenser?.hoses.find((item) => item.id === field.value)?.tank.fuel.type}
                                      </span>)
                                      : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar manguera</span>}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="p-0">
                                <Command>
                                  <CommandInput placeholder="Seleccionar una orden..." />
                                  <CommandList>
                                    <CommandEmpty>Manguera no encontrada.</CommandEmpty>
                                    <CommandGroup>
                                      {dispenser?.hoses.filter(po => po.is_active).map((item) => (
                                        <CommandItem
                                          value={item.tank.fuel.type}
                                          key={item.id}
                                          onSelect={() => {
                                            form.setValue('hoseId', item.id)
                                            form.clearErrors('hoseId')
                                            setSearchParams({ id: item.id })
                                          }}
                                        >
                                          <CheckCheckIcon
                                            className={cn('mr-2 h-4 w-4', item.id === field.value ? 'opacity-100' : 'opacity-0')}
                                          />
                                          <div className='flex flex-col'>
                                            <span className='text-light-text-secondary dark:text-dark-text-secondary'>
                                              Manguera de {item.tank.fuel.type}
                                            </span>
                                            <span>{item.tank.name} | stock: {item.tank.stock} Lts.</span>
                                          </div>
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
                        name="nit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nit *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nit *"
                                {...field}
                                onChange={(e) => {
                                  form.setValue('nit', e.target.value)
                                  setSearchCustomer(e.target.value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerName"
                        defaultValue='s/n'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del cliente *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nombre del cliente"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {hasVehicle && <FormField
                        control={form.control}
                        name="plate"
                        defaultValue='s/n'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Placa</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Placa del vehículo"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-4 lg:gap-6 h-fit">
              <Card x-chunk="dashboard-07-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
                <CardHeader>
                  <CardTitle className='w-full flex items-center'>
                    Total de la venta Bs. {Number(form.watch('amountPaid') ?? 0).toFixed(2)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div className='flex items-center gap-2'>
                    <div className='font-semibold'>Monto por pagar</div>
                    <div>
                      {Number(form.watch('amountPaid') ?? 0).toFixed(2)}
                    </div>
                  </div> */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 items-end">
                    <FormField
                      control={form.control}
                      name="amountReceivable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monto recido</FormLabel>
                          <FormControl>
                            <Input {...field} type='number'
                              onChange={e => {
                                field.onChange(Number(e.target.value))
                                const value = Number(e.target.value ?? 0) - Number(form.watch('amountPaid') ?? 0)
                                form.setValue('amountReturned', parseFloat(value.toFixed(2)))
                              }}
                              step="0.5"
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="amountReturned"
                      disabled
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cambio</FormLabel>
                          <FormControl>
                            <Input {...field} type='number'
                              onChange={e => { field.onChange(Number(e.target.value)) }}
                              step="0.01"
                              placeholder="0.00"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <div className='w-full flex items-center text-xl font-medium pb-1'>
                      Cambio Bs. {Number(form.watch('amountReturned') ?? 0).toFixed(2)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
                <CardHeader>
                  <CardTitle className='w-full flex items-center gap-3'>
                    <img
                      width="40"
                      height="40"
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      src={hose?.tank.product?.image_url ? hose?.tank.product?.image_url : 'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4='}
                    />
                    {hose?.tank.product?.name}
                  </CardTitle>
                  {/* {
                    form.formState.errors.details &&
                    form.watch('details').length === 0 &&
                    <CardDescription className='!text-danger'>
                      Debe seleccionar al menos un producto para comprar productos
                    </CardDescription>}
                  {(form.formState.errors.details) && (purchaseOrder?.purchaseOrderDetails[0].product?.fuel
                    ? <CardDescription className='!text-danger'>
                      Hay productos que requieren tanque, seleccione un tanque para cada producto
                    </CardDescription>
                    : <CardDescription className='!text-danger'>
                      Hay productos que requieren lote, ingrese los detalles de cada lote
                    </CardDescription>)} */}
                </CardHeader>
                {/* <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    </div> */}
                <CardContent className='overflow-hidden relative w-full'>
                  <div className='overflow-x-auto'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cantidad</TableHead>
                          <TableHead>Precio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name="details.0.amount"
                              // defaultValue={0}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} type='number'
                                      onChange={e => { field.onChange(Number(e.target.value)) }}
                                      step="0.01"
                                      placeholder="0.00"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell>Bs. {form.watch('details.0.price')}</TableCell>
                        </TableRow>
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
            <Button type="submit" size="sm" disabled={isMutating}>
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default SaleProductFormPage
