import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { useCreateRole } from '@/modules/auth/hooks/useRole'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  permissions: z.string().min(1)
})

const RoleFormPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Usuarios', path: PrivateRoutes.USER },
    { label: 'Roles' }
  ])

  const { createRole } = useCreateRole()
  const navigate = useNavigate()

  const { id } = useParams()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      permissions: []
    }
  })

  const onSubmit = (data: any) => {
    console.log(data)
    createRole({
      name: data.name,
      permissions: [data.permissions]
    }).then(() => {
      navigate(PrivateRoutes.ROLES)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <h1
        className='text-2xl font-boldtext-gray-900 dark:text-gray-100'
      >
        Gestionar Roles
      </h1>
      <div className='max-w-screen-lg mx-auto min-h-[calc(100dvh-500px)] grid place-content-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full min-w-[700px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormItem>
                      <FormLabel>Nombre del rol</FormLabel>
                      <FormControl>
                        <Input placeholder="Administrador General" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormItem>
                      <FormLabel>Permisos</FormLabel>
                      <FormControl>
                        <Input placeholder="Seleciona los Permisos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </>
              )}
            />
            <Button type="submit">{id ? 'Actualizar' : 'Crear Rol'}</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default RoleFormPage
