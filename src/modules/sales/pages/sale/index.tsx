import { z } from 'zod'
import { CalendarIcon, ChevronLeftIcon, FileIcon, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { type DateRange } from 'react-day-picker'
import { addDays, format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PrivateRoutes } from '@/models'
import Pagination from '@/components/shared/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type RootState } from '@/redux/store'
import Skeleton from '@/components/shared/skeleton'
import { useHeader } from '@/hooks'
import { useGetAllSales } from '../../hooks/useSale'
import { useGenerateReport } from '@/modules/reports/hooks/useReports'
import { zodResolver } from '@hookform/resolvers/zod'
import { TypeDocument, TypeReport } from '@/modules/reports/models/reports.model'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  end_date: z.string().min(1, 'La fecha final es requerida'),
  start_date: z.string().min(1, 'La fecha inicial es requerido'),
  typeDocument: z.string().min(1, 'El tipo de documento es requerido'),
  nit: z.string().optional()
})

function SalePage() {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Ventas' }
  ])
  const navigate = useNavigate()

  const { sales, isLoading, filterOptions, newPage, prevPage, setOffset, countData } = useGetAllSales()
  const user = useSelector((state: RootState) => state.user)

  const [selectedPlatform, setSelectedPlatform] = useState({ pdf: false, excel: false })
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 1)
  })
  const [openModal, setOpenModal] = useState(false)
  const linkRef = useRef<HTMLAnchorElement | null>(null)
  const { generateReport, data, isMutating } = useGenerateReport()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      end_date: '',
      start_date: '',
      nit: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    toast.promise(generateReport({
      typeDocument: data.typeDocument as TypeDocument,
      parameters: {
        end_date: data.end_date,
        start_date: data.start_date,
        nit: data.nit
      },
      typeReport: TypeReport.SALES
    }), {
      loading: 'Generando Reporte...',
      success: () => {
        if (linkRef) {
          setTimeout(() => {
            linkRef.current?.click()
            setOpenModal(false)
          }, 1000)
        }
        return 'Reporte generado automaticamente'
      },
      error(error) {
        return error.errorMessages[0] ?? 'Error al crear el usuario'
      }
    })
  }

  useEffect(() => {
    if (date?.from && date?.to) {
      form.setValue('start_date', format(date.from, 'dd/MM/yyyy'))
      form.setValue('end_date', format(date.to ?? date.from, 'dd/MM/yyyy'))
    } else {
      form.setValue('start_date', '')
      form.setValue('end_date', '')
    }
  }, [date?.from, date?.to])

  return (
    <Tabs defaultValue="fuel" className='grid gap-2 overflow-hidden w-full relative'>
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
          <TabsTrigger value="fuel">Combustible</TabsTrigger>
          <TabsTrigger value="product">Producto</TabsTrigger>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <FileIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Reporte</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Selecciona un formato</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem onClick={() => {
                setSelectedPlatform({ excel: false, pdf: true })
                setOpenModal(true)
                form.setValue('typeDocument', TypeDocument.PDF)
              }} className='cursor-pointer' checked>PDF</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => {
                setSelectedPlatform({ excel: true, pdf: false })
                setOpenModal(true)
                form.setValue('typeDocument', TypeDocument.EXCEL)
              }} className='cursor-pointer'>Excel</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <AlertDialog open={openModal} onOpenChange={(open) => { setOpenModal(open) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generar reporte de ventas ({selectedPlatform.pdf ? 'PDF' : 'Excel'})</AlertDialogTitle>
            <AlertDialogDescription>
              El reporte se generará automáticamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <h3 className='font-medium'>Seleccione las fechas para generar el reporte</h3>
          <Form {...form}>
            <form onSubmit={() => { }} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
              <div className="grid gap-4 lg:gap-6">
                <div className={cn('grid gap-2')}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                          'justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from
                          ? date.to
                            ? <>
                              {format(date.from, 'LLL dd, y')} -{' '}
                              {format(date.to, 'LLL dd, y')}
                            </>
                            : format(date.from, 'LLL dd, y')
                          : <span>Selecciona las fechas</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate!)
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormField
                  control={form.control}
                  name="nit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nit *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nit *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AlertDialogFooter>
                {data && <a ref={linkRef} href={URL.createObjectURL(data.dataBlob)} download={data.fileName} className='hidden'>
                  <Button type='button' size='icon' variant='link'>Descargar Reporte</Button>
                </a>}
              </AlertDialogFooter>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline" size="sm" type='button'>Cancelar</Button>
                </AlertDialogCancel>
                <Button className='h-full' type='button' disabled={isMutating} onClick={form.handleSubmit(onSubmit)}>Generar</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </Tabs>
  )
}

export default SalePage
