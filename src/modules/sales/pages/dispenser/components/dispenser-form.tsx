import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PrivateRoutes } from '@/models/routes.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { z } from 'zod'
import { useEffect } from 'react'
import { useCreateDispenser, useGetDispenser, useUpdateDispenser } from '@/modules/sales/hooks/useDispenser'
import { useGetAllBranches } from '@/modules/company/hooks/useBranch'
import { type IFormProps } from '@/models'
import { useHeader } from '@/hooks'

const formSchema = z.object({
  ubication: z.string().min(2, 'La ubicación debe tener al menos 3 caracteres')
    .max(50, 'La ubicación debe tener máximo 50 caracteres'),
  max_capacity: z.string(),
  branchId: z.string().min(2).max(50),
  is_active: z.boolean().default(true).optional()
})

const DispenserForm = ({ buttonText, title }: IFormProps) => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Ventas', path: PrivateRoutes.DiSPENSER },
    { label: 'Dispensador', path: PrivateRoutes.DiSPENSER },
    { label: title }
  ])

  const { branches } = useGetAllBranches()
  const { id } = useParams()
  const navigate = useNavigate()
  const { createDispenser, isMutating, error } = useCreateDispenser()
  const { updateDispenser, error: errorUpdate } = useUpdateDispenser()
  const { dispenser } = useGetDispenser(id)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      ubication: dispenser?.ubication ?? '',
      max_capacity: dispenser?.max_capacity ?? '',
      branchId: dispenser?.branch.id ?? '',
      is_active: dispenser?.is_active ?? true
    }
  })

  useEffect(() => {
    if (dispenser) {
      form.reset({
        ubication: dispenser.ubication ?? '',
        branchId: dispenser.branch.id ?? '',
        is_active: dispenser.is_active ?? true,
        max_capacity: dispenser.max_capacity ?? ''
      })
    }
  }, [dispenser, form])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateDispenser({
        id,
        branchId: data.branchId,
        is_active: data.is_active ?? true,
        max_capacity: data.max_capacity,
        ubication: data.ubication
      }), {
        loading: 'Actualizando dispensador...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.DiSPENSER, { replace: true }) }, 1000)
          return 'Dispensador actualizada exitosamente'
        },
        error: 'Error al actualizar el dispensador'
      })
    } else {
      toast.promise(createDispenser({
        ubication: data.ubication,
        max_capacity: data.max_capacity,
        branchId: data.branchId,
        is_active: data.is_active ?? true
      }), {
        loading: 'Creando dispensador...',
        success: () => {
          setTimeout(() => { navigate(PrivateRoutes.DiSPENSER, { replace: true }) }, 1000)
          return 'Dispensador creado exitosamente'
        },
        error: 'Error al crear el grupo'
      })
    }
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe && (error ?? errorUpdate)) {
      const newError = error ?? errorUpdate
      toast.error(newError?.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [error, errorUpdate])

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full flex flex-col gap-4 lg:gap-6"
          >

            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => { navigate(-1) }}
                variant="outline"
                size="icon"
                className="h-7 w-7"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Volver</span>
              </Button>
              <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {title}
              </h2>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  type="button"
                  onClick={() => { navigate(PrivateRoutes.DiSPENSER) }}
                  variant="outline"
                  size="sm"
                >
                  Descartar
                </Button>
                <Button
                  type="submit"
                  size="sm"
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 lg:gap-6 lg:grid-cols-[1fr_250px] xl:grid-cols-[1fr_300px]">
              <div className="flex flex-col gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                  <CardHeader className='px-4 lg:px-6'>
                    <CardTitle>Detalles del Dispensador</CardTitle>
                    <CardDescription>
                      Ingrese los detalles del dispensador
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    {/* <div className="grid gap-4 md:grid-cols-2 lg:gap-6"> */}
                      <FormField
                        control={form.control}
                        name="ubication"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ubicación</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Av. Bolivar..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="max_capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacidad Máxima</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="100.00"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    {/* </div> */}
                  </CardContent>
                </Card>
              </div>

              <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Estado del producto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value === 'true')
                            }}
                            value={field.value ? 'true' : 'false'}
                            name={field.name}
                            disabled={field.disabled}
                            defaultValue={field.value ? 'true' : 'false'}
                          >
                            <FormControl>
                              <SelectTrigger aria-label="Selecciona un estado">
                                <SelectValue placeholder="Selecciona una estado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='true'>Activo</SelectItem>
                              <SelectItem value='false'>Inactivo</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Sucursal</CardTitle>
                    <CardDescription>
                      Seleccione la sucursal del producto
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="branchId"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="branchId" aria-label="Selecciona una sucursal">
                                <SelectValue placeholder="Selecciona una sucursal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {branches?.map((branch) => (
                                <SelectItem key={branch.id} value={branch.id}>
                                  {branch.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button onClick={() => { navigate(PrivateRoutes.DiSPENSER) }} type="button" variant="outline" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm" disabled = {isMutating}>
                {buttonText}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default DispenserForm
