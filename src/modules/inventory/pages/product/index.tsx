import { ChevronLeftIcon, File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '@/models'
import { useDeleteProduct, useGetAllProducts } from '../../hooks/useProduct'
import { type Product } from '../../models/product.model'
import { toast } from 'sonner'
import { useHeader } from '@/hooks'
import Skeleton from '@/components/shared/skeleton'
import Pagination from '@/components/shared/pagination'

const ProductosPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Productos' }
  ])
  const navigate = useNavigate()
  const { products, isLoading, countData, filterOptions, newPage, prevPage, setOffset } = useGetAllProducts({ isGetAll: false })

  const { deleteProduct } = useDeleteProduct()

  const deletePermanentlyRole = (id: string) => {
    toast.promise(deleteProduct(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.PRODUCT, { replace: true })
        }, 1000)
        return 'Acción realizada exitosamente'
      },
      error: 'Error al realizar esta acción'
    })
  }

  return (
    <>
      <Tabs defaultValue="all" className='grid gap-2 overflow-hidden w-full relative'>
        <div className="inline-flex items-center flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => { navigate(-1) }}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
          </TabsList>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='ml-auto'>
              <Button variant="outline" size="sm" className="h-8 gap-1"><ListFilter className="h-3.5 w-3.5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1"><File className="h-3.5 w-3.5" /></Button>
          <Button onClick={() => { navigate(PrivateRoutes.PRODUCT_ADD) }} size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only lg:not-sr-only sm:whitespace-nowrap">Agregar</span>
          </Button>
        </div>
        <TabsContent value="all" className='relative overflow-hidden'>
          <Card x-chunk="dashboard-06-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
            <CardHeader>
              <CardTitle>Todos los productos</CardTitle>
              <CardDescription>
                Administre sus productos y vea su desempeño de ventas.
              </CardDescription>
            </CardHeader>
            <CardContent className='overflow-hidden relative w-full'>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagen</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Stock Min.</TableHead>
                      <TableHead>Precio de compra</TableHead>
                      <TableHead>Sucursal</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead><span className='sr-only'>Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading
                      ? <Skeleton rows={filterOptions.limit} columns={8} />
                      : products?.map((product: Product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              width="42"
                              height="42"
                              alt="Product image"
                              className="aspect-square rounded-md object-cover mx-auto"
                              src={product.image_url ? product.image_url : 'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4='}
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell title={product?.description ?? '-'}>
                            {product?.description
                              ? (product?.description.length > 40 ? product?.description.substring(0, 40) + '...' : product?.description)
                              : '-'
                            }
                          </TableCell>
                          <TableCell>{product.minimum_stock}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>Bs. {product.price_purchase}</TableCell>
                          <TableCell>{product.branch?.name}</TableCell>
                          <TableCell>
                            <Badge variant={product.is_active ? 'default' : 'outline'}>
                              {product.is_active ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${product.id}/detalles`) }}>Ver detalles</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${product.id}`) }}>Editar</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { deletePermanentlyRole(product.id) }}>
                                  {product.is_active ? 'Desactivar' : 'Activar'}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className='w-full'>
              <Pagination
                allItems={countData ?? 0}
                currentItems={products?.length ?? 0}
                limit={filterOptions.limit}
                newPage={() => { newPage(countData ?? 0) }}
                offset={filterOptions.offset}
                prevPage={prevPage}
                setOffset={setOffset}
                setLimit={() => { }}
                params={true}
              />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ProductosPage
