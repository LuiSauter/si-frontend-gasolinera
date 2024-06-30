import { toast } from 'sonner'
import { type ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCheckIcon, ChevronLeftIcon, ChevronsUpDownIcon, MoreHorizontal } from 'lucide-react'

import { useHeader } from '@/hooks'
import { useCreateBuyNote } from '../../hooks/useBuyNote'
import { useGetAllPurchaseOrders, useGetMutationPurchaseOrder } from '../../hooks/usePurchaseOrder'

import { cn } from '@/lib/utils'
import { STATE } from '../../constants/state.constants'
import { type IFormProps, PrivateRoutes } from '@/models'
import { getFirstLetterOfEachWord } from '@/utils/string.utils'
import { type CreateBuyDetail, type CreateBuy } from '../../models/buy-note.model'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useGetMutationTanks } from '@/modules/inventory/hooks/useTank'
import { type Tank } from '@/modules/inventory/models/tank.model'

const formSchema = z.object({
  purchaseOrderId: z.string({ required_error: 'La sucursal es requerida' }).min(1, 'La sucursal es requerida'),
  providerId: z.string({ required_error: 'El proveedor es requerido' }).min(1, 'El proveedor es requerido'),
  details: z.array(z.object({
    amount: z.number().int().positive().min(1, 'La cantidad es requerida'),
    price: z.number().positive().min(1, 'El precio es requerido'),
    newBatch: z.object({
      productId: z.string({ required_error: 'El producto es requerido' }).min(1, 'El producto es requerido'),
      code: z.string({ required_error: 'El código es requerido' }).min(1, 'El código es requerido'),
      expiration_date: z.string({ required_error: 'La fecha de expiración es requerida' }).min(1, 'La fecha de expiración es requerida'),
      detail: z.string().optional(),
      initial_stock: z.number({ required_error: 'El stock inicial es requerido' }).int().positive().min(0, 'El stock inicial es requerido')
    }),
    tankId: z.string({ required_error: 'El tanque es requerido' }).min(1, 'El tanque es requerido'),
    productId: z.string().optional()
  })).min(1, 'Debes agregar al menos un producto'),
  totalAmount: z.number().positive().min(1, 'El monto total es requerido')
}) satisfies ZodType<CreateBuy>

const formSchemaDetails = z.object({
  amount: z.number()
    .int()
    .positive('Debe ser mayor a cero')
    .min(1, 'La cantidad es requerida'),
  price: z.number().positive().min(1, 'El precio es requerido'),
  newBatch: z.object({
    productId: z.string({ required_error: 'El producto es requerido' }).min(1, 'El producto es requerido'),
    code: z.string({ required_error: 'El código es requerido' }).min(1, 'El código es requerido'),
    expiration_date: z.string({ required_error: 'La fecha de expiración es requerida' }).min(1, 'La fecha de expiración es requerida'),
    detail: z.string().optional(),
    initial_stock: z.number({ required_error: 'El stock inicial es requerido' }).int().positive().min(1, 'El stock inicial es requerido')
  }),
  tankId: z.string().min(1, 'El tanque es requerido'),
  productId: z.string().optional()
}) satisfies ZodType<CreateBuyDetail>

interface ISelectProduct extends CreateBuyDetail {
  productId: string
}

function BuyFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compra', path: PrivateRoutes.BUY },
    { label: buttonText }
  ])

  const [selectProduct, setSelectProduct] = useState<ISelectProduct | null>(null)
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [SelectedTanks, setSelectedTanks] = useState<Tank[]>([] as Tank[])
  const { purchaseOrders } = useGetAllPurchaseOrders({ isGetAll: true })
  const { getPurchaseOrder, purchaseOrder } = useGetMutationPurchaseOrder()
  const { createBuyNote, isMutating } = useCreateBuyNote()
  const { getTanksByProduct, tanks } = useGetMutationTanks()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      purchaseOrderId: '',
      providerId: '',
      details: [],
      totalAmount: 0
    }
  })

  const formDetails = useForm<z.infer<typeof formSchemaDetails>>({
    resolver: zodResolver(formSchemaDetails),
    values: {
      amount: 0,
      price: 0,
      newBatch: {
        code: '', expiration_date: '', detail: '', initial_stock: 0, productId: ''
      },
      tankId: '',
      productId: ''
    }
  })

  useEffect(() => {
    if (selectProduct) {
      formDetails.setValue('productId', String(selectProduct.productId))
      formDetails.setValue('amount', Number(selectProduct.amount))
      void getTanksByProduct(selectProduct.productId)
      formDetails.setValue('price', Number(selectProduct.price))
      formDetails.setValue('tankId', String(selectProduct.tankId))
      formDetails.setValue('newBatch.code', String(selectProduct.newBatch?.code))
      formDetails.setValue('newBatch.detail', String(selectProduct.newBatch?.detail))
      formDetails.setValue('newBatch.expiration_date', String(selectProduct.newBatch?.expiration_date))
      formDetails.setValue('newBatch.initial_stock', Number(selectProduct.newBatch?.initial_stock))
      formDetails.setValue('newBatch.productId', String(selectProduct.productId))
    }
  }, [selectProduct])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const cleanObject = data.details.map((detail) => {
      if (detail.tankId === 'lote') {
        const { tankId, productId, newBatch, ...rest } = detail
        const formatDDMMYYYY = newBatch.expiration_date.split('-').reverse().join('/')
        return { ...rest, newBatch: { ...newBatch, expiration_date: formatDDMMYYYY } }
      } else {
        const { newBatch, productId, ...rest } = detail
        return rest
      }
    })
    const objectData: CreateBuy = { ...data, details: cleanObject }
    toast.promise(createBuyNote(objectData), {
      loading: 'Creando nota de compra...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.BUY, { replace: true })
        }, 1000)
        return 'Nota de compra creada exitosamente'
      },
      error(error) {
        return error.errorMessages[0] && 'Error al crear la nota de compra'
      }
    })
  }

  const onSubmitDetails = (data: z.infer<typeof formSchemaDetails>) => {
    const OrderProdcut = purchaseOrder?.purchaseOrderDetails.find(p => p.product?.id === data.productId)
    const maxValue = Number(OrderProdcut?.amount)
    if (OrderProdcut?.product?.fuel) {
      const tankSelected = SelectedTanks.find(t => t.id === data.tankId)!
      if (data.amount > (tankSelected?.capacity_max - tankSelected?.stock)) {
        formDetails.setFocus('amount')
        formDetails.setError('amount', { message: 'No puede ser mayor a la capacidad maxima del tanque, por favor seleccione menor o igual a: ' + (tankSelected?.capacity_max - tankSelected?.stock) })
        return
      }
    }
    if (data.amount > maxValue) {
      formDetails.setFocus('amount')
      formDetails.setError('amount', { message: 'No puede ser mayor a la cantidad de la orden: ' + maxValue })
    } else {
      if (selectProduct) {
        form.setValue('details', form.watch('details').map((detail) => {
          if (detail.productId === selectProduct.productId) {
            return { ...detail, ...data }
          }
          return detail
        }))
        unSelectProduct()
      } else {
        form.setValue('details', [...form.watch('details'), data])
      }
      formDetails.reset()
      setSelectProduct(null)
      setIsDialogOpen(false)
    }
  }

  const unSelectProduct = () => {
    setSelectProduct(null)
    formDetails.reset()
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe && searchParams.get('id') !== null) {
      const id = String(searchParams.get('id'))
      void getPurchaseOrder(id)
      form.setValue('purchaseOrderId', String(searchParams.get('id')) ?? '')
    }
    return () => {
      subscribe = false
    }
  }, [searchParams.get('id')])

  let subscribePurchaseOrder = true
  useEffect(() => {
    if (subscribePurchaseOrder && purchaseOrder) {
      const defaultBatch = { code: 'code123', expiration_date: '12/12/2024', detail: 'detail', initial_stock: 111, productId: 'productId' }
      setSearchParams({ id: purchaseOrder.id })
      form.setValue('purchaseOrderId', purchaseOrder.id)
      form.setValue('providerId', purchaseOrder.provider.id)
      form.setValue('totalAmount', purchaseOrder.total)
      form.setValue('details', purchaseOrder.purchaseOrderDetails.map((detail) => ({
        amount: detail.amount,
        price: detail.lastPurchasePrice,
        newBatch: !detail.product?.fuel
          ? { code: '', expiration_date: '', detail: '', initial_stock: detail.amount, productId: detail.product?.id ?? '' }
          : defaultBatch,
        tankId: detail.product?.fuel ? '' : 'lote',
        productId: detail.product?.id ?? ''
      })))
    }
    return () => {
      subscribePurchaseOrder = false
    }
  }, [purchaseOrder])

  useEffect(() => {
    const currentValue = formDetails.watch('amount')
    formDetails.setValue('newBatch.initial_stock', formDetails.watch('amount'))
    const maxValue = Number(purchaseOrder?.purchaseOrderDetails.find(p => p.product?.id === formDetails.watch('productId'))?.amount)
    const totalAmount = Number(form.watch('details').reduce((acc, product) => acc + (product.amount * product.price), 0))
    form.setValue('totalAmount', totalAmount)
    if (currentValue > maxValue) {
      formDetails.setError('amount', { message: 'No puede ser mayor a la cantidad de la orden: ' + maxValue })
    } else {
      formDetails.clearErrors('amount')
    }
  }, [formDetails.watch('amount'), formDetails.watch('productId')])

  // let subscribe = true
  // useEffect(() => {
  //   if (subscribe && (errorGetPurchase ?? errorBranchs ?? errorProvider)) {
  //     const error = errorGetPurchase ?? errorBranchs ?? errorProvider
  //     toast.error(error?.errorMessages[0])
  //   }
  //   return () => {
  //     subscribe = false
  //   }
  // }, [errorGetPurchase, errorBranchs, errorProvider])

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
              onClick={() => { navigate(PrivateRoutes.BUY) }}
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
                    <CardTitle>Detalles de la compra</CardTitle>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="purchaseOrderId"
                        defaultValue={purchaseOrder?.id ?? ''}
                        render={({ field }) => (
                          <FormItem className="flex flex-col justify-between space-y-1 pt-1">
                            <FormLabel className='leading-normal'>Orden de compra *</FormLabel>
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
                                        Orden {getFirstLetterOfEachWord(purchaseOrders?.find((order) => order.id === field.value)?.branch.name).toUpperCase()}-OC-{purchaseOrders?.find((order) => order.id === field.value)?.code}
                                      </span>)
                                      : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar orden de compra</span>}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="p-0">
                                <Command>
                                  <CommandInput placeholder="Seleccionar una orden..." />
                                  <CommandList>
                                    <CommandEmpty>Orden de compra no encontrada.</CommandEmpty>
                                    <CommandGroup>
                                      {purchaseOrders?.filter(po => [STATE.EARRING].includes(po.state)).map((order) => (
                                        <CommandItem
                                          value={order.id}
                                          key={order.id}
                                          onSelect={() => {
                                            form.setValue('purchaseOrderId', order.id)
                                            form.clearErrors('purchaseOrderId')
                                            setSearchParams({ id: order.id })
                                          }}
                                        >
                                          <CheckCheckIcon
                                            className={cn('mr-2 h-4 w-4', order.id === field.value ? 'opacity-100' : 'opacity-0')}
                                          />
                                          <div className='flex flex-col'>
                                            <span className='text-light-text-secondary dark:text-dark-text-secondary'>{`Orden ${getFirstLetterOfEachWord(order.branch.name).toUpperCase()}-OC-${order.code}`}</span>
                                            <span>{order.reason}</span>
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
                      {purchaseOrder &&
                        <div className='space-y-2'>
                          <div className='flex text-sm justify-between gap-2'>
                            <span className='text-light-text-secondary dark:text-dark-text-secondary'>Proveedor</span>
                            <span>{purchaseOrder.provider.name}</span>
                          </div>
                          <div className='flex text-sm justify-between gap-2'>
                            <span className='text-light-text-secondary dark:text-dark-text-'>Motivo</span>
                            <span>{purchaseOrder.reason}</span>
                          </div>
                          <div className='flex text-sm justify-between gap-2'>
                            <span className='text-light-text-secondary dark:text-dark-text-'>Sucursal</span>
                            <span>{purchaseOrder.branch.name}</span>
                          </div>
                        </div>
                      }
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
                          disabled={purchaseOrder?.purchaseOrderDetails?.length === form.watch('details').length}
                        >
                          Agregar
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='bg-light-bg-secondary dark:bg-dark-bg-secondary max-h-[90%] overflow-y-auto'>
                        <Form {...formDetails}>
                          <form
                            onSubmit={() => { }}
                            className="w-full flex flex-col gap-4 lg:gap-6 relative"
                          >
                            <AlertDialogHeader>
                              <AlertDialogTitle>Productos de la orden</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="grid gap-4 lg:gap-6 relative w-full ">
                              <FormField
                                control={formDetails.control}
                                name="productId"
                                defaultValue=''
                                render={({ field }) => {
                                  const productProvider = purchaseOrder?.purchaseOrderDetails?.find((purchaseDetail) => purchaseDetail.product?.id === field.value)
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
                                            // disabled={selectProduct !== null}
                                            >
                                              {field.value
                                                ? (<span className='relative text-ellipsis whitespace-nowrap overflow-hidden'>
                                                  {productProvider?.product?.name}
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
                                                {purchaseOrder?.purchaseOrderDetails?.map((purchaseDetail) =>
                                                  !form.watch('details').map(pod => pod.productId).includes(purchaseDetail.product?.id) && (
                                                    <CommandItem
                                                      value={purchaseDetail.product?.name}
                                                      key={purchaseDetail.product?.id}
                                                      onSelect={() => {
                                                        formDetails.clearErrors('productId')
                                                        formDetails.setValue('productId', purchaseDetail.product?.id)
                                                        formDetails.setValue('price', purchaseDetail.lastPurchasePrice)
                                                        formDetails.setValue('amount', purchaseDetail.amount)
                                                        formDetails.setValue('newBatch.productId', purchaseDetail.product?.id ?? '')
                                                        formDetails.setValue('newBatch.initial_stock', purchaseDetail.amount)
                                                        if (purchaseDetail.product?.fuel) {
                                                          formDetails.setValue('tankId', '')
                                                          formDetails.setValue('newBatch.code', 'code123')
                                                          formDetails.setValue('newBatch.detail', 'detail')
                                                          formDetails.setValue('newBatch.expiration_date', '12/12/2024')
                                                        } else {
                                                          formDetails.setValue('tankId', 'lote')
                                                        }
                                                        void getTanksByProduct(purchaseDetail.product?.id ?? '')
                                                      }}
                                                    >
                                                      <CheckCheckIcon
                                                        className={cn('mr-2 h-4 w-4', purchaseDetail.product?.id === field.value ? 'opacity-100' : 'opacity-0')}
                                                      />
                                                      {purchaseDetail.product?.name}
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
                              {formDetails.watch('productId') && <FormField
                                control={formDetails.control} name="amount"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Cantidad *</FormLabel>
                                    <FormControl>
                                      <Input
                                        type='number' placeholder="Cantidad" {...field}
                                        onChange={(e) => {
                                          field.onChange(Number(e.target.value))
                                          // formDetails.setValue('newBatch.initial_stock', Number(e.target.value))
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />}
                              {formDetails.watch('productId') && (purchaseOrder?.purchaseOrderDetails.find(p => p.product?.id === formDetails.watch('productId'))?.product?.fuel
                                ? <>
                                  <FormField
                                    control={formDetails.control}
                                    name="tankId"
                                    defaultValue=''
                                    render={({ field }) => {
                                      return (
                                        <FormItem className="flex flex-col space-y-1 pt-1 w-full relative">
                                          <FormLabel className='leading-normal w-fit'>Tanque *</FormLabel>
                                          <Popover>
                                            <PopoverTrigger asChild className='w-full bg-red-500 overflow-hidden relative max-w-full'>
                                              <FormControl className='overflow-hidden'>
                                                <Button
                                                  variant="outline"
                                                  role="combobox"
                                                  className={cn('w-full justify-between font-normal text-ellipsis whitespace-nowrap overflow-hidden', !field.value && 'text-muted-foreground')}
                                                // disabled={selectProduct !== null}
                                                >
                                                  {field.value
                                                    ? (<span className='relative text-ellipsis whitespace-nowrap overflow-hidden'>
                                                      {tanks?.find(tank => tank.id === field.value)?.name}
                                                    </span>)
                                                    : <span className='text-light-text-secondary dark:text-dark-text-secondary text-ellipsis whitespace-nowrap overflow-hidden'>Seleccionar tanque.</span>}
                                                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                              </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                              <Command>
                                                <CommandInput placeholder="Seleccionar un producto..." />
                                                <CommandList>
                                                  <CommandEmpty>Tanque no encontrado.</CommandEmpty>
                                                  <CommandGroup>
                                                    {tanks?.map((tank) => (
                                                      <CommandItem
                                                        value={tank?.name}
                                                        key={tank?.id}
                                                        onSelect={() => {
                                                          formDetails.clearErrors('tankId')
                                                          formDetails.setValue('tankId', tank?.id)
                                                          setSelectedTanks(prev => ([...prev.filter(t => t.product?.id !== formDetails.watch('productId')), tank]))
                                                        }}
                                                      >
                                                        <CheckCheckIcon
                                                          className={cn('mr-2 h-4 w-4', tank?.id === field.value ? 'opacity-100' : 'opacity-0')}
                                                        />
                                                        <div className='flex flex-col'>
                                                          <span className='text-light-text-secondary dark:text-dark-text-secondary'>{tank.name}</span>
                                                          <span>Stock: {tank.stock} | Maxima Cap.: {tank.capacity_max}</span>
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
                                      )
                                    }}
                                  />
                                </>
                                : <>
                                  <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                                    <FormField
                                      control={formDetails.control} name="newBatch.code"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Código *</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Ingrese el código del lote" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={formDetails.control} name="newBatch.expiration_date"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Fecha de expiración *</FormLabel>
                                          <FormControl>
                                            <Input
                                              min='2020-01-01'
                                              max='2100-12-31'
                                              type='date' placeholder="Ingresa la fecha de expiración"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                  <FormField
                                    control={formDetails.control} name="newBatch.detail"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Detalle</FormLabel>
                                        <FormControl>
                                          <Textarea placeholder="Descripción del producto..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </>)}
                            </div>
                            <div>
                              <AlertDialogDescription>
                                Precio de compra: Bs. {Number(formDetails.watch('price'))}
                              </AlertDialogDescription>
                              <AlertDialogDescription>
                                SubTotal: Bs. {Number(formDetails.watch('amount')) * Number(formDetails.watch('price'))}
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
                      Debe seleccionar al menos un producto para comprar productos
                    </CardDescription>}
                  {(form.formState.errors.details) && (purchaseOrder?.purchaseOrderDetails[0].product?.fuel
                    ? <CardDescription className='!text-danger'>
                      Hay productos que requieren tanque, seleccione un tanque para cada producto
                    </CardDescription>
                    : <CardDescription className='!text-danger'>
                      Hay productos que requieren lote, ingrese los detalles de cada lote
                    </CardDescription>)}
                </CardHeader>
                {/* <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    </div> */}
                <CardContent className='overflow-hidden relative w-full'>
                  <div className='overflow-x-auto'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          {purchaseOrder?.purchaseOrderDetails[0].product?.fuel
                            ? <TableHead>Tanque</TableHead>
                            : <>
                              <TableHead>Lote</TableHead>
                              <TableHead>Fecha Exp.</TableHead>
                            </>}
                          <TableHead>Cantidad</TableHead>
                          <TableHead>SubTotal</TableHead>
                          <TableHead><div className='sr-only'></div></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {form.watch('details')?.map((detail, index) => (
                          <TableRow key={index}>
                            <TableCell className='flex items-center justify-start gap-3'>
                              <img
                                width="40"
                                height="40"
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                src={purchaseOrder?.purchaseOrderDetails?.find((orderDetail) => orderDetail.product?.id === detail.productId)?.product?.image_url}
                              />
                              {purchaseOrder?.purchaseOrderDetails?.find((orderDetail) => orderDetail.product?.id === detail.productId)?.product?.name}
                            </TableCell>
                            {purchaseOrder?.purchaseOrderDetails[0].product?.fuel
                              ? <TableCell>{SelectedTanks?.find(t => t.id === detail.tankId)?.name ?? '-'}</TableCell>
                              // ? <TableCell>{detail.tankId ?? '-'}</TableCell>
                              : <>
                                <TableCell>{detail.newBatch?.code.length === 0 ? '-' : detail.newBatch?.code}</TableCell>
                                <TableCell>{detail.newBatch?.expiration_date.length === 0 ? '-' : detail.newBatch?.expiration_date}</TableCell>
                              </>}
                            <TableCell>{detail.amount}</TableCell>
                            <TableCell>Bs. {(detail.amount * detail.price).toFixed(2)}</TableCell>
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
                                    console.log(detail)
                                    setSelectProduct({
                                      productId: detail.productId!,
                                      amount: detail.amount,
                                      price: detail.price,
                                      newBatch: detail.newBatch,
                                      tankId: detail.tankId
                                    })
                                    setIsDialogOpen(true)
                                  }}>Editar</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    form.setValue('details', form.watch('details').filter((_, i) => i !== index))
                                    form.setValue('totalAmount', form.watch('totalAmount') - (detail.amount * detail.price))
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
                <CardFooter>
                  Total: Bs. {form.watch('totalAmount').toFixed(2)}
                </CardFooter>
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

export default BuyFormPage
