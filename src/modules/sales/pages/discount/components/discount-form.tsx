import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PrivateRoutes } from '@/models/routes.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon, CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { z } from 'zod'
import { useEffect } from 'react'
import { useGetAllBranches } from '@/modules/company/hooks/useBranch'
import { type IFormProps } from '@/models'
import { useHeader } from '@/hooks'
import { useCreateDiscount, useGetDiscount, useUpdateDiscount } from '@/modules/sales/hooks/useDiscount'
import { Textarea } from '@/components/ui/textarea'
// import { DatePickerDemo } from './datePage'
import { Switch } from '@/components/ui/switch'
import { useGetAllProducts } from '@/modules/inventory/hooks/useProduct'
import Loading from '@/components/shared/loading'

import * as React from 'react'

import { format } from 'date-fns'

import { cn } from '@/lib/utils'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useSelector } from 'react-redux'
import { type RootState } from '@/redux/store'
import { useGetAllRole } from '@/modules/auth/hooks/useRole'
import { type Branch } from '@/modules/company/models/branch.model'

const formSchema = z.object({
  name: z.string().min(2, 'La ubicación debe tener al menos 3 caracteres')
    .max(50, 'La ubicación debe tener máximo 50 caracteres'),
  productIds: z.array(z.string()).min(1, 'Los permisos son requeridos'),
  type: z.string().max(20, 'El tipo debe tener máximo 20 catacteres'),
  percentage: z.number({ required_error: 'El porcentaje es requerido' })
    .positive('El porcentaje debe ser positivo')
    .min(0, 'El porcentaje minimo es 0')
    .max(100, 'El porcentaje máximo es 100'),
  branchId: z.string(),
  description: z.string(),
  final_date: z.date(),
  initial_date: z.date()
})

const DiscountForm = ({ buttonText, title }: IFormProps) => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Ventas', path: PrivateRoutes.DiSPENSER },
    { label: 'Descuentos', path: PrivateRoutes.DISCOUNT },
    { label: title }
  ])
  const user = useSelector((state: RootState) => state.user)
  const { allRoles } = useGetAllRole()
  const [initialDate, setInitialDate] = React.useState<Date>()
  const [finalDate, setFinalDate] = React.useState<Date>()
  const { branches } = useGetAllBranches({ isGetAll: false })
  const { id } = useParams()
  const navigate = useNavigate()
  const { createDiscount, isMutating } = useCreateDiscount()
  const { updateDiscount } = useUpdateDiscount()
  const { discount } = useGetDiscount(id)
  const { products, isLoading, filterOptions, setFilterOptions } = useGetAllProducts({ isGetAll: false, branchId: user.branch.id })
  const handleFilters = (id: string) => {
    setFilterOptions({ ...filterOptions, branch: id })
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: discount?.name ?? '',
      final_date: discount?.final_date ?? new Date('2024-06-06'),
      initial_date: discount?.initial_date ?? new Date('2024-06-06'),
      type: discount?.type ?? '',
      description: discount?.description ?? '',
      branchId: discount?.branch.id ?? '',
      percentage: discount?.percentage ?? 0,
      productIds: discount?.products.map((product) => product.id) ?? []
    }
  })
  useEffect(() => {
    if (discount) {
      form.reset({
        name: discount?.name ?? '',
        final_date: discount?.final_date ?? new Date(),
        initial_date: discount?.initial_date ?? new Date(),
        type: discount?.type ?? '',
        description: discount?.description ?? '',
        branchId: discount?.branch.id ?? '',
        percentage: discount?.percentage ?? 0,
        productIds: discount?.products.map((product) => product.id) ?? []
      })
    }
  }, [discount, form])
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    data.final_date = finalDate ?? new Date('2024-01-01')
    data.initial_date = initialDate ?? new Date('2024-01-01')
    if (!/admin/i.test(allRoles?.find((role) => role.id === user.role.id)?.name ?? '')) {
      data.branchId = user.branch.id
    }
    if (id) {
      toast.promise(updateDiscount({
        id,
        name: data?.name,
        final_date: data.final_date,
        initial_date: data.initial_date,
        type: data.type,
        description: data.description,
        branchId: data.branchId,
        percentage: data.percentage,
        productIds: data.productIds
      }), {
        loading: 'Actualizando descuento...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.DISCOUNT, { replace: true }) }, 1000)
          return 'Descuento actualizada exitosamente'
        },
        error: 'Error al actualizar el descuento'
      })
    } else {
      toast.promise(createDiscount({
        name: data?.name,
        final_date: data.final_date,
        initial_date: data.initial_date,
        type: data.type,
        description: data.description,
        branchId: data.branchId,
        percentage: data.percentage,
        productIds: data.productIds
      }), {
        loading: 'Creando descuento...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.DISCOUNT, { replace: true }) }, 1000)
          return 'Descuento creado exitosamente'
        },
        error: 'Error al crear el descuento'
      })
    }
  }

  return (
    <>
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
                <Button
                  type="button"
                  onClick={() => { navigate(PrivateRoutes.DISCOUNT) }}
                  variant="outline"
                  size="sm"
                >
                  Descartar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  onClick={() => { handleFilters('c1cdae9f-eb0b-4c48-9da9-f86a09f9290e') }}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_400px]">
              <div className="flex flex-col gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                  <CardHeader className='px-4 lg:px-6'>
                    <CardTitle>Detalles del descuento</CardTitle>
                    <CardDescription>
                      Ingrese los detalles del descuento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Descuento por..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="percentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Porcentaje</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder="50"
                                {...field}
                                onChange={(e) => { field.onChange(Number(e.target.value)) }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción del descuento..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Fechas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="initial_date"
                        render={({ field }) => (
                          <FormItem className='mb-4'>
                            <FormLabel>Fecha inicio del descuento</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !initialDate && 'text-muted-foreground'
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {id ? format(field.value, 'PPP') : initialDate ? format(initialDate, 'PPP') : <span>Seleccione fecha</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={initialDate}
                                  onSelect={(date) => {
                                    setInitialDate(date)
                                    form.setValue('initial_date', date ?? new Date())
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="final_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha de expiracion del descuento</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !finalDate && 'text-muted-foreground'
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {id ? format(field.value, 'PPP') : finalDate ? format(finalDate, 'PPP') : <span>Seleccione fecha</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={finalDate}
                                  onSelect={(date) => {
                                    setFinalDate(date)
                                    form.setValue('final_date', date ?? new Date())
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                    <Card x-chunk="dashboard-07-chunk-5">
                      <CardHeader>
                        <CardTitle>Otros</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormLabel>Seleccione el tipo</FormLabel>
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem className='mb-5'>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(e)
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger id="branchId" aria-label="Selecciona una sucursal">
                                    <SelectValue placeholder="Seleccione el tipo" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem key={'stock'} value='stock'>
                                      stock
                                    </SelectItem>
                                    <SelectItem key={'date'} value='date'>
                                      date
                                    </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      {(/admin/i.test(allRoles?.find((role) => role.id === user.role.id)?.name ?? '')) &&
                        <>
                        <FormLabel>Seleccione la sucrusal para obtener los productos</FormLabel>
                        <FormField
                          control={form.control}
                          name="branchId"
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(e)
                                  setFilterOptions({ ...filterOptions, branch: e })
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger id="branchId" aria-label="Selecciona una sucursal">
                                    <SelectValue placeholder="Selecciona una sucursal" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {branches?.map((branch: Branch) => (
                                    <SelectItem key={branch.id} value={branch.id}>
                                      {branch.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        </>
                      }
                      </CardContent>
                    </Card>
                </div>
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-3" className='w-full bg-light-bg-primary dark:bg-dark-bg-secondary'>
                    <CardHeader className='rounded-lg px-4 lg:px-6'>
                      <CardTitle className='flex gap-2 items-end'>Productos {form.formState.errors.productIds && (
                        <div className='text-danger dark:text-danger text-base leading-none font-medium'>
                          {form.formState.errors.productIds.message}
                        </div>
                      )}</CardTitle>
                      <CardDescription>
                        Seleccione los productos para el descuento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='px-4 lg:px-6'>
                      <div className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 h-full lg:gap-6'>
                        {isLoading
                          ? <div className="grid place-content-center w-full"><Loading/></div>
                          : <div className='flex flex-col gap-4 min-w-[250px]'>
                              <fieldset className="flex flex-col gap-6 rounded-lg border p-4 h-auto">
                                <legend className="-ml-1 px-1 text-sm">Listado Productos</legend>
                                <div className='grid gap-4'>
                                  {products.map((product) => {
                                    // const permission = permissions?.find(p => p.name === per)
                                    // if (!permission) return null
                                    return (
                                      <div key={product.id} className='flex flex-row gap-4 justify-between items-center'>
                                        <div className='flex flex-col'>
                                          <div className='font-medium text-light-text-primary dark:text-dark-text-primary'>
                                            {product.name}
                                            {/* {product.charAt(0).toUpperCase() + product.slice(1).replace(/_/g, ' ')} */}
                                          </div>
                                          <div className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>{product?.description}</div>
                                        </div>
                                        <Switch
                                          checked={form.watch('productIds').includes(product?.id ?? '')}
                                          onCheckedChange={(e) => {
                                            console.log(e, product?.id ?? '')
                                            if (e) {
                                              const productos = form.getValues('productIds')
                                              productos.push(product?.id ?? '')
                                              form.setValue('productIds', productos)
                                            } else {
                                              const productos = form.getValues('productIds')
                                              const index = productos.indexOf(product?.id ?? '')
                                              productos.splice(index, 1)
                                              form.setValue('productIds', productos)
                                            }
                                          }}
                                        />
                                      </div>
                                    )
                                  })}
                                </div>
                              </fieldset>
                            </div>
                        }
                      </div>
                    </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button onClick={() => { navigate(PrivateRoutes.DISCOUNT) }} type="button" variant="outline" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm" disabled = {isMutating}>
                {buttonText}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default DiscountForm
