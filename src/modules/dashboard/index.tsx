import { useHeader } from '@/hooks'
// import React, { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
// import { type BuyNoteYear, type SaleNoteYear } from './models/dashboard.model'
// import { FormatDateMMMM, getStorage, STORAGE_BRANCH } from '@/utils'
// import { useGetAllBuyNoteYear, useGetAllSaleNoteYear, useGetAllSaleNoteYearMonth } from './hooks/useDashboard'
// import { toast } from 'sonner'
// import SelectDate from '@/components/shared/calendar'
// import { useNavigate } from 'react-router-dom'

// const MONTHS = [
//   { label: 'Enero', value: '1' },
//   { label: 'Febrero', value: '2' },
//   { label: 'Marzo', value: '3' },
//   { label: 'Abril', value: '4' },
//   { label: 'Mayo', value: '5' },
//   { label: 'Junio', value: '6' },
//   { label: 'Julio', value: '7' },
//   { label: 'Agosto', value: '8' },
//   { label: 'Septiembre', value: '9' },
//   { label: 'Octubre', value: '10' },
//   { label: 'Noviembre', value: '11' },
//   { label: 'Diciembre', value: '12' }
// ]

// function generateYears(currentDate: string, endDate: string): Array<{ label: string, value: string }> {
//   return Array.from({ length: Number(currentDate) - Number(endDate) }, (_, i) => ({ label: (Number(endDate) + i).toString(), value: (Number(endDate) + i).toString() })).reverse()
// }

const DashboardPage = (): React.ReactNode => {
  useHeader([
    { label: 'Dashboard' }
  ])
  // const navigate = useNavigate()
  // const [tabTime, setTabTime] = useState('year')
  // const [loading, setLoading] = useState(false)
  // const [openSelectDate, setOpenSelectDate] = useState({ month: false, year: false })
  // const [previousSalesMonth, setPreviousSaleMonth] = useState<SaleNoteYear>({} as SaleNoteYear)
  // const [currentSaleMonth, setCurrentSaleMonth] = useState<SaleNoteYear>({} as SaleNoteYear)
  // const [previousBuyMonth, setPreviousBuyMonth] = useState<BuyNoteYear>({} as BuyNoteYear)
  // const [currentBuyMonth, setCurrentBuyMonth] = useState<BuyNoteYear>({} as BuyNoteYear)
  // const [calculatedPercentage, setCalculatedPercentage] = useState({
  //   revenue: 0,
  //   discount: 0,
  //   sales: 0,
  //   profits: 0
  // })
  // const [totalesYear, setTotalesYear] = useState({
  //   totalRevenue: 0,
  //   totalDiscount: 0,
  //   totalSales: 0,
  //   profits: 0,
  //   totalBuys: 0,
  //   totalRevenuePrevious: 0,
  //   totalDiscountPrevious: 0,
  //   totalSalesPrevious: 0,
  //   profitsPrevious: 0,
  //   totalBuysPrevious: 0
  // })

  // const [actualYear, setActualYear] = useState(new Date().getFullYear())
  // const [selectMonth, setSelectMonth] = useState(MONTHS.find(m => m.label.toLowerCase() === FormatDateMMMM(new Date().toDateString()).toLowerCase())?.value ?? '6')

  // const { saleNoteYears, error: errorSaleNoteYears, isValidating: isValidatingSaleNoteYears } = useGetAllSaleNoteYear(
  //   actualYear.toString()
  // )
  // const { saleNoteYears: saleNoteYearsPrevious, isValidating: isValidatingSaleNoteYear } = useGetAllSaleNoteYear(
  //   `${actualYear - 1}`
  // )

  // const { buyNoteYears, error: errorBuy, isValidating: isValidatingBuy } = useGetAllBuyNoteYear(
  //   actualYear.toString()
  // )

  // const { saleNoteYearMonth, isValidating, error } = useGetAllSaleNoteYearMonth(
  //   actualYear.toString(), selectMonth
  // )

  // const { buyNoteYears: buyNoteYearsPrevious, isValidating: isValidatingBuyYear } = useGetAllBuyNoteYear(
  //   `${actualYear - 1}`
  // )

  // useEffect(() => {
  //   setLoading(true)
  //   if (saleNoteYears.length > 0 && saleNoteYearsPrevious.length > 0 && buyNoteYears.length > 0 && buyNoteYearsPrevious.length > 0) {
  //     const dataMonth = saleNoteYears?.find((month, index) => {
  //       const foundMonth = MONTHS.find(m => m.value === selectMonth)?.label.toLowerCase()
  //       if (foundMonth === month.month) {
  //         setPreviousSaleMonth(saleNoteYears[index - 1])
  //       }
  //       return foundMonth === month.month
  //     })
  //     setCurrentSaleMonth(dataMonth!)

  //     const dataMonthBuy = buyNoteYears?.find((month, index) => {
  //       const foundMonth = MONTHS.find(m => m.value === selectMonth)?.label.toLowerCase()
  //       if (foundMonth === month.month) {
  //         setPreviousBuyMonth(buyNoteYears[index - 1])
  //       }
  //       return foundMonth === month.month
  //     })
  //     setCurrentBuyMonth(dataMonthBuy!)

  //     const revenues = saleNoteYears?.reduce((sum, month) => sum + month.total, 0)
  //     const revenuesPrevious = saleNoteYearsPrevious?.reduce((sum, month) => sum + month.total, 0)
  //     const buys = buyNoteYears?.reduce((sum, month) => sum + month.total, 0)
  //     const buysPrevious = buyNoteYearsPrevious?.reduce((sum, month) => sum + month.total, 0)
  //     setTotalesYear({
  //       totalRevenue: revenues,
  //       totalBuys: buys,
  //       totalDiscount: saleNoteYears?.reduce((sum, month) => sum + month.discount, 0),
  //       totalSales: saleNoteYears?.reduce((sum, month) => sum + month.countData, 0),
  //       profits: revenues - buys,

  //       totalRevenuePrevious: revenuesPrevious,
  //       totalDiscountPrevious: saleNoteYearsPrevious?.reduce((sum, month) => sum + month.discount, 0),
  //       totalSalesPrevious: saleNoteYearsPrevious?.reduce((sum, month) => sum + month.countData, 0),
  //       totalBuysPrevious: buysPrevious,
  //       profitsPrevious: revenuesPrevious - buysPrevious
  //     })
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 500)
  //   }
  // }, [saleNoteYears, saleNoteYearsPrevious, buyNoteYears, buyNoteYearsPrevious, selectMonth])

  // function calculatePercentageChange(current: number = 0, previous: number = 0) {
  //   if (previous === 0) {
  //     return current === 0 ? 0 : 100
  //   }
  //   return ((current - previous) / previous * 100)
  // }

  // useEffect(() => {
  //   if (previousSalesMonth && currentSaleMonth && previousBuyMonth && currentBuyMonth) {
  //     setCalculatedPercentage({
  //       revenue: calculatePercentageChange(currentSaleMonth.total, previousSalesMonth.total),
  //       discount: calculatePercentageChange(currentSaleMonth.discount, previousSalesMonth.discount),
  //       sales: calculatePercentageChange(currentSaleMonth.countData, previousSalesMonth.countData),
  //       profits: calculatePercentageChange(
  //         currentSaleMonth.total - currentBuyMonth.total,
  //         previousSalesMonth.total - previousBuyMonth.total
  //       )
  //     })
  //   }
  // }, [previousSalesMonth, currentSaleMonth, previousBuyMonth, currentBuyMonth])

  // const handleYearChange = (year: number) => {
  //   setLoading(true)
  //   setActualYear(year)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 100)
  // }

  // const handleTabTime = (time: string) => {
  //   setLoading(true)
  //   setTabTime(time)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 100)
  // }

  // const calculatePreviousDifference = (percentageMonth: number, percentageYear: number) => {
  //   return tabTime === 'month'
  //     ? (<p className={'text-xs text-light-text-secondary dark:text-dark-text-secondary'}>
  //       {percentageMonth < 0
  //         ? <span className='text-red-500'>{percentageMonth.toFixed(1)}%</span>
  //         : <span className={`${percentageMonth === 0 ? '' : 'text-green-500'}`}>+{percentageMonth.toFixed(1)}%</span>
  //       }
  //       <span className='pl-1'>respecto al mes pasado</span>
  //     </p>)
  //     : (<p className={'text-xs text-light-text-secondary dark:text-dark-text-secondary'}>
  //       {percentageYear < 0
  //         ? <span className='text-red-500'>{percentageYear.toFixed(1)}%</span>
  //         : <span className={`${percentageYear === 0 ? '' : 'text-green-500'}`}>+{percentageYear.toFixed(1)}%</span>
  //       }
  //       <span className='pl-1'>respecto al año pasado</span>
  //     </p>)
  // }

  // const handleMonthChange = (month: string) => {
  //   setLoading(true)
  //   setSelectMonth(month)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 100)
  // }

  // let mounted = true
  // useEffect(() => {
  //   if (mounted && (getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH))) {
  //     toast.warning('No estás asociado a ninguna sucursal para ver el dashboard. Por favor, contacta al administrador.')
  //   }

  //   return () => {
  //     mounted = false
  //   }
  // }, [getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH)])

  // const handleOpenSelectDate = (value: boolean, type: string) => {
  //   setOpenSelectDate({ ...openSelectDate, [type]: value })
  // }

  return (
    <div className="chart-wrapper w-full mx-auto grid lg:grid-cols-[420px_1fr] items-start justify-center gap-4">
      <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:w-full">
        {/* <div className='flex flex-row items-center gap-2'>
          <SelectDate
            onOpenChange={(value) => { handleOpenSelectDate(value, 'month') }}
            open={openSelectDate.month}
            options={MONTHS}
            placeholder='Mes'
            setValue={(e) => {
              handleMonthChange(e)
            }}
            value={selectMonth}
          />
          <SelectDate
            onOpenChange={(value) => { handleOpenSelectDate(value, 'year') }}
            open={openSelectDate.year}
            options={generateYears((new Date().getFullYear() + 1).toString(), '2020')}
            placeholder='Año'
            setValue={(e) => {
              handleYearChange(Number(e))
            }}
            value={actualYear.toString()}
          />
        </div> */}
        {/* Ventas */}
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Ventas Hoy</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              12,584
              <span className="font-sans text-base font-normal tracking-normal text-muted-foreground ml-2">
                BS
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ventas: {
                  label: 'Ventas',
                  color: 'hsl(var(--chart-1))'
                }
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4
                }}
                data={[
                  { date: '2024-01-01', ventas: 2000 },
                  { date: '2024-01-02', ventas: 2100 },
                  { date: '2024-01-03', ventas: 2200 },
                  { date: '2024-01-04', ventas: 1300 },
                  { date: '2024-01-05', ventas: 1400 },
                  { date: '2024-01-06', ventas: 2500 },
                  { date: '2024-01-07', ventas: 1600 }
                ]}
              >
                <Bar
                  dataKey="ventas"
                  fill="var(--color-ventas)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      weekday: 'short'
                    })
                  }}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      }}
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={1200}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Promedio Ventas"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value="12,343"
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  />
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              En los últimos 7 días, has vendido{' '}
              <span className="font-medium text-foreground">Bs 53,305</span>.
            </CardDescription>
            <CardDescription>
              Necesitas{' '}
              <span className="font-medium text-foreground">Bs 12,584</span> más
              para alcanzar tu meta.
            </CardDescription>
          </CardFooter>
        </Card>

        {/* Compras */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
              <CardDescription>Compras Hoy</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                8,342
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  BS
                </span>
              </CardTitle>
            </div>
            <div>
              <CardDescription>Descuentos</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                1,234
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  BS
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <ChartContainer
              config={{
                compras: {
                  label: 'Compras',
                  color: 'hsl(var(--chart-1))'
                }
              }}
              className="w-full"
            >
              <LineChart
                accessibilityLayer
                margin={{
                  left: 14,
                  right: 14,
                  top: 10
                }}
                data={[
                  { date: '2024-01-01', compras: 1234 },
                  { date: '2024-01-02', compras: 1532 },
                  { date: '2024-01-03', compras: 834 },
                  { date: '2024-01-04', compras: 1423 },
                  { date: '2024-01-05', compras: 1123 },
                  { date: '2024-01-06', compras: 1723 },
                  { date: '2024-01-07', compras: 1023 }
                ]}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      weekday: 'short'
                    })
                  }}
                />
                <Line
                  dataKey="compras"
                  type="natural"
                  fill="var(--color-compras)"
                  stroke="var(--color-compras)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    fill: 'var(--color-compras)',
                    stroke: 'var(--color-compras)',
                    r: 4
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                      }}
                    />
                  }
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid w-full lg:w-full gap-4 lg:grid-cols-2 xl:grid-cols-2">
        {/* Productos por Vencer */}
        <Card className="">
          <CardHeader>
            <CardTitle>Productos por Vencer</CardTitle>
            <CardDescription>
              Productos que vencerán pronto.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                24
                <span className="text-sm font-normal text-muted-foreground">
                  productos
                </span>
              </div>
              <ChartContainer
                config={{
                  productos: {
                    label: 'Productos',
                    color: 'hsl(var(--chart-1))'
                  }
                }}
                className="w-full"
              >
                <RadialBarChart
                  innerRadius="90%"
                  outerRadius="100%"
                  barSize={8}
                  data={[
                    { name: 'Día 1', productos: 5 },
                    { name: 'Día 2', productos: 3 },
                    { name: 'Día 3', productos: 6 },
                    { name: 'Día 4', productos: 2 },
                    { name: 'Día 5', productos: 8 }
                  ]}
                  startAngle={90}
                  endAngle={-270}
                  width={120}
                  height={120}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 10]}
                    tick={false}
                    axisLine={false}
                  />
                  <RadialBar
                    dataKey="productos"
                    cornerRadius={5}
                    fill="var(--color-productos)"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadialBarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Productos Vencidos */}
        <Card className="">
          <CardHeader>
            <CardTitle>Productos Vencidos</CardTitle>
            <CardDescription>
              Productos que ya han vencido.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                12
                <span className="text-sm font-normal text-muted-foreground">
                  productos
                </span>
              </div>
              <ChartContainer
                config={{
                  productos: {
                    label: 'Productos',
                    color: 'hsl(var(--chart-2))'
                  }
                }}
                className="w-full"
              >
                <RadialBarChart
                  innerRadius="90%"
                  outerRadius="100%"
                  barSize={8}
                  data={[
                    { name: 'Día 1', productos: 2 },
                    { name: 'Día 2', productos: 4 },
                    { name: 'Día 3', productos: 1 },
                    { name: 'Día 4', productos: 3 },
                    { name: 'Día 5', productos: 2 }
                  ]}
                  startAngle={90}
                  endAngle={-270}
                  width={120}
                  height={120}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 10]}
                    tick={false}
                    axisLine={false}
                  />
                  <RadialBar
                    dataKey="productos"
                    cornerRadius={5}
                    fill="var(--color-productos)"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadialBarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Productos Más Vendidos */}
        <Card className="">
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
            <CardDescription>
              Los productos más vendidos en los últimos 7 días.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                50
                <span className="text-sm font-normal text-muted-foreground">
                  productos
                </span>
              </div>
              <ChartContainer
                config={{
                  productos: {
                    label: 'Productos',
                    color: 'hsl(var(--chart-3))'
                  }
                }}
                className="w-full"
              >
                <BarChart
                  accessibilityLayer
                  margin={{
                    left: 14,
                    right: 14,
                    top: 10
                  }}
                  data={[
                    { name: 'Producto 1', productos: 15 },
                    { name: 'Producto 2', productos: 20 },
                    { name: 'Producto 3', productos: 5 },
                    { name: 'Producto 4', productos: 10 }
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity={0.5}
                  />
                  <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <Bar
                    dataKey="productos"
                    fill="var(--color-productos)"
                    radius={5}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
