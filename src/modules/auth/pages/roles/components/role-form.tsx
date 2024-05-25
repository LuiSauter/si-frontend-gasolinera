import NotFound from '@/components/not-found'
import Loading from '@/components/shared/loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useHeader } from '@/hooks'
import { type IFormProps } from '@/models'
import { PrivateRoutes } from '@/models/routes.model'
import { useGetAllPermissions } from '@/modules/auth/hooks/usePermission'
import { useCreateRole, useDeleteRole, useGetRole, useUpdateRole } from '@/modules/auth/hooks/useRole'
import { modulePermissions } from '@/modules/auth/utils/permissions.constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string()
    .min(2, 'El nombre del rol debe tener al menos 2 caracteres')
    .max(50, 'El nombre del rol debe tener menos de 50 caracteres'),
  permissions: z.array(z.string()).min(1, 'Los permisos son requeridos')
})

const RoleFormPage = ({ title, buttonText }: IFormProps): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Usuarios', path: PrivateRoutes.USER },
    { label: 'Roles', path: PrivateRoutes.ROLES },
    { label: 'Crear Rol' }
  ])

  const { createRole, isMutating, error } = useCreateRole()
  const { updateRole } = useUpdateRole()
  const { deleteRole, isMutating: isMutatingDelete } = useDeleteRole()
  const navigate = useNavigate()

  const { id } = useParams()

  const { role, error: errorGetRol } = useGetRole(id)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      permissions: []
    },
    values: {
      name: role?.name ?? '',
      permissions: role?.permissions.map((p) => p.permission.id) ?? []
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateRole({ id, name: data.name, permissions: data.permissions }), {
        loading: 'Actualizando rol...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.ROLES, { replace: true })
          }, 1000)
          return 'Rol actualizado exitosamente'
        },
        error: 'Error al actualizar el ro'
      })
    } else {
      toast.promise(createRole({ name: data.name, permissions: data.permissions }), {
        loading: 'Creando rol...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.ROLES, { replace: true })
          }, 1000)
          return 'Rol creado exitosamente'
        },
        error: 'Error al crear el rol'
      })
    }
  }

  const { permissions, isLoading } = useGetAllPermissions()

  useEffect(() => {
    if (role) {
      const initialSelectedPermissions = role?.permissions.map((p) => p.permission.id)
      form.setValue('permissions', initialSelectedPermissions)
    }
  }, [role])

  if (errorGetRol) {
    return <NotFound />
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

  const deletePermanentlyRole = () => {
    toast.promise(deleteRole(id!), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.ROLES, { replace: true })
        }, 1000)
        return 'Rol eliminado exitosamente'
      },
      error: 'Puede que el rol tenga permisos asignados, por lo que no se puede eliminar'
    })
  }

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Button type='button' onClick={() => { navigate(PrivateRoutes.ROLES) }} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Button>
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {title}
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type='button' onClick={() => { navigate(PrivateRoutes.ROLES) }} variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button type='submit' size="sm" disabled={isMutating}>{buttonText}</Button>
                </div>
              </div>
            </div>
            <div className="grid gap-4 lg:gap-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                  <CardHeader>
                    <CardTitle>Detalles del Rol</CardTitle>
                    <CardDescription>
                      Ingrese los detalles del rol
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <div className='grid gap-4'>
                              <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                  <Input placeholder="Administrador General, Empleado, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </div>
                          </>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                {id && <Card className='h-full justify-evenly flex flex-col w-full min-w-80 lg:w-96'>
                  <CardHeader>
                    <CardTitle>Eliminar Rol</CardTitle>
                    <CardDescription>
                      No se puede recuperar un rol eliminado, asegúrese de querer eliminar este rol antes de continuar.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 lg:gap-6">
                      <Button
                        type='button'
                        onClick={deletePermanentlyRole}
                        variant="outline"
                        size="sm"
                        disabled={isMutatingDelete}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>}
              </div>
              <div className="flex flex-col items-start gap-4 lg:gap-6 w-full">
                <Card x-chunk="dashboard-07-chunk-3" className='w-full bg-light-bg-primary dark:bg-dark-bg-secondary'>
                  <CardHeader className='rounded-lg px-4 lg:px-6'>
                    <CardTitle className='flex gap-2 items-end'>Permisos {form.formState.errors.permissions && (
                      <div className='text-danger dark:text-danger text-base leading-none font-medium'>
                        {form.formState.errors.permissions.message}
                      </div>
                    )}</CardTitle>
                    <CardDescription>
                      Seleccione los permisos para el rol
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 lg:px-6'>
                    <div className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 h-full lg:gap-6'>
                      {isLoading
                        ? <div className="grid place-content-center w-full"><Loading /></div>
                        : Object.entries(modulePermissions).map(([key, value]) => (
                          <div key={key} className='flex flex-col gap-4 min-w-[250px]'>
                            <fieldset className="flex flex-col gap-6 rounded-lg border p-4 h-auto">
                              <legend className="-ml-1 px-1 text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</legend>
                              <div className='grid gap-4'>
                                {value.map((per) => {
                                  const permission = permissions?.find(p => p.name === per)
                                  if (!permission) return null
                                  return (
                                    <div key={per} className='flex flex-row gap-4 justify-between items-center'>
                                      <div className='flex flex-col'>
                                        <div className='font-medium text-light-text-primary dark:text-dark-text-primary'>
                                          {per.charAt(0).toUpperCase() + per.slice(1).replace(/_/g, ' ')}
                                        </div>
                                        <div className='text-sm text-light-text-secondary dark:text-dark-text-secondary'>{permission?.description}</div>
                                      </div>
                                      <Switch
                                        checked={form.watch('permissions').includes(permission?.id ?? '')}
                                        onCheckedChange={(e) => {
                                          console.log(e, permission?.id ?? '')
                                          if (e) {
                                            const permissions = form.getValues('permissions')
                                            permissions.push(permission?.id ?? '')
                                            form.setValue('permissions', permissions)
                                          } else {
                                            const permissions = form.getValues('permissions')
                                            const index = permissions.indexOf(permission?.id ?? '')
                                            permissions.splice(index, 1)
                                            form.setValue('permissions', permissions)
                                          }
                                        }}
                                      />
                                    </div>
                                  )
                                })}
                              </div>
                            </fieldset>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button onClick={() => { navigate(PrivateRoutes.ROLES) }} type='button' variant="outline" size="sm">
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

export default RoleFormPage
