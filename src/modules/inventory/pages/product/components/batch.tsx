import Pagination from '@/components/shared/pagination'
import Skeleton from '@/components/shared/skeleton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PrivateRoutes } from '@/models'
import { useGetAllBatchs } from '@/modules/inventory/hooks/useBatch'
import { type Batch } from '@/modules/inventory/models/batch.model'
import { ListFilterIcon, PlusCircleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BatchTableProps {
  productId: string
}

function BatchTable({ productId }: BatchTableProps) {
  const navigate = useNavigate()
  const { batchs, isLoading, filterOptions, newPage, prevPage, setOffset, countData } = useGetAllBatchs({ isGetAll: true, productId })
  return (
    <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
      <CardHeader>
        <CardTitle className='flex flex-row flex-wrap gap-2 justify-between'>
          <span>Lotes</span>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  {/* <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filtrar
                  </span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button> */}
            <Button onClick={() => { navigate(PrivateRoutes.PRODUCT_ADD) }} size="sm" className="h-8 gap-1">
              <PlusCircleIcon className="h-3.5 w-3.5" />
              {/* <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar
              </span> */}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='overflow-hidden relative w-full'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Detalle</TableHead>
                <TableHead >Stock</TableHead>
                <TableHead>Stock mínimo</TableHead>
                <TableHead>Fecha de exp.</TableHead>
                <TableHead><span className='sr-only'></span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? <Skeleton rows={5} columns={5} />
                : batchs?.map((batch: Batch) => (
                  <TableRow key={batch.id}>
                    <TableCell>{batch.code}</TableCell>
                    <TableCell className='whitespace-nowrap' title={batch.detail}>{batch.detail.length > 40 ? batch.detail.substring(0, 40) + '...' : batch.detail}</TableCell>
                    <TableCell>{batch.stock}</TableCell>
                    <TableCell>{batch.minimum_stock}</TableCell>
                    <TableCell>{batch.expiration_date}</TableCell>
                    <TableCell>
                      <Badge variant={batch.is_active ? 'default' : 'destructive'}>
                        {batch.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
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
          currentItems={batchs?.length ?? 0}
          limit={filterOptions.limit}
          newPage={() => { newPage(countData ?? 0) }}
          offset={filterOptions.offset}
          prevPage={prevPage}
          setOffset={setOffset}
          setLimit={() => { }}
        />
      </CardFooter>
    </Card>
  )
}

export default BatchTable
