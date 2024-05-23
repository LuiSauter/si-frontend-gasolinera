import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react'

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
import Loading from '@/components/shared/loading'

const ProductosPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { products, isLoading } = useGetAllProducts()

  const { deleteProduct } = useDeleteProduct()

  const deletePermanentlyRole = (id: string) => {
    toast.promise(deleteProduct(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.PRODUCT, { replace: true })
        }, 1000)
        return 'Producto eliminado exitosamente'
      },
      error: 'Error al eliminar el producto'
    })
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Combustible</TabsTrigger>
            <TabsTrigger value="active">Otro producto</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filtrar
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
            <Button onClick={() => { navigate(PrivateRoutes.PRODUCT_ADD) }} size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar Producto
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Todos los productos</CardTitle>
              <CardDescription>
                Administre sus productos y vea su desempeño de ventas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      Imagen
                    </TableHead>
                    <TableHead className=''>Nombre</TableHead>
                    <TableHead className='hidden xl:table-cell'>Descripción</TableHead>
                    <TableHead className=''>Stock Min.</TableHead>
                    <TableHead className='hidden sm:table-cell'>Stock</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Precio de compra
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Precio de venta
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Estado
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.image_url}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        {product.description}
                      </TableCell>
                      <TableCell>
                        {product.minimum_tock}
                      </TableCell>
                      <TableCell className='hidden sm:table-cell'>
                        {product.stock}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        Bs. {product.price_purchase}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        Bs. {product.price_sale}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
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
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Ver</DropdownMenuItem>
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
              {isLoading && <div className='grid place-content-center place-items-center w-full shrink-0 pt-6'><Loading /></div>}
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Mostrando <strong>1-3</strong> de <strong>3</strong>{' '}
                productos
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default ProductosPage
