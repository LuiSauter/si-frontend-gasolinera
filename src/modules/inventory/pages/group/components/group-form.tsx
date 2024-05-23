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

import { z } from 'zod'
import { useEffect } from 'react'
import { useCreateGroup, useGetGroup, useUpdateGroup } from '@/modules/inventory/hooks/useGroup'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50)
})

const GroupForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createGroup, isMutating } = useCreateGroup()
  const { updateGroup, isMutating: isMutatingUpdate } = useUpdateGroup()
  const { group, error: errorGetUser } = useGetGroup(id)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      name: ''
    }
  })

  useEffect(() => {
    if (group) {
      form.reset({
        name: group.name ?? '',
        description: group.description ?? ''
      })
    }
  }, [group, form])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateGroup({
        id,
        name: data.name,
        description: data.description
      }), {
        loading: 'Actualizando Grupo...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.GROUP, { replace: true }) }, 1000)
          return 'Grupo actualizada exitosamente'
        },
        error: 'Error al actualizar la grupo'
      })
    } else {
      toast.promise(createGroup({
        name: data.name,
        description: data.description
      }), {
        loading: 'Creando grupo...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.GROUP, { replace: true }) }, 1000)
          return 'Grupo creado exitosamente'
        },
        error: 'Error al crear el grupo'
      })
    }
  }

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Button type='button' onClick={() => { navigate(PrivateRoutes.GROUP) }} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Button>
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {id ? 'Lista Grupos' : 'Crear Grupo'}
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type='button' onClick={() => { navigate(PrivateRoutes.GROUP) }} variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button type='submit' size="sm" >{id ? 'Actualizar' : 'Guardar'}</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 justify-center" >
              <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 justify-center">
                <Card x-chunk="dashboard-07-chunk-0" className='' >
                  <CardHeader>
                    <CardTitle>{id ? 'Actualizar Grupo' : 'Crear nuevo Grupo'}</CardTitle>
                    <CardDescription>
                      {id ? 'Complete los datos para actualizar su grupo' : 'Complete los datos para crear un nueva grupo'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='grid gap-4'>
                    <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
                      <FormField
                        control={form.control}
                        name="name"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input placeholder="Tienda..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
                      <FormField
                        control={form.control}
                        name="description"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripcion</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Taller mec..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button type='button' variant="outline" size="sm" >
                Discard
              </Button>
              <Button type='submit' size="sm" disabled={isMutating}>Save Product</Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default GroupForm
