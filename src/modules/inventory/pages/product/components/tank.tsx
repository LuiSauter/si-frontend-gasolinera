import Pagination from '@/components/shared/pagination'
import Skeleton from '@/components/shared/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PrivateRoutes } from '@/models'
import { useGetAllTanksByProduct } from '@/modules/inventory/hooks/useTank'
import { type Tank } from '@/modules/inventory/models/tank.model'
import { ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface TankTableProps {
  productId: string
}

function TankTable({ productId }: TankTableProps) {
  const navigate = useNavigate()
  const { tanks, isLoading, filterOptions, newPage, prevPage, setOffset, countData } = useGetAllTanksByProduct({ isGetAll: true, productId })
  return (
    <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
      <CardHeader>
        <CardTitle className='flex flex-row flex-wrap gap-2 justify-between'>
          <span>Tanques</span>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  {/* <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filtrar
                  </span> */}
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
            {/* <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button> */}
            <Button onClick={() => { navigate(PrivateRoutes.PRODUCT_ADD) }} size="sm" className="h-8 gap-1">
              <PlusCircleIcon className="h-3.5 w-3.5" />
              {/* <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span> */}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='overflow-hidden relative w-full'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Capacidad max</TableHead>
                <TableHead>Typo</TableHead>
                <TableHead>Sucursal</TableHead>
                <TableHead>Última rev.</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead><span className='sr-only'></span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? <Skeleton rows={filterOptions.limit} columns={8} />
                : tanks?.map((tank: Tank) => (
                  <TableRow key={tank.id}>
                    <TableCell>{tank.name}</TableCell>
                    <TableCell>{tank.stock}</TableCell>
                    <TableCell>{tank.capacity_max}</TableCell>
                    <TableCell>{tank.fuel.type}</TableCell>
                    <TableCell>{tank.branch.name}</TableCell>
                    <TableCell>{tank.last_revision}</TableCell>
                    <TableCell>
                      <Badge variant={tank.is_active ? 'default' : 'destructive'}>
                        {tank.is_active ? 'Activo' : 'Inactivo'}
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
                          <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${tank.id}/detalles`) }}>Ver detalle</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${tank.id}`) }}>Editar</DropdownMenuItem>
                          {/* <DropdownMenuItem onClick={() => { deletePermanentlyRole(product.id) }}>
                            {product.is_active ? 'Desactivar' : 'Activar'}
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <Pagination
          allItems={countData ?? 0}
          currentItems={tanks?.length ?? 0}
          limit={filterOptions.limit}
          newPage={() => { newPage(countData ?? 0) }}
          offset={filterOptions.offset}
          prevPage={prevPage}
          setOffset={setOffset}
          setLimit={() => { }}
        />
      </CardFooter>
    </Card>
  )
}

export default TankTable
