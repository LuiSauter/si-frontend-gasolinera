import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PrivateRoutes } from '@/models'
import { File, ListFilterIcon, PlusCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function BatchTable() {
  const navigate = useNavigate()
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle className='flex flex-row justify-between'>
          <span>Lotes</span>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
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
              <PlusCircleIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span>
            </Button>
          </div>
        </CardTitle>
        {/* <CardDescription>
          Los lotes son una forma de agrupar productos que comparten características similares.

        </CardDescription> */}
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
              {/* <TableHead className="hidden md:table-cell">
                      Precio de venta
                    </TableHead> */}
              <TableHead className="hidden md:table-cell">
                Estado
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {products?.map((product: Product) => (
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
                        {product.minimum_stock}
                      </TableCell>
                      <TableCell className='hidden sm:table-cell'>
                        {product.stock}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        Bs. {product.price_purchase}
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
                            <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${product.id}/detalles`) }}>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${product.id}`) }}>Editar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { deletePermanentlyRole(product.id) }}>
                              {product.is_active ? 'Desactivar' : 'Activar'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))} */}
          </TableBody>
        </Table>
        {/* {isLoading && <div className='grid place-content-center place-items-center w-full shrink-0 pt-6'><Loading /></div>} */}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Mostrando <strong>1-3</strong> de <strong>3</strong>{' '}
          productos
        </div>
      </CardFooter>
    </Card>
  )
}

export default BatchTable
