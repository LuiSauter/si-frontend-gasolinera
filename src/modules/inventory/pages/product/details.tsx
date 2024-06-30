import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon, MoreVerticalIcon } from 'lucide-react'

import { useGetProduct } from '../../hooks/useProduct'
import { PrivateRoutes } from '@/models'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormatDateMMMDYYYY } from '@/utils'
import BatchTable from './components/batch'
import { Separator } from '@/components/ui/separator'
import TankTable from './components/tank'

function DetailsPage(): JSX.Element {
  const navigate = useNavigate()
  const { id } = useParams()

  const { product } = useGetProduct(id)

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
            Detalles de {product?.name ?? 'producto...'}
          </h2>
          <div className="w-full sm:w-fit sm:ml-auto flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">{product?.fuel ? 'Tanques' : 'Lotes'}</TabsTrigger>
              <TabsTrigger value="product-output">Salidas</TabsTrigger>
              <TabsTrigger value="buys">Compras</TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVerticalIcon className="h-5 w-5" />
                  <span className="sr-only">Más</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PRODUCT}/${id}`) }}>Editar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-danger'>{product?.is_active ? 'Desactivar' : 'Activar'}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 lg:gap-6 md:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-4 lg:gap-6">

            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex flex-col gap-2">
                  <img
                    alt={product?.name}
                    className="aspect-square rounded-md object-cover shrink-0 lg:h-28 lg:w-28"
                    src={product?.image_url}
                    height="70"
                    width="70"
                  />
                  <CardTitle className="text-lg">
                    {product?.name}
                  </CardTitle>
                  <CardDescription>{product?.description}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-10 w-10">
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
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Compra
                      </span>
                      <span>Bs. {product?.price_purchase}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Venta
                      </span>
                      <span>Bs. {product?.price_purchase}</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Stock</span>
                      <span>{product?.stock}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Stock mínimo</span>
                      <span>{product?.minimum_stock}</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <div className="font-semibold">Sucursal</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Nombre</span>
                      <span>{product?.branch?.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Dirección</span>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>{product?.branch?.address}</span>
                      </address>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Teléfono</span>
                      <span>{product?.branch?.phone ?? 's/n'}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{product?.branch?.email ?? 's/n'}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Actualizado <time dateTime={product?.updatedAt}>{FormatDateMMMDYYYY(product?.updatedAt ?? new Date().toDateString())}</time>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="flex flex-col gap-4 overflow-hidden lg:gap-6">
            <TabsContent value="all" className='mt-0'>
              {product?.fuel ? <TankTable productId={id!} /> : <BatchTable productId={id!} productName={product?.name ?? ''} />}
            </TabsContent>
          </div>
        </div>
      </section>
    </Tabs>
  )
}

export default DetailsPage
