import { PrivateRoutes } from '@/models/routes.model'
import { File, ListFilterIcon, MoreHorizontal, Pencil, PlusCircleIcon, Trash } from 'lucide-react'

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
import { useNavigate } from 'react-router-dom'
import { useHeader } from '@/hooks'
import Loading from '@/components/shared/loading'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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
import { useDeleteDiscount, useGetAllDiscounts } from '../../hooks/useDiscount'

const DiscountPage = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Ventas', path: PrivateRoutes.DiSPENSER },
    { label: 'Descuentos' }
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()
  const { discounts, isLoading, error, mutate } = useGetAllDiscounts()
  const { deleteDiscount } = useDeleteDiscount()
  let subscribe = true
  useEffect(() => {
    if (subscribe && error) {
      toast.error(error.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [error])

  const deletePermanentlyDiscount = (id: string) => {
    toast.promise(deleteDiscount(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          void mutate()
          navigate(PrivateRoutes.DISCOUNT, { replace: true })
        }, 1000)
        return 'Descuento eliminado'
      },
      error: 'Ocurrio un error al eliminar el descuento'
    })
    setIsDialogOpen(false)
  }

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
              <Button size="sm" className="h-8 gap-1" onClick={() => { navigate(PrivateRoutes.DISCOUNT_CREATE) }}>
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar Descuento
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Todos los Descuentos</CardTitle>
                <CardDescription>
                  Listado de todos los descuentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead className='hidden md:table-cell'>Monto</TableHead>
                      <TableHead className='hidden sm:table-cell'>%Descuento</TableHead>
                      <TableHead className='hidden lg:table-cell'>Sucursal</TableHead>
                      <TableHead><div className='sr-only'></div></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discounts?.length === 0 && <div>No hay dispensadores</div>}
                    {discounts?.map((discount) => (
                      <TableRow key={discount.id}>
                        <TableCell>{discount.name}</TableCell>
                        <TableCell className='hidden md:table-cell'>{discount.amount}</TableCell>
                        <TableCell className='hidden sm:table-cell'>{`${discount.percentage} %`}</TableCell>
                        <TableCell className='hidden lg:table-cell'>{discount.branch.name}</TableCell>
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
                              <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.DISCOUNT}/${discount.id}`) }}>
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
                                      <AlertDialogTitle>Estas seguro de eliminar este descuento?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción no se puede deshacer. Esto eliminará permanentemente tu
                                        descuento.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => { deletePermanentlyDiscount(discount.id) }}>Continue</AlertDialogAction>
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
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default DiscountPage
