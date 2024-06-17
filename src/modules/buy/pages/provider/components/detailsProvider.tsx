import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon, MoreVerticalIcon } from 'lucide-react'

import { PrivateRoutes } from '@/models'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGetProvider } from '@/modules/buy/hooks/useProvider'
import ProviderProductTable from './providerProductTable'
import { useHeader } from '@/hooks'

function ProviderDetailsPage(): JSX.Element {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras', path: PrivateRoutes.PROVIDER },
    { label: 'Proveedores', path: PrivateRoutes.PROVIDER },
    { label: 'Detalles del proveedor' }
  ])

  const navigate = useNavigate()
  const { id } = useParams()
  const { provider } = useGetProvider(id)

  return (
    <Tabs defaultValue="all">
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
          <Button
            type="button"
            onClick={() => { navigate(-1) }}
            variant="outline"
            size="icon"
            className="h-10 w-10"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span className="sr-only">Volver</span>
          </Button>
          <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Detalles de {provider?.name ?? 'producto...'}
          </h2>
          <div className="w-full sm:w-fit sm:ml-auto flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">Productos</TabsTrigger>
              <TabsTrigger value="buys">Compras</TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-10 w-10">
                  <MoreVerticalIcon className="h-5 w-5" />
                  <span className="sr-only">Más</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.PROVIDER}/${provider?.id}`) }}>Editar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-danger'>{provider?.isActive ? 'Desactivar' : 'Activar'}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-4 lg:gap-6">

            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex flex-col gap-2">
                  {/* <img
                    alt={provider?.name}
                    className="aspect-square rounded-md object-cover shrink-0 lg:h-28 lg:w-28"
                    src={provider?.image_url}
                    height="70"
                    width="70"
                  /> */}
                  <CardTitle className="text-lg">
                    {provider?.name}
                  </CardTitle>
                  <CardDescription>{provider?.detail}</CardDescription>
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
                        Nit
                      </span>
                      <span>{provider?.nit}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Teléfono
                      </span>
                      <span>{provider?.phone}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Correo</span>
                      <span>{provider?.email}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Estado</span>
                      <span>{provider?.isActive ? 'Activado' : 'Inactivo'}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Dirección</span>
                      <span>{provider?.address}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 overflow-hidden lg:gap-6">
            <TabsContent value="all" className='mt-0'>
              <ProviderProductTable />
            </TabsContent>
          </div>
        </div>
      </section>
    </Tabs>
  )
}

export default ProviderDetailsPage
