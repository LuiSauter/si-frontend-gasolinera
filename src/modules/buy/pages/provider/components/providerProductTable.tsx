import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { PrivateRoutes } from '@/models'
import { useDeleteProviderProduct, useGetAllProductsProviders } from '@/modules/buy/hooks/useProviderProduct'
import { type ProviderProduct } from '@/modules/buy/models/providerProduct.model'
import { File, ListFilterIcon, MoreHorizontal, Pencil, PlusCircleIcon, Trash } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { toast } from 'sonner'
import Loading from '@/components/shared/loading'

function ProviderProductTable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { id } = useParams()
  const { providerProducts, isLoading, mutate } = useGetAllProductsProviders(id)
  const navigate = useNavigate()
  const { deleteProviderProduct } = useDeleteProviderProduct()

  const deletePermanentlyGroup = (idProvider: string) => {
    toast.promise(deleteProviderProduct(idProvider), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          void mutate()
          navigate(`${PrivateRoutes.PROVIDERPRODUCT}/${id}/detalles`, { replace: true })
        }, 1000)
        return 'Producto eliminado exitosamente'
      },
      error: 'Ocurrio un error al eliminar el producto'
    })
    setIsDialogOpen(false)
  }
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle className='flex flex-row justify-between'>
          <span>Productos</span>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
            </Button>
            <Button onClick={() => { navigate(`${PrivateRoutes.PROVIDERPRODUCT}/${id}/asignar`) }} size="sm" className="h-8 gap-1">
              <PlusCircleIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                Imagen
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providerProducts?.map((productProvider: ProviderProduct) => (
              <TableRow key={productProvider.product.id}>
                <TableCell>
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={productProvider.product.image_url}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{productProvider.product.name}</TableCell>
                <TableCell>{productProvider.details}</TableCell>
                <TableCell>Bs. {productProvider.last_price}</TableCell>
                <TableCell>
                  <Badge variant={productProvider.product.is_active ? 'default' : 'outline'}>
                    {productProvider.product.is_active ? 'Activo' : 'Inactivo'}
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
                      {/* <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${productProvider.product.id}/detalles`) }}>
                              <Info className="mr-2 h-4 w-4" />
                              Detalles
                            </DropdownMenuItem> */}
                      <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PROVIDERPRODUCT}/${id}/editar/${productProvider.id}`) }}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between'
                              }}
                              onClick={(event) => { event.stopPropagation() }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </div>
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro de eliminar este proveedor?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el proveedor y todos los productos asociados.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => { deletePermanentlyGroup(productProvider.id) }}>Continuar</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
  )
}

export default ProviderProductTable
