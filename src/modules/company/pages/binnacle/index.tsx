import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { CheckIcon, ChevronsUpDownIcon, File, ListFilter, Users2Icon } from 'lucide-react'

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
import { useGetLogsByMothAndYear } from '../../hooks/useBinnacle'
import { useEffect } from 'react'
import { MONTH, YEAR } from '../../models/binnacle.model'
import { toast } from 'sonner'
import * as React from 'react'
// import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

function BinnaclePage(): JSX.Element {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Empresa', path: PrivateRoutes.COMPANY },
    { label: 'Bitácora' }
  ])

  const { dataLogs, getLogByMothAndYear, error } = useGetLogsByMothAndYear()
  const months = Object.values(MONTH)
  const years = Object.values(YEAR)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [openYear, setOpenYear] = React.useState(false)
  const [valueYear, setValueYear] = React.useState('')
  useEffect(() => {
    void getLogByMothAndYear({
      month: value,
      year: valueYear
    })
  }, [value, valueYear])

  let subscribe = true
  useEffect(() => {
    if (subscribe && error) {
      toast.error('No hay actividad en esta fecha')
    }
    return () => {
      subscribe = false
    }
  }, [error])

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-1 lg:col-span-2">
        {/* <Tabs defaultValue="week"> */}
          <div className="flex items-center">
            {/* <TabsList>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="year">Año</TabsTrigger>
            </TabsList> */}
            <div className='flex auto-cols-auto items-start gap-4 md:gap-1 lg:col-span-2'>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="primary"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[120px] h-7 justify-between"
                  >
                    {value
                      ? months.find((month) => month === value)
                      : 'Mes'}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] h-48 p-0">
                  <Command>
                    <CommandInput placeholder="Buscar Mes" className="h-9" />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {months.map((month) => (
                          <CommandItem
                            key={month}
                            value={month}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? '' : currentValue)
                              setOpen(false)
                            }}
                          >
                            {month}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                value === month ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Popover open={openYear} onOpenChange={setOpenYear}>
                <PopoverTrigger asChild>
                  <Button
                    variant="primary"
                    role="combobox"
                    aria-expanded={openYear}
                    className="w-[120px] h-7 justify-between"
                  >
                    {valueYear
                      ? years.find((year) => year === valueYear)
                      : 'Año'}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] h-48 p-0">
                  <Command>
                    <CommandInput placeholder="Buscar Año" className="h-9" />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {years.map((year) => (
                          <CommandItem
                            key={year}
                            value={year}
                            onSelect={(currentValue) => {
                              setValueYear(currentValue === valueYear ? '' : currentValue)
                              setOpenYear(false)
                            }}
                          >
                            {year}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                valueYear === year ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="ml-auto flex items-center gap-2">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only ">Filtrar</span>
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
          {/* <TabsContent value="week"> */}
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
          {/* </TabsContent> */}
          {/* <TabsContent value="month">
            <div>hola</div>
          </TabsContent> */}
        {/* </Tabs> */}
      </div>
    </main>
  )
}

export default BinnaclePage
