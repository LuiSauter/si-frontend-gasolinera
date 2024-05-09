import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { useCreatePermission } from '@/modules/auth/hooks/usePermission'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2).max(50)
})

const PermissionsPage = (): JSX.Element => {
  useHeader([{ label: 'Permisos' }])
  const { createPermission } = useCreatePermission()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    createPermission({
      name: data.name
    }).then(() => {
      navigate(PrivateRoutes.PERMISSIONS)
    }).catch((error) => { console.error(error) })
  }

  return (
    <>
      <h1
        className='text-2xl font-boldtext-gray-900 dark:text-gray-100'
      >
        Gestionar Permisos
      </h1>
      <div className='max-w-screen-lg mx-auto min-h-[calc(100dvh-500px)] grid place-content-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full md:min-w-[700px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <>
                  <div className='grid gap-4'>
                    <FormItem>
                      <FormLabel>Nombre del permiso</FormLabel>
                      <FormControl>
                        <Input placeholder="Ventas, reportes y dashboard" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </>
              )}
            />
            <Button type="submit">Crear Permiso</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default PermissionsPage
