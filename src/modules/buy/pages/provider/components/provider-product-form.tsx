import { CheckCheckIcon, ChevronLeft, ChevronsUpDownIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useHeader } from '@/hooks'
import { type IFormProps, PrivateRoutes } from '@/models'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useGetAllProducts } from '@/modules/inventory/hooks/useProduct'
import { useEffect } from 'react'
import { useCreateProviderProduct, useGetProviderProduct, useUpdateProviderProduct } from '@/modules/buy/hooks/useProviderProduct'

const formSchema = z.object({
  detail: z.string().min(3, 'El detalle debe tener al menos 3 caracteres'),
  last_price: z.number({ required_error: 'El precio del producto es requerido', invalid_type_error: 'El precio del producto debe ser un número' }),
  productId: z.string({ required_error: 'El producto es requerido' }).min(1, 'El producto es requerido')
})

function ProviderProductForm({ buttonText, title }: IFormProps) {
  const { idProvider, id } = useParams()
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras', path: PrivateRoutes.PROVIDER },
    { label: 'Proveedores', path: PrivateRoutes.PROVIDER },
    { label: 'Detalles del proveedor', path: `${PrivateRoutes.PROVIDERPRODUCT}/${idProvider}/detalles` },
    { label: title }

  ])
  const navigate = useNavigate()

  const { createProviderProduct, error, isMutating } = useCreateProviderProduct()
  const { updateProviderProduct, isMutating: isMutatingUpdate, error: errorUpdate } = useUpdateProviderProduct()

  const { providerProduct } = useGetProviderProduct(id)
  // const { updateFuel, isMutating: isMutatingUpdate, error: errorUpdate } = useUpdateFuel()
  const { products, isLoading: isLoadingProducts } = useGetAllProducts()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      detail: '',
      last_price: 0,
      productId: ''
    },
    values: {
      last_price: providerProduct?.last_price ?? 0,
      detail: providerProduct?.details ?? '',
      productId: providerProduct?.product.id ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateProviderProduct({
        id,
        last_price: data.last_price,
        details: data.detail,
        productId: data.productId,
        providerId: idProvider ?? ''
      }), {
        loading: 'Actualizando producto...',
        success: () => {
          setTimeout(() => { navigate(`${PrivateRoutes.PROVIDERPRODUCT}/${idProvider}/detalles`, { replace: true }) }, 1000)
          return 'Producto actualizado exitosamente'
        },
        error: 'Error al actualizar el producto'
      })
    } else {
      toast.promise(createProviderProduct({
        last_price: data.last_price,
        details: data.detail,
        productId: data.productId,
        providerId: idProvider ?? ''
      }), {
        loading: 'Asignando producto...',
        success: () => {
          setTimeout(() => { navigate(`${PrivateRoutes.PROVIDERPRODUCT}/${idProvider}/detalles`, { replace: true }) }, 1000)
          return 'producto asignado exitosamente'
        },
        error: 'Error al asignar el prodcuto'
      })
    }
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe && (error ?? errorUpdate)) {
      const newError = error ?? errorUpdate
      toast.error(newError?.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [error, errorUpdate])

  return (
    <section className="grid flex-1 items-start gap-4 lg:gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full flex flex-col gap-4 lg:gap-6"
        >
          <div className="flex items-center gap-4">
            <Button type='button' onClick={() => { navigate(-1) }} variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">volver</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {title}
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button type='button' onClick={() => { navigate(`${PrivateRoutes.PROVIDERPRODUCT}/${idProvider}/detalles`) }} variant="outline" size="sm">
                Descartar
              </Button>
              <Button type='submit' size="sm" disabled={isMutating ?? isMutatingUpdate}>{buttonText}</Button>
            </div>
          </div>
          {/* <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"> */}
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Detalles del producto para el Proveedor</CardTitle>
                  <CardDescription>
                    En esta sección puede asignar un producto al proveedor. Recuerda que los campos marcados con * son obligatorios
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                    <FormField
                      control={form.control}
                      name="last_price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Último precio *</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder="Coloque un precio..."
                              {...field}
                              onChange={(e) => { field.onChange(Number(e.target.value)) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="productId"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-between space-y-1 pt-1">
                          <FormLabel className='leading-normal'>Producto *</FormLabel>
                          {!isLoadingProducts && <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'justify-between',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? products?.find(
                                      (product) => product.id === field.value
                                    )?.name
                                    : 'Selecciona un producto'}
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
                                    {products?.map((product) => (
                                      <CommandItem
                                        value={product.name}
                                        key={product.id}
                                        onSelect={() => {
                                          form.setValue('productId', product.id)
                                        }}
                                      >
                                        <CheckCheckIcon
                                          className={cn(
                                            'mr-2 h-4 w-4',
                                            product.id === field.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                        {product.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid lg:grid-cols-1 gap-4 lg:gap-6">
                    <FormField
                      control={form.control}
                      name="detail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detalle *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Coloque un detalle..."
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
            {/* <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Estado del combustible</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value === 'true')
                          }}
                          value={field.value ? 'true' : 'false'}
                          name={field.name}
                          disabled={field.disabled}
                          defaultValue={field.value ? 'true' : 'false'}
                        >
                          <FormControl>
                            <SelectTrigger aria-label="Selecciona un estado">
                              <SelectValue placeholder="Selecciona una estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='true'>Activo</SelectItem>
                            <SelectItem value='false'>Inactivo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div> */}
          {/* </div> */}
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button type='button' onClick={() => { navigate(PrivateRoutes.FUEL) }} variant="outline" size="sm">
              Cancelar
            </Button>
            <Button type='submit' size="sm" disabled={isMutating ?? isMutatingUpdate}>{buttonText}</Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
export default ProviderProductForm
