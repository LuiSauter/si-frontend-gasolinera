import { ChevronLeftIcon, File, Info, ListFilter, MoreHorizontal, Pencil, PlusCircle, Power, PowerOff, Search } from 'lucide-react'

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
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '@/models'
// import { useDeleteProduct, useGetAllProducts } from '../../hooks/useProduct'
// import { type Product } from '../../models/product.model'
import { toast } from 'sonner'
import Loading from '@/components/shared/loading'
import { useHeader } from '@/hooks'
import { useDeleteProvider, useGetAllProvider } from '../../hooks/useProvider'
import { type Provider } from '../../models/provider.model'
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
import { useEffect, useState } from 'react'
import Pagination from '@/components/shared/pagination'
import useDebounce from '@/hooks/useDebounce'
import { Input } from '@/components/ui/input'

const ProviderPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras', path: PrivateRoutes.BUY },
    { label: 'Proveedores' }
  ])
  const navigate = useNavigate()
  const { providers, countData, isLoading, filterOptions, newPage, prevPage, setOffset, search } = useGetAllProvider({ isGetAll: false })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchProduct, setSearchProduct] = useState('')
  const debounceSearchProduct = useDebounce(searchProduct, 1000)
  const { deleteProvider } = useDeleteProvider()

  const deletePermanentlyProvider = (id: string) => {
    toast.promise(deleteProvider(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.PROVIDER, { replace: true })
        }, 1000)
        return 'Acción realizada exitosamente'
      },
      error: 'Error al realizar esta acción'
    })
    setIsDialogOpen(false)
  }
  useEffect(() => {
    search('name', debounceSearchProduct)
  }, [debounceSearchProduct])

  return (
    <main className="grid flex-1 items-start gap-4 lg:gap-6">
      <Tabs defaultValue="all">
        <div className="flex items-center">
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
          <form className='py-1'>
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar"
                className="w-full appearance-none bg-background pl-8 shadow-none outline-none h-8 ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 ring-offset-0 xl:min-w-80"
                onChange={(e) => { setSearchProduct(e.target.value) }}
              />
            </div>
          </form>
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
            <Button onClick={() => { navigate(PrivateRoutes.PROVIDER_CREATE) }} size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar Proveedor
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Proveedores</CardTitle>
              <CardDescription>
              Listado de todos los proveedores de la empresa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className=''>Nombre</TableHead>
                    <TableHead className='hidden xl:table-cell'>Correo electronico</TableHead>
                    <TableHead className=''>Telefono</TableHead>
                    <TableHead className='hidden lg:table-cell'>Nit</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Estado
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providers?.map((provider: Provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">
                        {provider.name}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        {provider.email}
                      </TableCell>
                      <TableCell>
                        {provider.phone}
                      </TableCell>
                      <TableCell className='hidden lg:table-cell'>
                        {provider.nit}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={provider.isActive ? 'default' : 'outline'}>
                          {provider.isActive ? 'Activo' : 'Inactivo'}
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
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PROVIDERPRODUCT}/${provider.id}/detalles`) }}>
                              <Info className="mr-2 h-4 w-4" />
                              Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PROVIDER}/${provider.id}`) }}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem >
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
                                          {provider.isActive
                                            ? (
                                            <>
                                                <PowerOff className="mr-2 h-4 w-4" />
                                                Desactivar
                                            </>
                                              )
                                            : (
                                            <>
                                                <Power className="mr-2 h-4 w-4" />
                                                Activar
                                            </>
                                              )
                                          }
                                        </div>
                                      </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Estas seguro de que quieres desactivar este proveedor?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Esta acción no se puede deshacer. Esto desactivara permanentemente este proveedor.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { deletePermanentlyProvider(provider.id) }}>Continue</AlertDialogAction>
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
            <CardFooter className='w-full'>
              <Pagination
                allItems={countData ?? 0}
                currentItems={providers?.length ?? 0}
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
    </main>
  )
}

export default ProviderPage
