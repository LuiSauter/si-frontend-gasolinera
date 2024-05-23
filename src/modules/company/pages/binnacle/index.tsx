import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { File, ListFilter, Users2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
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
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { useGetLogsByMothAndYear } from '../../hooks/useBinnacle'
import { useEffect } from 'react'

function BinnaclePage(): JSX.Element {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Empresa', path: PrivateRoutes.COMPANY },
    { label: 'Bitácora' }
  ])

  const { dataLogs, getLogByMothAndYear } = useGetLogsByMothAndYear()

  useEffect(() => {
    void getLogByMothAndYear({
      month: 'mayo',
      year: '2024',
      password: '12345678'
    })
  }, [])

  console.log(dataLogs)

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="year">Año</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filtrar</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Declined
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Refunded
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
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Bitácora</CardTitle>
                <CardDescription>
                  Actividad reciente de la empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='table-cell'>Usuario</TableHead>
                      <TableHead className='table-cell'>Method</TableHead>
                      <TableHead className='hidden sm:table-cell'>Endpoint</TableHead>
                      <TableHead className='hidden md:table-cell'>Fecha</TableHead>
                      <TableHead className='hidden md:table-cell'>Hora</TableHead>
                      <TableHead className='hidden lg:table-cell'>IP</TableHead>
                      <TableHead className='hidden xl:table-cell'>Branch</TableHead>
                      <TableHead className='hidden xl:table-cell'>Body</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      dataLogs?.map((log, index) => (
                        <TableRow key={index}>
                          <TableCell className=''><div className="flex items-center gap-2"><Users2Icon className="h-5 w-5" /><span>admin</span></div>
                          </TableCell>
                          <TableCell className='table-cell'>{log.method}</TableCell>
                          <TableCell className='hidden sm:table-cell'>{log.path}</TableCell>
                          <TableCell className='hidden md:table-cell'>{log.date}</TableCell>
                          <TableCell className='hidden md:table-cell'>{log.time}</TableCell>
                          <TableCell className='hidden lg:table-cell'>{log.ip}</TableCell>
                          <TableCell className='hidden xl:table-cell'>{log.branch}</TableCell>
                          <TableCell className='hidden xl:table-cell'><span title={JSON.stringify(log.body)}>body</span></TableCell>
                        </TableRow>

                      ))
                    }
                    {/* <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Login</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>
                        0.0.0.0.0
                      </TableCell>
                      <TableCell>
                        /api/auth/login
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Logout</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>17.196.130.0.10</TableCell>
                      <TableCell>
                        /api/auth/logout
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Login</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>10.0.13.00.10</TableCell>
                      <TableCell>
                        /api/auth/login
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Login</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>
                        0.0.0.0.0
                      </TableCell>
                      <TableCell>
                        /api/auth/login
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Logout</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>17.196.130.0.10</TableCell>
                      <TableCell>
                        /api/auth/logout
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Login</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>10.0.13.00.10</TableCell>
                      <TableCell>
                        /api/auth/login
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Login</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>
                        0.0.0.0.0
                      </TableCell>
                      <TableCell>
                        /api/auth/login
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Logout</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>17.196.130.0.10</TableCell>
                      <TableCell>
                        /api/auth/logout
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users2Icon className="h-5 w-5" />
                          <span>admin</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Login</Badge>
                      </TableCell>
                      <TableCell>2023-11-23 09:00:00</TableCell>
                      <TableCell>10.0.13.00.10</TableCell>
                      <TableCell>
                        /api/auth/login
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default BinnaclePage
