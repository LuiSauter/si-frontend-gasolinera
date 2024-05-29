import { CheckCheckIcon, ChevronLeft, ChevronsUpDownIcon } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { useHeader } from '@/hooks'
import { type IFormProps, PrivateRoutes } from '@/models'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateFuel, useGetFuel, useUpdateFuel } from '@/modules/inventory/hooks/useFuel'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useGetAllProducts } from '@/modules/inventory/hooks/useProduct'
import { useEffect } from 'react'

const formSchema = z.object({
  type: z.string({ required_error: 'El tipo de combustible es requerido' }).min(1, 'El tipo de combustible es requerido'),
  name: z.string({ required_error: 'El nombre del combustible es requerido' }).min(1, 'El nombre del combustible es requerido'),
  octane: z.number({ required_error: 'El octanaje del combustible es requerido', invalid_type_error: 'El octanaje del combustible debe ser un número' }),
  is_active: z.boolean({ required_error: 'El estado del combustible es requerido' }).default(true),
  productId: z.string({ required_error: 'El producto es requerido' }).min(1, 'El producto es requerido')
})

function FuelForm({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Combustible', path: PrivateRoutes.FUEL },
    { label: title }
  ])
  const navigate = useNavigate()
  const { id } = useParams()
  const { fuel } = useGetFuel(id)
  const { createFuel, error, isMutating } = useCreateFuel()
  const { updateFuel, isMutating: isMutatingUpdate, error: errorUpdate } = useUpdateFuel()
  const { products, isLoading: isLoadingProducts } = useGetAllProducts()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      type: fuel?.type ?? '',
      name: fuel?.name ?? '',
      octane: fuel?.octane ?? 0,
      is_active: fuel?.is_active ?? true,
      productId: fuel?.product.id ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateFuel({ id, ...data }), {
        loading: 'Actualizando combustible...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.FUEL, { replace: true })
          }, 1000)
          return 'Combustible actualizado exitosamente'
        },
        error: 'Error al actualizar el Combustible'
      })
    } else {
      toast.promise(createFuel(data), {
        loading: 'Creando combustible...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.FUEL, { replace: true })
          }, 1000)
          return 'Combustible creado exitosamente'
        },
        error: 'Error al crear el Combustible'
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
              <Button type='button' onClick={() => { navigate(PrivateRoutes.FUEL) }} variant="outline" size="sm">
                Descartar
              </Button>
              <Button type='submit' size="sm" disabled={isMutating ?? isMutatingUpdate}>{buttonText}</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Detalles del Combustibe</CardTitle>
                  <CardDescription>
                    Ingrese los detalles del combustible
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre del combustible"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tipo de combustible"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                    <FormField
                      control={form.control}
                      name="octane"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grado de Octanage o Cetano *</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder="Grado de Octanage o Cetano..."
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
                        <FormItem className="flex flex-col">
                          <FormLabel>Producto *</FormLabel>
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
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
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
            </div>
          </div>
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
export default FuelForm
