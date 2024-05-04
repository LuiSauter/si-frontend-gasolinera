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

const BranchesPage = (): JSX.Element => {
  useHeader([{ label: 'Dashboard', path: PrivateRoutes.DASHBOARD }, { label: 'Empresa', path: PrivateRoutes.COMPANY }, { label: 'Sucursales' }])

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
        Gestionar Sucursales
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
                        <Input placeholder="Gasoil 2 - La pampa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="La Pampa #12, cercado 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <div className='grid gap-4 lg:grid-cols-2'>
                    <FormItem>
                      <FormLabel>Correo electronico</FormLabel>
                      <FormControl>
                        <Input placeholder="lapampa@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="78010833" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                </>
              )}
            />
            <Button type="submit">Crear sucursal</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default BranchesPage
