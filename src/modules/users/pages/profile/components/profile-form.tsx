import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PrivateRoutes } from '@/models/routes.model'
import { useCreateUser, useUpdateUser } from '@/modules/users/hooks/useUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { z } from 'zod'
import { useGetRole } from '@/modules/auth/hooks/useRole'
import { useGetBranch } from '@/modules/company/hooks/useBranch'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { type IFormProps } from '@/models'

import { type RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const formSchema = z.object({
  ci: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  email: z.string().email('Ingrese un correo valido'),
  phone: z.string().min(2).max(10),
  password: z.string().min(2).max(50),
  role: z.string(),
  gender: z.string(),
  address: z.string().min(2).max(50),
  branch: z.string()
})

const ProfileForm = ({ buttonText, title }: IFormProps) => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const { error } = useCreateUser()
  const { updateUser } = useUpdateUser()
  const { role } = useGetRole(user.role.id)
  const { branch } = useGetBranch(user.branch.id)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: user.name ?? '',
      ci: (user.ci ?? 0).toString(),
      address: user.address ?? '',
      phone: user.phone ?? '',
      email: user.email ?? '',
      role: role?.name ?? '',
      branch: branch?.name ?? '',
      password: user.password ?? '', // Ensure password is blank
      gender: user.gender ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    data.role = user.role.id ?? ''
    data.branch = user.branch.id ?? ''
    data.gender = user.gender ?? ''
    const ciNumber = parseInt(data.ci, 10)
    const id = user.id
    console.log(data)
    toast.promise(updateUser({
      id,
      name: data.name,
      email: data.email,
      address: data.address,
      ci: ciNumber,
      role: data.role,
      gender: data.gender,
      phone: data.phone,
      password: data.password,
      branch: data.branch
    }), {
      loading: 'Actualizando usuario...',
      success: () => {
        setTimeout(() => { navigate(PrivateRoutes.USER, { replace: true }) }, 1000)
        return 'usuario actualizado exitosamente'
      },
      error: 'Error al actualizar el'
    })
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe && error) {
      toast.error(error.errorMessages[0])
      // subscribe = false
    }
    return () => {
      subscribe = false
    }
  }, [error])

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div>
              <div className="flex items-center gap-4">
                <Button type='button' onClick={() => { navigate(PrivateRoutes.USER) }} variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Volver</span>
                </Button>
                <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {title}
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type='button' onClick={() => { navigate(PrivateRoutes.USER) }} variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button type='submit' size="sm" >{buttonText}</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader>
                  <CardTitle>{buttonText}</CardTitle>
                  <CardDescription>
                    {'Complete los datos para actualizar su cuenta'}
                  </CardDescription>
                  {error && <CardDescription className='text-danger dark:text-danger'>
                    {error?.errorMessages[0]}
                  </CardDescription>}
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="ci"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CI</FormLabel>
                          <FormControl>
                            <Input placeholder="10360074.." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  </div>
                  <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="password"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input placeholder="************" type='password' {...field} />
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
                      name="address"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Direccion</FormLabel>
                          <FormControl>
                            <Input placeholder="Av. Mapaizo..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>

                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                  <CardHeader>
                    <CardTitle>Asignación</CardTitle>
                    <CardDescription>
                      {'Sucursal y rol asignado a esta cuenta. Solo el admin puede reasignar'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='grid gap-4 lg:gap-6'>
                    <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="role"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rol</FormLabel>
                            <FormControl>
                              <Input placeholder="Su rol es.." readOnly {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="branch"
                        defaultValue=""
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sucursal</FormLabel>
                            <FormControl>
                              <Input placeholder="su sucrusal es..." readOnly {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button type='button' variant="outline" size="sm" >
                Discard
              </Button>
              <Button type='submit' size="sm" >{buttonText}</Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default ProfileForm
