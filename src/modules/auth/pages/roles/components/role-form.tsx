import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { useGetAllPermissions } from '@/modules/auth/hooks/usePermission'
import { useCreateRole } from '@/modules/auth/hooks/useRole'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  permissions: z.string().min(1)
})

const FormSchemaPermissions = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean()
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
      permissions: ['76d97331-bc5e-46ac-b227-1b8155fb9870']
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

  // permissions
  const formPermissions = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchemaPermissions),
    defaultValues: {
      security_emails: true
    }
  })

  function onSubmitPermissions(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })
  }

  const { permissions } = useGetAllPermissions()

  return (
    <>
      <h1
        className='text-2xl font-boldtext-gray-900 dark:text-gray-100'
      >
        Gestionar Roles
      </h1>
      <div className='max-w-screen-lg mx-auto min-h-[calc(100dvh-500px)] grid grid-cols-[500px_1fr] place-content-center gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full gap-4 ">
            <Button type="submit">{id ? 'Actualizar' : 'Crear Rol'}</Button>
            <div className="space-y-8 w-full grid lg:grid-cols-[300px_1fr] gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <div className='grid gap-4'>
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

            </div>
          </form>
        </Form>
        {/* <Form {...form}>
          <form onSubmit={formPermissions.handleSubmit(onSubmitPermissions)} className="w-full space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="marketing_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Marketing emails
                        </FormLabel>
                        <FormDescription>
                          Receive emails about new products, features, and more.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="security_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Security emails</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
        <div className='pt-4'>
          {permissions?.map(per => (
            <div key={per.id} className='flex flex-row gap-4 justify-between'>
              <div className='flex flex-col gap-4'>
                <div>{per.name}</div>
                <div>{per.description}</div>
              </div>
              <Switch
                onCheckedChange={(e) => {
                  console.log(e)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RoleFormPage
