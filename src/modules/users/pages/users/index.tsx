import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(2).max(50)
})

const UserPage = (): JSX.Element => {
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
    <div className='max-w-screen-lg mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full min-w-[700px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <div className='grid gap-4 lg:grid-cols-2'>
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel>Género</FormLabel>
                    <FormControl>
                      <Input placeholder="Seleciona un género" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                <div className='grid gap-4 lg:grid-cols-2'>
                  <FormItem>
                    <FormLabel>Carnet de identidad</FormLabel>
                    <FormControl>
                      <Input placeholder="9807687" {...field} />
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
                <div className='grid gap-4 lg:grid-cols-2'>
                  <FormItem>
                    <FormLabel>Domicilio</FormLabel>
                    <FormControl>
                      <Input placeholder="Calle falsa #123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Input placeholder="Selecciona un rol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                <div className='grid gap-4 lg:grid-cols-2'>
                  <FormItem>
                    <FormLabel>Correo electronico</FormLabel>
                    <FormControl>
                      <Input placeholder="ejemplo@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="**********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              </>
            )}
          />
          <Button type="submit">Crear usuario</Button>
        </form>
      </Form>
    </div>
  )
}

export default UserPage
