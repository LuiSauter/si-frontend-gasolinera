import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'
import { useGetCompany, useUpdateCompany } from '../../hooks/useCompany'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(4, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre debe tener como máximo 50 caracteres'),
  phone: z.string().optional(),
  direction: z.string().min(3, 'La dirección debe tener al menos 2 caracteres')
    .max(50),
  owner_name: z.string().min(2, 'El nombre del propietario debe tener al menos 2 caracteres')
    .max(50, 'El nombre del propietario debe tener como máximo 50 caracteres'),
  creation_date: z.string(),
  email: z.string().email(),
  nit: z.string().min(2, 'El nit debe tener al menos 2 caracteres')
    .max(50, 'El nit debe tener como máximo 50 caracteres')
})

const CompanyPage = (): JSX.Element => {
  useHeader([{ label: 'Dashboard', path: PrivateRoutes.DASHBOARD }, { label: 'Empresa' }])
  const navigate = useNavigate()

  const { company } = useGetCompany()
  const { updateCompany } = useUpdateCompany()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      direction: '',
      owner_name: '',
      creation_date: '12/05/2024',
      email: '',
      nit: ''
    },
    values: {
      name: company?.name ?? '',
      phone: company?.phone ?? '',
      direction: company?.direction ?? '',
      owner_name: company?.owner_name ?? '',
      creation_date: company?.creation_date.split('/').reverse().join('-') ?? '',
      email: company?.email ?? '',
      nit: company?.nit ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formateDateDDMMYYYY = data.creation_date.split('-').reverse().join('/')
    toast.promise(updateCompany({
      creation_date: formateDateDDMMYYYY,
      direction: data.direction,
      email: data.email,
      name: data.name,
      nit: data.nit,
      owner_name: data.owner_name,
      phone: data.phone
    }), {
      loading: 'Actualizando datos de la empresa...',
      success: () => {
        return 'Datos de la empresa actualizados correctamente'
      },
      error: 'Error al actualizar los datos de la empresa'
    })
  }

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Button type='button' onClick={() => { navigate(PrivateRoutes.DASHBOARD) }} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Button>
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Gestionar Empresa
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  {/* <Button type='button' onClick={() => { navigate(PrivateRoutes.PERMISSIONS) }} variant="outline" size="sm">
                    Descartar
                  </Button> */}
                  <Button type='submit' size="sm">Guardar</Button>
                </div>
              </div>
            </div>
            <div className="grid gap-4 lg:gap-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                  <CardHeader>
                    <CardTitle>Información de la Empresa</CardTitle>
                    <CardDescription>
                      Detalles de la empresa y su propietario. Esta información es necesaria para la creación de la empresa.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-4 lg:gap-6'>
                    <div className='grid md:grid-cols-2 gap-4 lg:gap-6'>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input placeholder="Gasoil 2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="3332212" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="direction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Calle falsa #23" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='grid md:grid-cols-2 gap-4 lg:gap-6'>
                      <FormField
                        control={form.control}
                        name="owner_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del propietario</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="creation_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fecha de creación</FormLabel>
                            <FormControl>
                              {/* input type format dd/mm/yyyy */}
                              <Input
                                type='date'
                                placeholder="dd-mm-yyyy"
                                min="1970-01-01"
                                max="2030-12-31"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='grid md:grid-cols-2 gap-4 lg:gap-6'>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo electronico</FormLabel>
                            <FormControl>
                              <Input placeholder="ejemplo@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nit</FormLabel>
                            <FormControl>
                              <Input placeholder="9807687013" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* <FormField
                      control={form.control}
                      name="passwordBitacora"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña de la bitácora</FormLabel>
                          <FormControl>
                            <Input type='password' placeholder="*********" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default CompanyPage
