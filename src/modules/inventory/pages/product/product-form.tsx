import { ChevronLeftIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useHeader } from '@/hooks'

import { type IFormProps, PrivateRoutes } from '@/models'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateOrUpdateProduct, useGetAllCategories, useGetAllGroups, useGetProduct } from '../../hooks/useProduct'
import { type Category } from '../../models/product.model'
import { useGetAllBranches } from '@/modules/company/hooks/useBranch'
import MultiSelect from '@modules/inventory/pages/product/components/multiselect'

const formSchema = z.object({
  code: z
    .string({ required_error: 'El código es requerido' })
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(50, 'El código debe tener máximo 50 caracteres'),
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(200, 'El nombre debe tener máximo 200 caracteres'),
  minimum_stock: z.number({ required_error: 'El stock mínimo es requerido' })
    .positive('El stock mínimo debe ser positivo'),
  branchId: z.string({ required_error: 'La sucursal es requerida' }).min(1, 'La sucursal es requerida'),
  categoryId: z.string({ required_error: 'La categoria es requerida' }).min(1, 'La categiría es requerida'),
  // optional
  image_url: z.string().optional(),
  description: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(500, 'La descripción debe tener máximo 500 caracteres')
    .optional(),
  is_active: z.boolean().default(true).optional(),
  groupsId: z.array(z.string()).optional()
})

function ProductFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Productos', path: PrivateRoutes.PRODUCT },
    { label: title }
  ])

  const navigate = useNavigate()
  const { id } = useParams()

  const { createProduct, updateProduct, error } = useCreateOrUpdateProduct()
  const { product } = useGetProduct(id)

  const { groups } = useGetAllGroups()
  const { categories } = useGetAllCategories()
  const { branches } = useGetAllBranches()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      code: product?.code ?? '',
      name: product?.name ?? '',
      minimum_stock: product?.minimum_stock ?? 0,
      image_url: product?.image_url ?? '',
      branchId: product?.branch?.id ?? '',
      categoryId: product?.category?.id ?? '',
      // optional
      description: product?.description ?? undefined,
      is_active: product?.is_active ?? true,
      groupsId: product?.groups?.map((productGroup) => productGroup.group.id) ?? []
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateProduct({ ...data, id }), {
        loading: 'Actualizando producto...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PRODUCT, { replace: true })
          }, 1000)
          return 'Producto actualizado exitosamente'
        },
        error: 'Error al actualizar el producto'
      })
    } else {
      toast.promise(createProduct(data), {
        loading: 'Creando producto...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PRODUCT, { replace: true })
          }, 1000)
          return 'Producto creado exitosamente'
        },
        error: 'Error al crear el producto'
      })
    }
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe && error) {
      toast.error(error.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [error])

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
                  onClick={() => { navigate(PrivateRoutes.PRODUCT) }}
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
                    <CardTitle>Detalles del Producto</CardTitle>
                    <CardDescription>
                      Ingrese los detalles del producto
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="GAS, DIE, ACE, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Gasolina, Diesel, aceite, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción del producto..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                  <CardHeader className='px-4 lg:px-6'>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Establece un stock mínimo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <FormField
                      control={form.control}
                      name="minimum_stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock mínimo</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder="10..."
                              {...field}
                              onChange={(e) => { field.onChange(Number(e.target.value)) }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                  <CardHeader className='px-4 lg:px-6'>
                    <CardTitle>Grupo y categoría</CardTitle>
                    <CardDescription>
                      Ingrese los grupos y categorías del producto
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <FormField
                      control={form.control}
                      name="categoryId"
                      defaultValue={product?.category?.id}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={field.disabled}
                            name={field.name}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map((category: Category) => (
                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="groupsId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grupos</FormLabel>
                          <FormControl>
                            {groups && groups?.length > 0 && field.value && <MultiSelect groups={groups} value={field.value} onChange={field.onChange} />}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                <Card
                  className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Imagen</CardTitle>
                    <CardDescription>
                      Ingrese la url de la imagen del producto
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="image_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Url de la imagen</FormLabel>
                            <FormControl>
                              <Input
                                type='string'
                                placeholder="https://example.com/image.jpg"
                                {...field}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
              <Button onClick={() => { navigate(PrivateRoutes.PRODUCT) }} type="button" variant="outline" size="sm">
                Descartar
              </Button>
              <Button type="submit" size="sm">
                {buttonText}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}
export default ProductFormPage
