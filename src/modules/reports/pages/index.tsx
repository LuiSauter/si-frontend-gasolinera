import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PrivateRoutes } from '@/models/routes.model'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { z } from 'zod'
import { TypeDocument, TypeReport } from '../models/reports.model'
import { useHeader } from '@/hooks'
import { useGenerateReport } from '../hooks/useReports'
import { toast } from 'sonner'
import { useRef } from 'react'

const formSchema = z.object({
  end_date: z.string().min(1, 'La fecha final es requerida'),
  start_date: z.string().min(1, 'La fecha inicial es requerido'),
  typeDocument: z.string().min(1, 'El tipo de documento es requerido')
})

const formSchemaSales = z.object({
  end_date: z.string().min(1, 'La fecha final es requerida'),
  start_date: z.string().min(1, 'La fecha inicial es requerido'),
  typeDocument: z.string().min(1, 'El tipo de documento es requerido')
})

const formSchemaBita = z.object({
  end_date: z.string().min(1, 'La fecha final es requerida'),
  start_date: z.string().min(1, 'La fecha inicial es requerido'),
  typeDocument: z.string().min(1, 'El tipo de documento es requerido')
})

const ReportsFormPage = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Empresa', path: PrivateRoutes.COMPANY },
    { label: 'Reportes' }
  ])
  const navigate = useNavigate()
  const linkRef = useRef<HTMLAnchorElement | null>(null)
  const linkRefSales = useRef<HTMLAnchorElement | null>(null)
  const linkRefBita = useRef<HTMLAnchorElement | null>(null)
  const { generateReport, isMutating, data } = useGenerateReport()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      end_date: '',
      start_date: ''
    }
  })

  const formSales = useForm<z.infer<typeof formSchemaSales>>({
    resolver: zodResolver(formSchemaSales),
    defaultValues: {
      end_date: '',
      start_date: ''
    }
  })

  const formBitacora = useForm<z.infer<typeof formSchemaBita>>({
    resolver: zodResolver(formSchemaBita),
    defaultValues: {
      end_date: '',
      start_date: ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // void generateReport({
    //   typeDocument: data.typeDocument,
    //   parameters: {
    //     endDate: data.end_date,
    //     startDate: data.start_date
    //   },
    //   typeReport: TypeReport.BUY
    // })

    toast.promise(generateReport({
      typeDocument: data.typeDocument as TypeDocument,
      parameters: {
        endDate: data.end_date,
        startDate: data.start_date
      },
      typeReport: TypeReport.BUY
    }), {
      loading: 'Generando Reporte...',
      success: () => {
        if (linkRef) {
          setTimeout(() => {
            linkRef.current?.click()
          }, 2000)
        }
        return 'Reporte generado automaticamente'
      },
      error(error) {
        return error.errorMessages[0] ?? 'Error al crear el usuario'
      }
    })
  }

  const onSubmitSales = (data: z.infer<typeof formSchemaSales>) => {
    toast.promise(generateReport({
      typeDocument: data.typeDocument as TypeDocument,
      parameters: {
        endDate: data.end_date,
        startDate: data.start_date
      },
      typeReport: TypeReport.SALES
    }), {
      loading: 'Generando Reporte...',
      success: () => {
        if (linkRef) {
          setTimeout(() => {
            linkRefBita.current?.click()
          }, 2000)
        }
        return 'Reporte generado automaticamente'
      },
      error(error) {
        return error.errorMessages[0] ?? 'Error al crear el usuario'
      }
    })
  }

  const onSubmitBitacora = (data: z.infer<typeof formSchemaSales>) => {
    toast.promise(generateReport({
      typeDocument: data.typeDocument as TypeDocument,
      parameters: {
        endDate: data.end_date,
        startDate: data.start_date
      },
      typeReport: TypeReport.BITACORA
    }), {
      loading: 'Generando Reporte...',
      success: () => {
        if (linkRef) {
          setTimeout(() => {
            linkRefSales.current?.click()
          }, 2000)
        }
        return 'Reporte generado automaticamente'
      },
      error(error) {
        return error.errorMessages[0] ?? 'Error al crear el usuario'
      }
    })
  }

  // let subscribe = true
  // useEffect(() => {
  //   if (subscribe && (errorBranches ?? errorRole ?? errorUser)) {
  //     const error = errorBranches ?? errorRole ?? errorUser
  //     toast.error(error?.errorMessages[0])
  //   }
  //   return () => {
  //     subscribe = false
  //   }
  // }, [errorBranches, errorRole, errorUser])

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <div>
          <div className="flex items-center gap-4">
            <Button type='button' onClick={() => { navigate(PrivateRoutes.USER) }} variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
            <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Generar reportes
            </h2>
            {/* <div className="hidden items-center gap-2 md:ml-auto md:flex"> */}
            {/* <Button type='button' onClick={() => { navigate(PrivateRoutes.USER) }} variant="outline" size="sm">
                Descartar
              </Button> */}
            {/* <Button type='submit' size="sm" >Generar</Button> */}
            {/* </div> */}
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px] gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader className='flex flex-row justify-between'>
                  <CardTitle>Reportes de Compras</CardTitle>
                  <Button disabled={isMutating} type='submit' size="sm" className='h-8'>Generar</Button>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="start_date"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha inicial *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type='text'
                              placeholder="DD/MM/YYYY"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="end_date"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha final *</FormLabel>
                          <FormControl>
                            <Input placeholder="DD/MM/YYYY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="typeDocument"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de documento</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                              }}
                              value={field.value}
                              name={field.name}
                              disabled={field.disabled}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger aria-label="Selecciona el género">
                                  <SelectValue placeholder="Selecciona un tipo (PDF/Excel)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={TypeDocument.PDF}>Pdf</SelectItem>
                                <SelectItem value={TypeDocument.EXCEL}>Excel</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader className='flex flex-row justify-between'>
                  <CardTitle>Reporte</CardTitle>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  {data && (
                    <>
                      <Button type='submit' size="sm" className='h-8'>Descargar</Button>
                      <a ref={linkRef} href={URL.createObjectURL(data.dataBlob)} download={data.fileName} className='hidden'>
                        <button>Descargar Reporte</button>
                      </a>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
        <Form {...formSales}>
          <form onSubmit={formSales.handleSubmit(onSubmitSales)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px] gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader className='flex flex-row justify-between'>
                  <CardTitle>Reportes de ventas</CardTitle>
                  <Button disabled={isMutating} type='submit' size="sm" className='h-8'>Generar</Button>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
                    <FormField
                      control={formSales.control}
                      name="start_date"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha inicial *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type='text'
                              placeholder="DD/MM/YYYY"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formSales.control}
                      name="end_date"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha final *</FormLabel>
                          <FormControl>
                            <Input placeholder="DD/MM/YYYY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formSales.control}
                      name="typeDocument"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de documento</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                              }}
                              value={field.value}
                              name={field.name}
                              disabled={field.disabled}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger aria-label="Selecciona el género">
                                  <SelectValue placeholder="Selecciona un tipo (PDF/Excel)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={TypeDocument.PDF}>Pdf</SelectItem>
                                <SelectItem value={TypeDocument.EXCEL}>Excel</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader className='flex flex-row justify-between'>
                  <CardTitle>Descargar reporte de venta</CardTitle>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  {data && (
                    <>
                      <Button type='submit' size="sm" className='h-8'>Descargar</Button>
                      <a ref={linkRefSales} href={URL.createObjectURL(data.dataBlob)} download={data.fileName} className='hidden'>
                        <button>Descargar Reporte</button>
                      </a>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>

        <Form {...formBitacora}>
          <form onSubmit={formBitacora.handleSubmit(onSubmitBitacora)} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px] gap-4 lg:gap-6">
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader className='flex flex-row justify-between'>
                  <CardTitle>Reportes de ventas</CardTitle>
                  <Button disabled={isMutating} type='submit' size="sm" className='h-8'>Generar</Button>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  <div className="grid gap-4 lg:gap-6 md:grid-cols-2">
                    <FormField
                      control={formBitacora.control}
                      name="start_date"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha inicial *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type='text'
                              placeholder="DD/MM/YYYY"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formBitacora.control}
                      name="end_date"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha final *</FormLabel>
                          <FormControl>
                            <Input placeholder="DD/MM/YYYY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formBitacora.control}
                      name="typeDocument"
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de documento</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value)
                              }}
                              value={field.value}
                              name={field.name}
                              disabled={field.disabled}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger aria-label="Selecciona el género">
                                  <SelectValue placeholder="Selecciona un tipo (PDF/Excel)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={TypeDocument.PDF}>Pdf</SelectItem>
                                <SelectItem value={TypeDocument.EXCEL}>Excel</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-0" className='w-full' >
                <CardHeader className='flex flex-row justify-between'>
                  <CardTitle>Reporte </CardTitle>
                </CardHeader>
                <CardContent className='grid gap-4 lg:gap-6'>
                  {data && linkRefBita && (
                    <>
                      <Button type='submit' size="sm" className='h-8'>Descargar</Button>
                      <a ref={linkRefBita} href={URL.createObjectURL(data.dataBlob)} download={data.fileName} className='hidden'>
                        <button>Descargar Reporte</button>
                      </a>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}

export default ReportsFormPage
