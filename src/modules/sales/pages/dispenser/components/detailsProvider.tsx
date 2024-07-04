import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon, MoreVerticalIcon } from 'lucide-react'

import { PrivateRoutes } from '@/models'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useHeader } from '@/hooks'
import { useGetDispenser } from '@/modules/sales/hooks/useDispenser'
import { Separator } from '@radix-ui/react-dropdown-menu'
import HoseTable from './hoseTable'

function DispenserDetail(): JSX.Element {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Ventas', path: PrivateRoutes.DiSPENSER },
    { label: 'Dispensador', path: PrivateRoutes.DiSPENSER },
    { label: 'Detalles del dispensador' }
  ])

  const navigate = useNavigate()
  const { id } = useParams()
  const { dispenser } = useGetDispenser(id)
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
            Detalles del dispensador
          </h2>
          <div className="w-full sm:w-fit sm:ml-auto flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all"></TabsTrigger>
              <TabsTrigger value="buys"></TabsTrigger>
            </TabsList>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-10 w-10">
                  <MoreVerticalIcon className="h-5 w-5" />
                  <span className="sr-only">Más</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.DiSPENSER}/${dispenser?.id}`) }}>Editar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-danger'>{dispenser?.is_active ? 'Desactivar' : 'Activar'}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-4 lg:gap-6">

            <Card className="overflow-hidden">
              <CardHeader className="">
                <div className="flex flex-col gap-2 ">
                  <CardTitle className="text-lg">
                    Dispensador
                  </CardTitle>

                  <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Maxima Capacidad: </span>
                      <span>{dispenser?.max_capacity}</span>
                  </li>
                  {/* <CardDescription>Maxima capacidad: {dispenser?.max_capacity}</CardDescription> */}
                </div>
              </CardHeader>
              <Separator></Separator>
              <CardContent className="pb-4 px-4 lg:px-6 lg:pb-6 text-sm">
                <div className="grid gap-3">
                <Separator className="my-2" />
                  <div className="font-semibold">Detalles de la Sucursal</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Nombre</span>
                      <span>{dispenser?.branch.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Dirección</span>
                      <address className="grid gap-0.5 not-italic">
                        <span>{dispenser?.branch?.address}</span>
                      </address>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Teléfono</span>
                      <span>{dispenser?.branch?.phone ?? 's/n'}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Email</span>
                      <span>{dispenser?.branch?.email ?? 's/n'}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 overflow-hidden lg:gap-6">
            <TabsContent value="all" className='mt-0'>
              <HoseTable />
            </TabsContent>
          </div>
        </div>
      </section>
    </Tabs>
  )
}

export default DispenserDetail
