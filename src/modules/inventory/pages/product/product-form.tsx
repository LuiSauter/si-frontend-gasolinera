import { ChevronLeftIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useHeader } from '@/hooks'

import { type IFormProps, PrivateRoutes } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect } from './components/multiSelect'
import { useCreateOrUpdateProduct, useGetAllCategories, useGetAllGroups, useGetProduct } from '../../hooks/useProduct'
import { type Category } from '../../models/product.model'
import Loading from '@/components/shared/loading'
import { useGetAllBranches } from '@/modules/company/hooks/useBranch'
import { toast } from 'sonner'

const formSchema = z.object({
  code: z
    .string({ message: 'El código es requerido' })
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(50, 'El código debe tener máximo 50 caracteres'),
  name: z
    .string({ message: 'El nombre es requerido' })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(200, 'El nombre debe tener máximo 200 caracteres'),
  description: z
    .string()
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(500, 'La descripción debe tener máximo 500 caracteres')
    .optional(),
  minimum_stock: z.number({ message: 'El stock mínimo es requerido' })
    .positive('El stock mínimo debe ser positivo'),
  price_sale: z
    .number({ message: 'El precio de venta es requerido' })
    .positive('El precio de venta debe ser positivo'),
  price_purchase: z
    .number()
    .optional(),
  iva: z
    .number()
    .positive('El iva debe ser positivo')
    .optional(),
  image_url: z.string({ message: 'La imagen es requerida' }),
  discount: z.number().positive('El descuento debe ser positivo').optional(),
  isActive: z.string().optional(),
  branchId: z.string({ message: 'La sucursal es requerida' }),
  categoryId: z.string({ message: 'La categoria es requerida' }),
  groupsId: z.array(z.string()).optional()
})

function ProductFormPage({ buttonText, title }: IFormProps) {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Productos', path: PrivateRoutes.PRODUCT },
    { label: 'Crear' }
  ])

  const navigate = useNavigate()
  const { id } = useParams()

  const { createProduct, updateProduct } = useCreateOrUpdateProduct()
  const { product } = useGetProduct(id)

  const { groups } = useGetAllGroups()
  const { categories } = useGetAllCategories()
  const { branches } = useGetAllBranches()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      minimum_stock: 0,
      price_sale: 0,
      price_purchase: 0,
      iva: 0,
      image_url: '',
      discount: 0,
      isActive: 'true',
      branchId: undefined,
      categoryId: '',
      groupsId: []
    },
    values: {
      code: product?.code ?? '',
      name: product?.name ?? '',
      description: product?.description ?? '',
      minimum_stock: product?.minimum_tock ?? 0,
      price_sale: product?.price_sale ?? 0,
      price_purchase: product?.price_purchase ?? 0,
      iva: product?.iva ?? 0,
      image_url: product?.image_url ?? '',
      discount: product?.discount ?? 0,
      isActive: String(product?.is_active) ?? 'true',
      branchId: product?.branch?.id ?? '',
      categoryId: product?.category?.id ?? '',
      groupsId: product?.groups?.map((group) => group.id) ?? []
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (id) {
      toast.promise(updateProduct({
        branchId: data.branchId,
        categoryId: data.categoryId,
        code: data.code,
        description: data.description,
        discount: data.discount,
        groupsId: data.groupsId,
        iva: data.iva,
        is_active: data?.isActive === 'true',
        name: data.name,
        price_sale: data.price_sale,
        image_url: data.image_url,
        minimum_tock: data.minimum_stock,
        id
      }), {
        loading: 'Creando producto...',
        success: () => {
          setTimeout(() => {
            navigate(PrivateRoutes.PRODUCT, { replace: true })
          }, 1000)
          return 'Producto creado exitosamente'
        },
        error: 'Error al crear el producto'
      })
    } else {
      toast.promise(createProduct({
        branchId: data.branchId,
        categoryId: data.categoryId,
        code: data.code,
        description: data.description,
        discount: data.discount,
        groupsId: data.groupsId,
        iva: data.iva,
        is_active: data?.isActive === 'true',
        name: data.name,
        price_sale: data.price_sale,
        image_url: data.image_url,
        minimum_tock: data.minimum_stock
      }), {
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

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full flex flex-col gap-4 lg:gap-6"
          >
            <div>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => { navigate(PrivateRoutes.PRODUCT) }}
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
                  // disabled={isMutating}
                  >
                    {buttonText}
                  </Button>
                </div>
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
                        defaultValue=""
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
                        defaultValue=""
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
                      defaultValue=""
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
                      // defaultValue={0}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock mínimo</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder="10"
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
                      defaultValue=""
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría</FormLabel>
                          {categories && <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                id="categoryId"
                                aria-label="Selecciona una categoría"
                              >
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.length === 0
                                ? <SelectItem value='loading'>
                                  <Loading />
                                </SelectItem>
                                : categories?.map((category: Category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>}
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
                            {groups && <MultiSelect groups={groups ?? []} value={field.value ?? []} onChange={field.onChange} />}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-0" className="w-full">
                  <CardHeader className='px-4 lg:px-6'>
                    <CardTitle>Precios</CardTitle>
                    <CardDescription>Ingrese los precios de compra y venta</CardDescription>
                  </CardHeader>
                  <CardContent className='px-4 flex flex-col gap-4 lg:px-6 lg:gap-6'>
                    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="price_purchase"
                        // defaultValue={0}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio de compra</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder="90"
                                disabled={true}
                                {...field}
                                onChange={(e) => { field.onChange(Number(e.target.value)) }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price_sale"
                        // defaultValue={0}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Precio de venta</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder="100"
                                {...field}
                                onChange={(e) => { field.onChange(Number(e.target.value)) }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                      <FormField
                        control={form.control}
                        name="iva"
                        defaultValue={0.015}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Iva</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder="0.15"
                                {...field}
                                onChange={(e) => { field.onChange(Number(e.target.value)) }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discount"
                        defaultValue={0.10}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descuento</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder="0.15"
                                {...field}
                                onChange={(e) => { field.onChange(Number(e.target.value)) }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                      name="isActive"
                      defaultValue="true"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="isActive" aria-label="Selecciona un estado">
                                <SelectValue defaultValue='true' placeholder="Selecciona una estado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="true">Activo</SelectItem>
                              <SelectItem value="false">Inactivo</SelectItem>
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
                      {/* <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        // src="/placeholder.svg"
                        width="300"
                      /> */}
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
                                onChange={(e) => { field.onChange(Number(e.target.value)) }}
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
                      defaultValue={undefined}
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Sucursal</FormLabel> */}
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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
              <Button type="button" variant="outline" size="sm">
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
