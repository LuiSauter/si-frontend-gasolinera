import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useHeader } from '@/hooks'
import { type IFormProps } from '@/models'
import { PrivateRoutes } from '@/models/routes.model'
import { useCreatePermission, useUpdatePermission } from '@/modules/auth/hooks/usePermission'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50)
})

const PermissionsPage = ({ title, buttonText }: IFormProps): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Usuarios', path: PrivateRoutes.USER },
    { label: 'Permisos', path: PrivateRoutes.PERMISSIONS },
    { label: title }
  ])

  const { createPermission, isMutating, error } = useCreatePermission()
  const { updatePermission, isMutating: isMutatingUpdate } = useUpdatePermission()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const { id } = useParams()
  const navigate = useNavigate()

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updatePermission({ id, name: data.name, description: data.description }), {
        loading: 'Actualizando permiso...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PERMISSIONS, { replace: true })
          }, 1000)
          return 'permiso actualizado exitosamente'
        },
        error: 'Error al actualizar el permiso'
      })
    } else {
      toast.promise(createPermission({ name: data.name, description: data.description }), {
        loading: 'Creando permiso...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PERMISSIONS, { replace: true })
          }, 1000)
          return 'Permiso creado exitosamente'
        },
        error: 'Error al crear el permiso'
      })
    }
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe && error) {
      toast.error(error.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [error])

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Button type='button' onClick={() => { navigate(PrivateRoutes.PERMISSIONS) }} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Button>
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {title}
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type='button' onClick={() => { navigate(PrivateRoutes.PERMISSIONS) }} variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button type='submit' size="sm" disabled={isMutating || isMutatingUpdate}>{buttonText}</Button>
                </div>
              </div>
            </div>
            <div className="grid gap-4 lg:gap-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                  <CardHeader>
                    <CardTitle>Detalles del Permiso</CardTitle>
                    <CardDescription>
                      Ingrese los detalles del permiso
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-4 lg:gap-6'>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Usuarios, compra, ventas, inventario..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea placeholder="El usuario pordrá..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button onClick={() => { navigate(PrivateRoutes.PERMISSIONS) }} type='button' variant="outline" size="sm">
                Cancelar
              </Button>
              <Button type='submit' size="sm">{buttonText}</Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default PermissionsPage
