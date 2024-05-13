import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useHeader } from '@/hooks'
import { type IFormProps } from '@/models'
import { PrivateRoutes } from '@/models/routes.model'
import { useCreateBranch, useGetBranch, useUpdateBranch } from '@/modules/company/hooks/useBranch'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  address: z.string().min(3, 'La dirección debe tener al menos 3 caracteres'),
  phone: z.string().optional(),
  email: z.string().email('Ingrese un correo valido')
})

const BranchesPage = ({ buttonText, title }: IFormProps): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Empresa', path: PrivateRoutes.COMPANY },
    { label: 'Sucursales', path: PrivateRoutes.BRANCH },
    { label: title }
  ])
  const { id } = useParams()
  const navigate = useNavigate()
  const { branch } = useGetBranch(id)
  const { createBranch, isMutating } = useCreateBranch()
  const { updateBranch, isMutating: isMutatingUpdate } = useUpdateBranch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    values: {
      name: branch?.name ?? '',
      address: branch?.address ?? '',
      phone: branch?.phone ?? '',
      email: branch?.email ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateBranch({ id, ...data }), {
        loading: 'Actualizando sucursal...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.ROLES, { replace: true }) }, 1000)
          return 'Sucursal actualizada exitosamente'
        },
        error: 'Error al actualizar la sucursal'
      })
    } else {
      toast.promise(createBranch({
        address: data.address,
        email: data.email,
        name: data.name,
        phone: data.phone
      }), {
        loading: 'Creando sucursal...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.ROLES, { replace: true }) }, 1000)
          return 'sucursal creada exitosamente'
        },
        error: 'Error al crear la sucursal'
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
                <Button type='button' onClick={() => { navigate(PrivateRoutes.BRANCH) }} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Button>
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {title}
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type='button' onClick={() => { navigate(PrivateRoutes.BRANCH) }} variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button type='submit' size="sm" disabled={isMutating || isMutatingUpdate}>{buttonText}</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader>
                  <CardTitle>Detalles de la sucursal</CardTitle>
                  <CardDescription>
                    Ingrese los datos de la nueva sucursal
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Sucursal 4to anillo..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input placeholder="4to anillo, Av. Santos Dumont..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electronico</FormLabel>
                          <FormControl>
                            <Input placeholder="sucursal@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="77112200..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              {id && <Card className='h-full justify-evenly flex flex-col w-full min-w-80 lg:w-96'>
                <CardHeader>
                  <CardTitle>Suspender Sucursal</CardTitle>
                  <CardDescription>
                    Suspender la sucursal seleccionada de la empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 lg:gap-6">
                    <Button
                      type='button'
                      variant="outline"
                      size="sm"
                    >
                      Suspender
                    </Button>
                  </div>
                </CardContent>
              </Card>}
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button type='button' variant="outline" size="sm">
                Discard
              </Button>
              <Button type='submit' size="sm" disabled={isMutating || isMutatingUpdate}>Save Product</Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default BranchesPage
