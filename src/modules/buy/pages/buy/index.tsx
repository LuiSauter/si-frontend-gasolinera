import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { FileIcon, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import { PrivateRoutes } from '@/models'
import { useNavigate } from 'react-router-dom'
import { useGetAllBuyNotes } from '../../hooks/useBuyNote'
import Pagination from '@/components/shared/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSelector } from 'react-redux'
import { type RootState } from '@/redux/store'
import Skeleton from '@/components/shared/skeleton'
import { useHeader } from '@/hooks'

function BuyPage() {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras' }
  ])
  const navigate = useNavigate()

  const { buyNotes, isLoading, filterOptions, newPage, prevPage, setOffset, countData } = useGetAllBuyNotes({ isGetAll: false })
  const user = useSelector((state: RootState) => state.user)

  return (
    <Tabs defaultValue="week" className='grid gap-2 overflow-hidden w-full relative'>
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
            <FileIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Exportar</span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => { navigate(PrivateRoutes.BUY_CREATE) }}>
            <PlusCircleIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar compra
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="week" className='relative overflow-hidden'>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Compras</CardTitle>
            <CardDescription>
              Listado de todas las compras realizadas por la empresa.
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
                    <TableHead>Productos</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead><div className='sr-only'></div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? <Skeleton rows={filterOptions.limit} columns={6} />
                    : buyNotes?.map((buyNote) => (
                      <TableRow key={buyNote.id}>
                        <TableCell>{buyNote.code}</TableCell>
                        <TableCell>{buyNote.date} {buyNote.time}</TableCell>
                        {/admin/i.test(user.role.name) && <TableCell>{buyNote.branch.name}</TableCell>}
                        <TableCell>Bs. {buyNote.totalAmount}</TableCell>
                        <TableCell>{buyNote.buyDetails.length}</TableCell>
                        <TableCell>{buyNote.provider.name}</TableCell>
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
                              <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.BUY}/${buyNote.id}`) }}>Ver detalle</DropdownMenuItem>
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
              currentItems={buyNotes?.length ?? 0}
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
  )
}

export default BuyPage
