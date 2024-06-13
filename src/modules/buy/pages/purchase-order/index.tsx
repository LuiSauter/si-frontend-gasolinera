import { PrivateRoutes } from '@/models/routes.model'
import { File, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent
} from '@/components/ui/tabs'
// import { useNavigate } from 'react-router-dom'
import { useHeader } from '@/hooks'
import { Badge } from '@/components/ui/badge'
// import { useGetAllBranches } from '../../hooks/useBranch'
// import Loading from '@/components/shared/loading'
// import { useEffect } from 'react'
// import { toast } from 'sonner'

const PurchaseOrderPage = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras', path: PrivateRoutes.COMPANY },
    { label: 'Ordenes de compra' }
  ])
  //   const navigate = useNavigate()
  //   const { branches, isLoading, error } = useGetAllBranches()

  //   let subscribe = true
  //   useEffect(() => {
  //     if (subscribe && error) {
  //       toast.error(error.errorMessages[0])
  //     }
  //     return () => {
  //       subscribe = false
  //     }
  //   }, [error])

  return (
    <main className="grid flex-1 items-start gap-4 lg:gap-6">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilterIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filtrar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Todos
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Exportar</span>
              </Button>
              {/* onClick={() => { navigate(PrivateRoutes.BRANCH_CREATE) }} */}
              <Button size="sm" className="h-8 gap-1" >
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar Orden
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Ordenes de Compra</CardTitle>
                <CardDescription>
                  Listado de todas las ordenes de compra.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='hidden sm:table-cell'>Fecha y hora</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead className='hidden md:table-cell'>Proveedor</TableHead>
                      <TableHead className='hidden lg:table-cell'>Sucursal</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Estado
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Productos</TableHead>
                      <TableHead><div className='sr-only'></div></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* {branches?.length === 0 && <div>No hay sucursales</div>}
                    {branches?.map((branch) => (
                      <TableRow key={branch.id}>
                        <TableCell>{branch.name}</TableCell>
                        <TableCell className='hidden sm:table-cell'>{branch.address}</TableCell>
                        <TableCell className='hidden md:table-cell'>{branch.email}</TableCell>
                        <TableCell className='hidden lg:table-cell'>{branch.phone}</TableCell>
                        <TableCell>{branch.is_suspended ? 'Suspendido' : 'Activo'}</TableCell>
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
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => { }}>Editar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { }}>Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))} */}
                    <TableRow >
                        <TableCell className='hidden sm:table-cell'>03/06/2024</TableCell>
                        <TableCell>Adicionar stock</TableCell>
                        <TableCell className='hidden md:table-cell'>Penzoil</TableCell>
                        <TableCell className='hidden lg:table-cell'>Sucursal 1</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant= 'default'>
                            {/* {provider.isActive ? 'Activo' : 'Inactivo'} */}
                            finalizado
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">3</TableCell>
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
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => { }}>Editar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { }}>Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell className='hidden sm:table-cell'>13/12/2024</TableCell>
                        <TableCell>Restaurar stock</TableCell>
                        <TableCell className='hidden md:table-cell'>YPFB</TableCell>
                        <TableCell className='hidden lg:table-cell'>Sucursal 2</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant= 'destructive'>
                            {/* {provider.isActive ? 'Activo' : 'Inactivo'} */}
                            cancelado
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">5</TableCell>
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
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => { }}>Editar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { }}>Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell className='hidden sm:table-cell'>14/12/2024</TableCell>
                        <TableCell>Restaurar stock</TableCell>
                        <TableCell className='hidden md:table-cell'>Coca Cola</TableCell>
                        <TableCell className='hidden lg:table-cell'>Sucursal 1</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant= 'secondary'>
                            {/* {provider.isActive ? 'Activo' : 'Inactivo'} */}
                            en proceso
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">1</TableCell>
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
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => { }}>Editar</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => { }}>Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                </Table>
                {/* {isLoading && <div className='grid place-content-center place-items-center w-full shrink-0 pt-6'><Loading /></div>} */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default PurchaseOrderPage
