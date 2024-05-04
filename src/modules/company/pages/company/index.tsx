import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(2).max(50)
})

const CompanyPage = (): JSX.Element => {
  useHeader([{ label: 'Dashboard', path: PrivateRoutes.DASHBOARD }, { label: 'Empresa' }])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <h1
        className='text-2xl font-boldtext-gray-900 dark:text-gray-100'
      >
        Gestionar Empresa
      </h1>
      <div className='max-w-screen-lg mx-auto min-h-[calc(100dvh-500px)] grid place-content-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full min-w-[700px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Gasoil 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle falsa #23" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="3332212" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Correo electronico</FormLabel>
                      <FormControl>
                        <Input placeholder="ejemplo@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormItem>
                      <FormLabel>Nombre del propietario</FormLabel>
                      <FormControl>
                        <Input placeholder="Jaun Perez" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Fecha de creación</FormLabel>
                      <FormControl>
                        <Input placeholder="22/01/2023" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormItem>
                      <FormLabel>Nit</FormLabel>
                      <FormControl>
                        <Input placeholder="9807687013" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Contraseña de la bitácora</FormLabel>
                      <FormControl>
                        <Input placeholder="*********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </>
              )}
            />
            <Button type="submit">Actualizar</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default CompanyPage
