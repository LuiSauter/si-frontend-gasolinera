import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PrivateRoutes } from '@/models/routes.model'
import { useCreateUser, useGetUser, useUpdateUser } from '@/modules/users/hooks/useUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { z } from 'zod'
import { useGetAllRole } from '@/modules/auth/hooks/useRole'
import { type Role } from '@/modules/auth/models/role.model'
import { useGetAllBranches } from '@/modules/company/hooks/useBranch'
import { type Branch } from '@/modules/company/models/branch.model'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const formSchema = z.object({
  ci: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  email: z.string().email('Ingrese un correo valido'),
  phone: z.string().min(2).max(10),
  password: z.string().min(2).max(50),
  rol: z.string(),
  gender: z.string(),
  address: z.string().min(2).max(50),
  branch: z.string()
})

const UserFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { createUser, isMutating, error } = useCreateUser()
  const { updateUser } = useUpdateUser()
  const { allRoles } = useGetAllRole()
  const { branches } = useGetAllBranches()
  const { user } = useGetUser(id)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      email: '',
      name: '',
      phone: '',
      password: '',
      gender: '',
      rol: '',
      branch: '',
      ci: ''
    }
  })

  const [selectedValueRol, setSelectedValueRol] = useState('')
  const handleValueChangeRol = (value: string) => {
    setSelectedValueRol(value)
    console.log('Selected Value:', value)
  }

  const [selectedValueSucursal, setSelectedValueSucursal] = useState('')
  const handleValueChangeSucursal = (value: string) => {
    setSelectedValueSucursal(value)
    console.log('Selected Value:', value)
  }

  const [selectedValueGender, setSelectedValueGender] = useState('')
  const handleValueChangeGender = (value: string) => {
    setSelectedValueGender(value)
    console.log('Selected Value:', value)
  }

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? '',
        ci: (user.ci ?? 0).toString(),
        address: user.address ?? '',
        phone: user.phone ?? '',
        email: user.email ?? '',
        rol: user.role.id ?? '',
        branch: user.branch.id ?? '',
        password: user.password ?? '', // Ensure password is blank
        gender: user.gender ?? ''
      })
    }
  }, [user, form])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    data.rol = selectedValueRol ?? ''
    data.branch = selectedValueSucursal ?? ''
    data.gender = selectedValueGender ?? ''
    const ciNumber = parseInt(data.ci, 10)

    if (id) {
      toast.promise(updateUser({
        id,
        name: data.name,
        email: data.email,
        address: data.address,
        ci: ciNumber,
        role: data.rol,
        gender: data.gender,
        phone: data.phone,
        password: data.password,
        branch: data.branch
      }), {
        loading: 'Actualizando sucursal...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.USER, { replace: true }) }, 1000)
          return 'Sucursal actualizada exitosamente'
        },
        error: 'Error al actualizar la sucursal'
      })
    } else {
      toast.promise(createUser({
        name: data.name,
        email: data.email,
        address: data.address,
        ci: ciNumber,
        role: data.rol,
        gender: data.gender,
        phone: data.phone,
        password: data.password,
        branch: data.branch
      }), {
        loading: 'Creando usuario...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.USER, { replace: true }) }, 1000)
          return 'usuario creado exitosamente'
        },
        error: 'Error al crear el usuario'
      })
    }
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
                  {id ? 'Lista usuarios' : 'Crear Usuario'}
                </h2>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button type='button' onClick={() => { navigate(PrivateRoutes.USER) }} variant="outline" size="sm">
                    Descartar
                  </Button>
                  <Button type='submit' size="sm" >{id ? 'Actualizar' : 'Guardar'}</Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader>
                  <CardTitle>{id ? 'Actualizar usuario' : 'Crear nuevo usuario'}</CardTitle>
                  <CardDescription>
                    {id ? 'Complete los datos para actualizar su usuario' : 'Complete los datos para crear un nuevo usuario'}
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
                  <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="rol"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rol</FormLabel>
                          <FormControl>
                            <Select value={selectedValueRol} onValueChange={handleValueChangeRol}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione el rol" {...field}>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Roles</SelectLabel>
                                  {allRoles?.map((role: Role) => (
                                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {/* <Input placeholder="Selecciona un rol" {...field} /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      defaultValue=""
                      render={() => (
                        <FormItem>
                          <FormLabel>Genero</FormLabel>
                          <FormControl>
                            <Select value={selectedValueGender} onValueChange={handleValueChangeGender}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione el genero" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Generos</SelectLabel>
                                  <SelectItem value="masculino">masculino</SelectItem>
                                  <SelectItem value="femenino">femenino</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="branch"
                      defaultValue=""
                      render={() => (
                        <FormItem>
                          <FormLabel>Sucursal</FormLabel>
                          <FormControl>
                            <Select value={selectedValueSucursal} onValueChange={handleValueChangeSucursal}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Seleccione la sucursal">

                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Sucursales</SelectLabel>
                                  {branches?.map((branch: Branch) => (
                                    <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {/* <Input placeholder="Sucursal 1" {...field} /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="gender"
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input placeholder="masculino" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                </CardContent>
              </Card>
              {/* {id && <Card className='h-full justify-evenly flex flex-col w-full min-w-80 lg:w-96'>
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
              </Card>} */}
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button type='button' variant="outline" size="sm" >
                Discard
              </Button>
              <Button type='submit' size="sm" disabled={isMutating}>Save Product</Button>
            </div>
          </form>
        </Form>
      </section>
      {/* <CardHeader className="px-7">
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
      </div> */}
    </>
  )
}

export default UserFormPage
