import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon, MoreVerticalIcon } from 'lucide-react'

import { PrivateRoutes } from '@/models'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormatDateMMMDYYYY } from '@/utils'
import { Separator } from '@/components/ui/separator'
import { useGetPurchaseOrder, useUpdatePurchaseOrder } from '../../hooks/usePurchaseOrder'
import { STATE } from '../../constants/state.constants'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { type RootState } from '@/redux/store'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function OrderDetailsPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()
  const user = useSelector((state: RootState) => state.user)

  const { purchaseOrder } = useGetPurchaseOrder(id)
  const { updatePurchaseOrder } = useUpdatePurchaseOrder()

  const cancelPurchaseOrder = () => {
    toast.promise(updatePurchaseOrder({ id, state: STATE.CANCELLED }), {
      loading: 'Cancelando orden de compra...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.PURCHASE_ORDER, { replace: true })
        }, 1000)
        return 'Orden de compra cancelada'
      },
      error(error) {
        return error.errorMessages[0] && 'Error al cancelar la orden de compra'
      }
    })
  }

  return (
    <Tabs defaultValue="all">
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
          <Button
            type="button"
            onClick={() => { navigate(-1) }}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="sr-only">Volver</span>
          </Button>
          <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Orden de compra OC-{purchaseOrder?.code ?? '0'}
          </h2>
          <div className="w-full sm:w-fit sm:ml-auto flex items-center justify-between gap-4">
            {/* <TabsList>
              <TabsTrigger value="all">Todo</TabsTrigger>
            </TabsList> */}
            <Badge
              variant={
                purchaseOrder?.state === STATE.FINALIZED
                  ? 'default'
                  : purchaseOrder?.state === STATE.EARRING
                    ? 'secondary'
                    : purchaseOrder?.state === STATE.DRAFT ? 'outline' : 'destructive'
              }
            >
              {purchaseOrder?.state}
            </Badge>
            {purchaseOrder?.state !== STATE.CANCELLED && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVerticalIcon className="h-5 w-5" />
                  <span className="sr-only">Más</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {
                  !(purchaseOrder?.state === STATE.FINALIZED) &&
                  user.id === purchaseOrder?.user.id &&
                  <>
                    <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PURCHASE_ORDER}/${id}`) }}>Editar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                }
                {purchaseOrder?.state === STATE.EARRING &&
                  <DropdownMenuItem
                    onClick={() => { navigate(`${PrivateRoutes.BUY}/${purchaseOrder.buyNote?.id}`) }}
                  >Comprar</DropdownMenuItem>}
                {purchaseOrder?.state === STATE.FINALIZED &&
                  <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.BUY}/${purchaseOrder.buyNote?.id}`) }}>Ver Compra</DropdownMenuItem>}
                {
                  (purchaseOrder?.state === STATE.DRAFT || purchaseOrder?.state === STATE.EARRING) &&
                  user.id === purchaseOrder?.user.id &&
                  <DropdownMenuItem onClick={cancelPurchaseOrder}>Cancelar orden</DropdownMenuItem>
                }
              </DropdownMenuContent>
            </DropdownMenu>}
          </div>
        </div>
        <div className="grid gap-4 lg:gap-6 md:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-4 lg:gap-6">

            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex flex-col w-full">
                  {/* <ShoppingCart width={20} height={20} /> */}
                  <CardTitle className="text-lg">
                    Orden OC-{purchaseOrder?.code}
                  </CardTitle>
                  <CardDescription className='text-sm'>{purchaseOrder?.date} {purchaseOrder?.time}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVerticalIcon className="h-5 w-5" />
                        <span className="sr-only">Más</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ventas</DropdownMenuItem>
                      <DropdownMenuItem>Compras</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Salidas de producto</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-4 px-4 lg:px-6 lg:pb-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Detalles de la orden</div>
                  <ul className="grid gap-3">
                    <li className="flex gap-2 justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Motivo</span>
                      <span>{purchaseOrder?.reason}</span>
                    </li>
                    <Separator className="my-2" />
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Total</span>
                      <span className='text-light-text-primary dark:text-dark-text-primary font-semibold'>Bs. {purchaseOrder?.total.toFixed(2)}</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <div className="font-semibold">Información del usuario</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Nombre</span>
                      <span>{purchaseOrder?.user.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Email</span>
                      <span>{purchaseOrder?.user.email}</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <div className="font-semibold">Sucursal</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Nombre</span>
                      <span>{purchaseOrder?.branch.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Dirección</span>
                      <address className="grid gap-0.5 not-italic">
                        <span>{purchaseOrder?.branch?.address}</span>
                      </address>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Teléfono</span>
                      <span>{purchaseOrder?.branch?.phone ?? 's/n'}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Email</span>
                      <span>{purchaseOrder?.branch?.email ?? 's/n'}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  Actualizado <time dateTime={purchaseOrder?.updatedAt}>{FormatDateMMMDYYYY(purchaseOrder?.updatedAt ?? new Date().toDateString())}</time>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="flex flex-col gap-4 overflow-hidden lg:gap-6">
            <TabsContent value="all" className='mt-0'>
              {/* {product?.fuel ? <TankTable productId={id!} /> : <BatchTable productId={id!} />} */}
              <Card x-chunk="dashboard-07-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
                <CardHeader>
                  <CardTitle className='w-full flex items-center'>
                    Productos
                  </CardTitle>
                </CardHeader>
                {/* <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    </div> */}
                <CardContent className='overflow-hidden relative w-full'>
                  <div className='overflow-x-auto'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Producto</TableHead>
                          <TableHead>Cantidad</TableHead>
                          <TableHead>Precio de compra</TableHead>
                          <TableHead>SubTotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {purchaseOrder?.purchaseOrderDetails?.map((detail) => (
                          <TableRow key={detail.id}>
                            <TableCell className='flex items-center justify-start gap-3'>
                              <img
                                width="40"
                                height="40"
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                src={detail.product?.image_url ? detail.product.image_url : 'https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4='}
                              />
                              {detail.product?.name}
                            </TableCell>
                            <TableCell>{detail.amount}</TableCell>
                            <TableCell>Bs. {detail.product?.price_purchase.toFixed(2)}</TableCell>
                            <TableCell className='text-light-text-primary dark:text-dark-text-primary font-semibold'>Bs. {detail.subTotal.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* {form.watch('details').length === 0 && (
                      <p className='pt-4 px-4 text-muted-foreground dark:text-dark-text-secondary'>No hay productos agregados</p>
                    )} */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </section>
    </Tabs>
  )
}

export default OrderDetailsPage
