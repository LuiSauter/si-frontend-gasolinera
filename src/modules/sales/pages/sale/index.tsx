import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeftIcon, FileIcon, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import { PrivateRoutes } from '@/models'
import { useNavigate } from 'react-router-dom'
import Pagination from '@/components/shared/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSelector } from 'react-redux'
import { type RootState } from '@/redux/store'
import Skeleton from '@/components/shared/skeleton'
import { useHeader } from '@/hooks'
import { useGetAllSales } from '../../hooks/useSale'

function SalePage() {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras' }
  ])
  const navigate = useNavigate()

  const { sales, isLoading, filterOptions, newPage, prevPage, setOffset, countData } = useGetAllSales()
  const user = useSelector((state: RootState) => state.user)

  return (
    <Tabs defaultValue="product" className='grid gap-2 overflow-hidden w-full relative'>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => { navigate(-1) }}
          variant="outline"
          size="icon"
          className="h-7 w-7"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className="sr-only">Volver</span>
        </Button>
        <TabsList className='h-7 '>
          <TabsTrigger value="product">Producto</TabsTrigger>
          <TabsTrigger value="fuel">Combustible</TabsTrigger>
        </TabsList>
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
            <FileIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Exportar</span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => { navigate(PrivateRoutes.SALES_CREATE) }}>
            <PlusCircleIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Crear venta
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="product" className='relative overflow-hidden'>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Ventas</CardTitle>
            <CardDescription>
              Listado de todas las ventas de productos.
            </CardDescription>
          </CardHeader>
          <CardContent className='overflow-hidden relative w-full'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Fecha y hora</TableHead>
                    {/admin/i.test(user.role.name) && <TableHead>Sucursal</TableHead>}
                    <TableHead>Total</TableHead>
                    <TableHead>Descuento</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead><div className='sr-only'></div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? <Skeleton rows={filterOptions.limit} columns={9} />
                    : sales.filter(t => !t.dispenser).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.date} {item.time}</TableCell>
                        {/admin/i.test(user.role.name) && <TableCell>{item.branch?.name}</TableCell>}
                        <TableCell>Bs. {((item.amountPaid - item.amountReturned) ?? 0).toFixed(2)}</TableCell>
                        <TableCell>Bs. {(item.discount ?? 0).toFixed(2)}</TableCell>
                        <TableCell>{item.seller.name}</TableCell>
                        <TableCell>{item.saleDetails?.length ?? 0}</TableCell>
                        <TableCell>{item.customer.name}</TableCell>
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
                              <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.BUY}/${item.id}`) }}>Ver venta</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {countData === 0 && (
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary pt-4">
                  No hay ventas que mostrar.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Pagination
              allItems={countData - sales.filter(t => t.dispenser).length ?? 0}
              currentItems={sales.filter(t => !t.dispenser).length ?? 0}
              limit={filterOptions.limit}
              newPage={() => { newPage(countData - sales.filter(t => t.dispenser).length ?? 0) }}
              offset={filterOptions.offset}
              prevPage={prevPage}
              setOffset={setOffset}
              setLimit={() => { }}
              params={true}
            />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="fuel" className='relative overflow-hidden'>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Ventas</CardTitle>
            <CardDescription>
              Listado de todas las ventas de combustible.
            </CardDescription>
          </CardHeader>
          <CardContent className='overflow-hidden relative w-full'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Fecha y hora</TableHead>
                    {/admin/i.test(user.role.name) && <TableHead>Sucursal</TableHead>}
                    <TableHead>Total</TableHead>
                    <TableHead>Descuento</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Combustible</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead><div className='sr-only'></div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? <Skeleton rows={filterOptions.limit} columns={9} />
                    : sales.filter(t => t.dispenser).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.date} {item.time}</TableCell>
                        {/admin/i.test(user.role.name) && <TableCell>{item.branch?.name}</TableCell>}
                        <TableCell>Bs. {((item.amountPaid - item.amountReturned) ?? 0).toFixed(2)}</TableCell>
                        <TableCell>Bs. {(item.discount ?? 0).toFixed(2)}</TableCell>
                        <TableCell>{item.seller.name}</TableCell>
                        <TableCell>{item.saleDetails ? item?.saleDetails[0].tank?.fuel.type : '-'}</TableCell>
                        <TableCell>{item.customer.name}</TableCell>
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
                              <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.BUY}/${item.id}`) }}>Ver venta</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {countData === 0 && (
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary pt-4">
                  No hay ventas que mostrar.
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Pagination
              allItems={countData - sales.filter(t => t.dispenser).length ?? 0}
              currentItems={sales.filter(t => !t.dispenser).length ?? 0}
              limit={filterOptions.limit}
              newPage={() => { newPage(countData - sales.filter(t => t.dispenser).length ?? 0) }}
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
  )
}

export default SalePage
