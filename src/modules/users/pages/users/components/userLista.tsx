import * as React from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Search, PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CardHeader, CardDescription, CardTitle, Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '@/models/routes.model'

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    nro: 1,
    telefono: 71890091,
    Nombre: 'Kenia Suarez',
    email: 'ken99@yahoo.com'
  },
  {
    id: '3u1reuv4',
    nro: 2,
    telefono: 71890091,
    Nombre: 'Abel Rodas',
    email: 'Abe45@gmail.com'
  },
  {
    id: 'derv1ws0',
    nro: 3,
    telefono: 71890605,
    Nombre: 'Monserrat',
    email: 'Monserrat44@gmail.com'
  },
  {
    id: '5kma53ae',
    nro: 4,
    telefono: 7189251,
    Nombre: 'Silas',
    email: 'Silas22@gmail.com'
  },
  {
    id: 'bhqecj4p',
    nro: 5,
    telefono: 71890091,
    Nombre: 'Carmenlla',
    email: 'carmella@hotmail.com'
  }
]

export interface Payment {
  id: string
  nro: number
  telefono: number
  Nombre: string
  email: string
}
export const columns: Array<ColumnDef<Payment>> = [
  {
    accessorKey: 'nro',
    header: () => <div>Nro</div>,
    cell: ({ row }) => {
      const nro = parseFloat(row.getValue('nro'))
      return <div className="font-medium">{nro}</div>
    }
  },
  {
    accessorKey: 'Nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('Nombre')}</div>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'telefono',
    header: () => <div>Telefono</div>,
    cell: ({ row }) => {
      const telefono = parseFloat(row.getValue('telefono'))
      return <div className="font-medium">{telefono}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const navigation = useNavigate()
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className='font-bold'>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {
              navigation(`${PrivateRoutes.USER}/afcad51415`)
            }}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export function DataTableDemo() {
  const navigate = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="w-full">
      <CardHeader className="p-0">
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>
          Listado de todos los usuarios
        </CardDescription>
      </CardHeader>
      <div className="flex items-center py-4 justify-between">
        <div className="relative max-w-sm">
          <Input
            placeholder="Buscar usuarios..."
            value={(table.getColumn('Nombre')?.getFilterValue() as string) ?? ''}
            onChange={(event) => (
              table.getColumn('Nombre')?.setFilterValue(event.target.value)
            )}
            className="pl-10 pr-4" // Añade un padding a la izquierda para dar espacio al icono
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircleIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap"
            onClick={() => { navigate(PrivateRoutes.USER_CREAR) }}>
            Agregar Usuario
          </span>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
              : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { table.previousPage() }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { table.nextPage() }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
