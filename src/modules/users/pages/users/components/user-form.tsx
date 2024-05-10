import React from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { z } from 'zod'
import { useParams } from 'react-router-dom'
interface Props { }

const formSchema = z.object({
  name: z.string().min(2).max(50)
})

const UserFormPage = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  })
  const { id } = useParams()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <>
      <CardHeader className="px-7">
        <CardTitle>{id ? 'Actualizar usuario' : 'Crear nuevo usuario'}</CardTitle>
        <CardDescription>
          {id ? 'Complete los datos para actualizar su usuario' : 'Complete los datos para crear un nuevo usuario'}
        </CardDescription>
      </CardHeader>
      <div className='max-w-screen-md mx-auto'>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full min-w-[700px]">
                <FormField
                  control={form.control}
                  name="name"
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
                <Button type="submit">{id ? 'Actualizar' : 'Crear usuario'}</Button>
              </form>

            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UserFormPage
