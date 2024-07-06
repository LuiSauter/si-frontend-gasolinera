import React, { useEffect, useRef, useState } from 'react'
import { Calendar as CalendarIcon, FileIcon, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { type RootState } from '@/redux/store'

import { cn } from '@/lib/utils'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addDays, format } from 'date-fns'
import { type DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { PrivateRoutes } from '@/models'
import { useGetAllBuyNotes } from '../../hooks/useBuyNote'
import Pagination from '@/components/shared/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useSelector } from 'react-redux'
import Skeleton from '@/components/shared/skeleton'
import { useHeader } from '@/hooks'

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useGenerateReport } from '@/modules/reports/hooks/useReports'
import { TypeDocument, TypeReport } from '@/modules/reports/models/reports.model'

const formSchema = z.object({
  end_date: z.string().min(1, 'La fecha final es requerida'),
  start_date: z.string().min(1, 'La fecha inicial es requerido'),
  typeDocument: z.string().min(1, 'El tipo de documento es requerido')
})

function BuyPage() {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Compras' }
  ])
  const navigate = useNavigate()

  const { buyNotes, isLoading, filterOptions, newPage, prevPage, setOffset, countData } = useGetAllBuyNotes({ isGetAll: false })
  const user = useSelector((state: RootState) => state.user)

  const [selectedPlatform, setSelectedPlatform] = useState({ pdf: false, excel: false })
  const [date, setDate] = React.useState<DateRange>({
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
      start_date: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.promise(generateReport({
      typeDocument: data.typeDocument as TypeDocument,
      parameters: {
        end_date: data.end_date,
        start_date: data.start_date
      },
      typeReport: TypeReport.BUY
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
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
              >
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

      <AlertDialog open={openModal} onOpenChange={(open) => { setOpenModal(open) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generar reporte de compra ({selectedPlatform.pdf ? 'PDF' : 'Excel'})</AlertDialogTitle>
            <AlertDialogDescription>
              El reporte se generará automáticamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <h3 className='font-medium'>Seleccione las fechas para generar el reporte</h3>
          <Form {...form}>
            <form onSubmit={() => { }} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
              <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
                <div className={cn('grid gap-2')}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                          'w-[300px] justify-start text-left font-normal',
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
                          : <span>Pick a date</span>}
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
                <Button type='button' disabled={isMutating} onClick={form.handleSubmit(onSubmit)} className='h-full'>Generar</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </Tabs>
  )
}

export default BuyPage
