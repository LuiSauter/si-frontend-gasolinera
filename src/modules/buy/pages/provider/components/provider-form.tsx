import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useHeader } from '@/hooks'
import { type IFormProps } from '@/models'
import { PrivateRoutes } from '@/models/routes.model'
import { useCreateProvider, useGetProvider, useUpdateProvider } from '@/modules/buy/hooks/useProvider'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  address: z.string().min(3, 'La dirección debe tener al menos 3 caracteres'),
  phone: z.string().min(3, 'El telefono debe tener al menos 5 digitos'),
  email: z.string().email('Ingrese un correo valido'),
  nit: z.string().min(3, 'El nit debe tener al menos 3 digitos'),
  detail: z.string().min(3, 'El detalle debe tener al menos 3 caracteres'),
  image_url: z.string().min(3, 'El detalle debe tener al menos 3 caracteres')
})

const ProviderFormPage = ({ buttonText, title }: IFormProps): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras', path: PrivateRoutes.PROVIDER },
    { label: 'Proveedores', path: PrivateRoutes.PROVIDER },
    { label: title }
  ])
  const { id } = useParams()
  const navigate = useNavigate()
  const { provider } = useGetProvider(id)
  const { createProvider, isMutating, error } = useCreateProvider()
  const { updateProvider, isMutating: isMutatingUpdate, error: errorUpdate } = useUpdateProvider()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      nit: '',
      detail: ''
    },
    values: {
      name: provider?.name ?? '',
      address: provider?.address ?? '',
      phone: provider?.phone ?? '',
      email: provider?.email ?? '',
      nit: provider?.nit ?? '',
      detail: provider?.detail ?? '',
      image_url: provider?.image_url ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateProvider({ id, ...data }), {
        loading: 'Actualizando proveedor...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.PROVIDER, { replace: true }) }, 1000)
          return 'Proveedor actualizada exitosamente'
        },
        error: 'Error al actualizar el proveedor'
      })
    } else {
      toast.promise(createProvider({
        image_url: data.image_url,
        address: data.address,
        email: data.email,
        name: data.name,
        nit: data.nit,
        detail: data.detail,
        phone: data.phone
      }), {
        loading: 'Creando proveedor...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.PROVIDER, { replace: true }) }, 1000)
          return 'proveedor creada exitosamente'
        },
        error: 'Error al crear la proveedor'
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Button type='button' onClick={() => { navigate(-1) }} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Button>
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {title}
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type='button' onClick={() => { navigate(PrivateRoutes.PROVIDER) }} variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button type='submit' size="sm" disabled={isMutating || isMutatingUpdate}>{buttonText}</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader>
                  <CardTitle>Detalles del proveedor</CardTitle>
                  <CardDescription>
                    Ingrese los datos del nuevo proveedor
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Sucursal 4to anillo..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="luisde@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefono</FormLabel>
                          <FormControl>
                            <Input placeholder="71890012" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nit"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nit</FormLabel>
                          <FormControl>
                            <Input placeholder="1515165" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="address"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input placeholder=" Av. Bolivar, 4to anillo..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Url de la imagen</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>
                  <FormField
                    control={form.control}
                    name="detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detalle</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Proveedor de productos" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              {/* {id && <Card className='h-full justify-evenly flex flex-col w-full min-w-80 lg:w-96'>
                <CardHeader>
                  <CardTitle>Suspender proveedor</CardTitle>
                  <CardDescription>
                    Suspender el proveedor seleccionado de la empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 lg:gap-6">
                    <Button
                      type='button'
                      variant="outline"
                      size="sm"
                    >
                      Suspender
                    </Button>
                  </div>
                </CardContent>
              </Card>} */}
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button type='button' variant="outline" size="sm">
                Discard
              </Button>
              <Button type='submit' size="sm" disabled={isMutating || isMutatingUpdate}>Save Product</Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default ProviderFormPage
