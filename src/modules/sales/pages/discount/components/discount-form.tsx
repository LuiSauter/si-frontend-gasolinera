import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PrivateRoutes } from '@/models/routes.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
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

const formSchema = z.object({
  name: z.string().min(2, 'La ubicación debe tener al menos 3 caracteres')
    .max(50, 'La ubicación debe tener máximo 50 caracteres'),
  amount: z.number({ required_error: 'La cantidad es requerida' })
    .positive('El cantidad debe ser positivo'),
  type: z.string().max(20, 'El tipo debe tener máximo 20 catacteres'),
  percentage: z.number({ required_error: 'El porcentaje es requerido' })
    .positive('El porcentaje debe ser positivo')
    .min(0, 'El porcentaje minimo es 0')
    .max(100, 'El porcentaje máximo es 100'),
  branchId: z.string().min(2).max(50),
  is_active: z.boolean().default(true).optional(),
  description: z.string()
})

const DiscountForm = ({ buttonText, title }: IFormProps) => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Ventas', path: PrivateRoutes.DiSPENSER },
    { label: 'Descuentos', path: PrivateRoutes.DISCOUNT },
    { label: title }
  ])

  const { branches } = useGetAllBranches()
  const { id } = useParams()
  const navigate = useNavigate()
  const { createDiscount, isMutating, error } = useCreateDiscount()
  const { updateDiscount, error: errorUpdate } = useUpdateDiscount()
  const { discount } = useGetDiscount(id)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: discount?.name ?? '',
      amount: discount?.amount ?? 0,
      type: discount?.type ?? '',
      description: discount?.description ?? '',
      branchId: discount?.branch.id ?? '',
      is_active: discount?.is_active ?? true,
      percentage: discount?.percentage ?? 0
    }
  })

  useEffect(() => {
    if (discount) {
      form.reset({
        name: discount?.name ?? '',
        amount: discount?.amount ?? 0,
        type: discount?.type ?? '',
        description: discount?.description ?? '',
        branchId: discount?.branch.id ?? '',
        is_active: discount?.is_active ?? true,
        percentage: discount?.percentage ?? 0
      })
    }
  }, [discount, form])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateDiscount({
        id,
        name: data.name,
        amount: data.amount,
        type: data.type,
        description: data.description,
        branchId: data.branchId,
        is_active: data.is_active ?? true,
        percentage: data.percentage
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
        name: data.name,
        amount: data.amount,
        type: data.type,
        description: data.description,
        branchId: data.branchId,
        is_active: data.is_active ?? true,
        percentage: data.percentage
      }), {
        loading: 'Creando descuento...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.DISCOUNT, { replace: true }) }, 1000)
          return 'Descuent creado exitosamente'
        },
        error: 'Error al crear el descuento'
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
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px]">
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
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="porcentual..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cantidad de descuentos</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder="0"
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
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Estado del producto</CardTitle>
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
                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Sucursal</CardTitle>
                    <CardDescription>
                      Seleccione la sucursal del producto
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="branchId"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="branchId" aria-label="Selecciona una sucursal">
                                <SelectValue placeholder="Selecciona una sucursal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {branches?.map((branch) => (
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
