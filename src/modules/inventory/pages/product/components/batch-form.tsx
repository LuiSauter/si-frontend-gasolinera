import { toast } from 'sonner'
import { type ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { ChevronLeftIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useHeader } from '@/hooks'
import { type IFormProps, PrivateRoutes } from '@/models'
import { type CreateBatch } from '@/modules/inventory/models/batch.model'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useCreateBatch } from '@/modules/inventory/hooks/useBatch'

const formSchema = z.object({
  code: z.string({ required_error: 'El código es requerido' }).max(50, 'El código no puede tener más de 50 caracteres').min(1, 'El código es requerido'),
  expiration_date: z.string({ required_error: 'La fecha de expiración es requerida' }).min(1, 'La fecha de expiración es requerida'),
  initial_stock: z.number({ required_error: 'El stock inicial es requerido' }).min(1, 'El stock inicial no puede ser menor 1').positive('El stock inicial no puede ser negativo').int('El stock inicial debe ser un número entero'),
  productId: z.string({ required_error: 'El producto es requerido' }).min(1, 'El producto es requerido'),

  // optional
  detail: z.string().max(255, 'La descripción no puede tener más de 255 caracteres').optional(),
  is_active: z.boolean().default(true)
}) satisfies ZodType<CreateBatch>

function BatchFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Productos', path: PrivateRoutes.PRODUCT },
    { label: title }
  ])

  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { createBatch, isMutating } = useCreateBatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_active: true,
      productId: id ?? '',
      code: '',
      expiration_date: '',
      initial_stock: 0
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formatDateDDMMYYYY = data.expiration_date.split('-').reverse().join('/')
    toast.promise(createBatch({ ...data, expiration_date: formatDateDDMMYYYY }), {
      loading: 'Creando lote...',
      success: () => {
        setTimeout(() => {
          navigate(`${PrivateRoutes.PRODUCT}/${id}/detalles`)
        }, 1000)
        return 'Lote creado exitosamente'
      },
      error(error) {
        return error.errorMessages[0] && 'Error al crear el lote'
      }
    })
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

  console.log(form.formState.errors)

  return (
    <section className="grid flex-1 items-start gap-4 lg:gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full flex flex-col gap-4 lg:gap-6 relative overflow-hidden"
        >
          <div className="relative flex items-center gap-4 w-full overflow-hidden">
            <Button
              onClick={() => { navigate(-1) }}
              type="button" variant="outline" size="icon" className="h-7 w-7 shrink-0"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
            <h2 className="text-ellipsis w-full whitespace-nowrap overflow-hidden relative text-xl font-semibold">
              {title} para <span className="font-bold">{searchParams.get('product')}</span>
            </h2>
            <div className="hidden items-center gap-2 md:ml-auto md:flex shrink-0 relative w-fit">
              <Button type="button" onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${id}/detalles`) }} variant="outline" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm" disabled={isMutating}>{buttonText}</Button>
            </div>
          </div>
          <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px]">
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader className='px-4 lg:px-6'>
                  <CardTitle>Detalles</CardTitle>
                </CardHeader>
                <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                  <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                    <FormField
                      control={form.control} name="code"
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
                      control={form.control} name="expiration_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de expiración *</FormLabel>
                          <FormControl>
                            <Input
                              min='2020-01-01'
                              max='2100-12-31'
                              type='date' placeholder="Ingresa la fecha de expiración" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control} name="detail"
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
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                <CardHeader className='px-4 lg:px-6'>
                  <CardTitle>Stock</CardTitle>
                  <CardDescription>Ingrese el stock inicial del lote</CardDescription>
                </CardHeader>
                <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                  <FormField
                    control={form.control} name="initial_stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock inicial *</FormLabel>
                        <FormControl>
                          <Input
                            type='number' placeholder="Ingrese el stock del lota" {...field}
                            onChange={(e) => { field.onChange(Number(e.target.value)) }}
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
                  <CardTitle>Estado del lote</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control} name="is_active"
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
export default BatchFormPage
