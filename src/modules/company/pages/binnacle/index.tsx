import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'
import { CheckIcon, ChevronsUpDownIcon, DotIcon, FileIcon, ListFilter, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetLogsByMothAndYear } from '../../hooks/useBinnacle'
import { useEffect } from 'react'
import { type Binnacle, MONTH, YEAR } from '../../models/binnacle.model'
import { toast } from 'sonner'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { z } from 'zod'
import { useGenerateReport } from '@/modules/reports/hooks/useReports'
import { TypeDocument, TypeReport } from '@/modules/reports/models/reports.model'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'

const formSchema = z.object({
  year: z.string().min(1, 'El año es requerido'),
  month: z.string().min(1, 'El mes es requerido'),
  typeDocument: z.string().min(1, 'El tipo de documento es requerido')
})

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
  const [value, setValue] = React.useState(months[new Date().getMonth()])
  const [openYear, setOpenYear] = React.useState(false)
  const [valueYear, setValueYear] = React.useState(new Date().getFullYear().toString())
  const [openModal, setOpenModal] = React.useState(false)
  const [selectBinnacle, setSelectBinnacle] = React.useState({} as Binnacle)

  const [selectedPlatform, setSelectedPlatform] = React.useState({ pdf: false, excel: false })
  const [openModalReport, setOpenModalReport] = React.useState(false)
  const linkRef = React.useRef<HTMLAnchorElement | null>(null)
  const { generateReport, data, isMutating } = useGenerateReport()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: '',
      month: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.promise(generateReport({
      typeDocument: data.typeDocument as TypeDocument,
      parameters: {
        month: data.month,
        year: data.year
      },
      typeReport: TypeReport.BITACORA
    }), {
      loading: 'Generando Reporte...',
      success: () => {
        if (linkRef) {
          setTimeout(() => {
            linkRef.current?.click()
            setOpenModalReport(false)
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
    if (value && valueYear) {
      void getLogByMothAndYear({
        month: value,
        year: valueYear
      })
    }
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
    <section className='grid gap-4 overflow-hidden w-full relative'>
      <div className="inline-flex items-center flex-wrap gap-2">
        <div className='flex auto-cols-auto items-start gap-2 lg:col-span-2'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="primary"
                role="combobox"
                aria-expanded={open}
                className="h-7 justify-between"
              >
                {value
                  ? months.find((month) => month === value)
                  : 'Mes'}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-fit p-0">
              <Command>
                <CommandInput placeholder="Buscar Mes" className="h-9" />
                <CommandList>
                  <CommandEmpty>Mes no encontrado.</CommandEmpty>
                  <CommandGroup>
                    {months.map((month) => (
                      <CommandItem
                        key={month}
                        value={month}
                        onSelect={(currentValue) => {
                          setValue((currentValue === value ? '' : currentValue) as MONTH)
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
                className="h-7 justify-between"
              >
                {valueYear
                  ? years.find((year) => year === valueYear)
                  : 'Año'}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Buscar Año" className="h-9" />
                <CommandList>
                  <CommandEmpty>Año no encontrado.</CommandEmpty>
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
                setOpenModalReport(true)
                form.setValue('month', value)
                form.setValue('year', valueYear)
                form.setValue('typeDocument', TypeDocument.PDF)
              }} className='cursor-pointer' checked>PDF</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => {
                setSelectedPlatform({ excel: true, pdf: false })
                setOpenModalReport(true)
                form.setValue('month', value)
                form.setValue('year', valueYear)
                form.setValue('typeDocument', TypeDocument.EXCEL)
              }} className='cursor-pointer'>Excel</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card x-chunk="dashboard-05-chunk-3" className='flex flex-col overflow-hidden w-full relative'>
        <CardHeader className="px-7">
          <CardTitle>Bitácora</CardTitle>
          <CardDescription>
            Actividad reciente de la empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hora</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Ip</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Endpoint</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  dataLogs?.map((log: Binnacle, index) => (
                    <TableRow key={index}>
                      {/* <TableCell className=''><div className="flex items-center gap-2"><Users2Icon className="h-5 w-5" /><span>admin</span></div>
                      </TableCell> */}
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.user !== '' ? log.user : 'Usuario no registrado'}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.method}</TableCell>
                      <TableCell>{log.path}</TableCell>
                      <TableCell>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setOpenModal(true)
                            setSelectBinnacle(log)
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={openModal} onOpenChange={(open) => { setOpenModal(open) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Detalle de la actividad</AlertDialogTitle>
            <AlertDialogDescription>
              A continuación se muestra el detalle de la actividad realizada por el usuario
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectBinnacle && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><span className='sr-only'></span></TableHead>
                  <TableHead>Datos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell>{selectBinnacle.date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hora</TableCell>
                  <TableCell>{selectBinnacle.time}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>{selectBinnacle.user !== '' ? selectBinnacle.user : 'Usuario no registrado'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Branch</TableCell>
                  <TableCell>{selectBinnacle.branch !== '' ? selectBinnacle.branch : 'Sucursal no asignada'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IP</TableCell>
                  <TableCell>{selectBinnacle.ip}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Method</TableCell>
                  <TableCell>{selectBinnacle.method}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Endpoint</TableCell>
                  <TableCell>{selectBinnacle.path}</TableCell></TableRow>
                <TableRow>
                  <TableCell>Acciones</TableCell>
                  <TableCell>
                    {Object.entries(selectBinnacle.body ?? {}).map((obj, index) => (
                      <div className="flex gap-1 items-center" key={index}>
                        <DotIcon className="h-4 w-4" />
                        <span>{obj[0]}: {JSON.stringify(obj[1])}</span>
                      </div>
                    ))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
            {/* <AlertDialogAction></AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={openModalReport} onOpenChange={(open) => { setOpenModalReport(open) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generar reporte de bitácora ({selectedPlatform.pdf ? 'PDF' : 'Excel'})</AlertDialogTitle>
            <AlertDialogDescription>
              El reporte se generará automáticamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={() => { }} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
              <div>
                ¿Estás seguro de generar el reporte de la bitácora del mes de <span className='font-semibold'>{value}</span> del año <span className='font-semibold'>{valueYear}</span> en formato <span className='font-semibold'>{selectedPlatform.pdf ? 'PDF' : 'Excel'}</span>?
              </div>
              <AlertDialogFooter>
                {data && <a ref={linkRef} href={URL.createObjectURL(data.dataBlob)} download={data.fileName} className='hidden'>
                  <Button type='button' size='icon' variant='link'>Descargar Reporte</Button>
                </a>}
                <AlertDialogCancel asChild>
                  <Button variant="outline" size="sm" type='button'>Cancelar</Button>
                </AlertDialogCancel>
                <Button type='button' disabled={isMutating} onClick={form.handleSubmit(onSubmit)} className='h-full'>Generar</Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}

export default BinnaclePage
