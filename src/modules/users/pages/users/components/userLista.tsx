import * as React from 'react'
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
  , type ColumnDef
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Search, PlusCircleIcon, Trash, Pencil } from 'lucide-react'

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
import { CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '@/models/routes.model'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useDeleteUser, useGetAllUser } from '@/modules/users/hooks/useUser'
import { toast } from 'sonner'
import { type ApiBase } from '@/models'

export interface NewUser extends ApiBase {
  name: string
  ci: number
  email: string
  address: string
  phone: string
  gender: string
  isActive: boolean
  role: string
  branch: string
  password: string
}

export const columns: Array<ColumnDef<NewUser>> = [
  {
    accessorKey: 'id',
    header: () => {
      return <div className='pl-0 read-only'></div>
    },
    cell: ({ row }) => { console.log(row) }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className='pl-0'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('name')}</div>
    )
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      return <div>{row.getValue('role')}</div>
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'phone',
    header: () => <div>Telefono</div>,
    cell: ({ row }) => {
      const phone = parseFloat(row.getValue('phone'))
      return <div className="font-medium">{phone}</div>
    }
  },
  {
    accessorKey: 'id',
    header: '',
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = React.useState(false)
      const navigation = useNavigate()
      const { deleteUser } = useDeleteUser()
      const deletePermanentlyRole = () => {
        console.log(row.getValue('id'))
        toast.promise(deleteUser(row.getValue('id')), {
          loading: 'Cargando...',
          success: () => {
            setTimeout(() => {
              navigation(PrivateRoutes.USER, { replace: true })
            }, 1000)
            return 'Usuario eliminado exitosamente'
          },
          error: 'Puede que el usuario tenga permisos asignados, por lo que no se puede eliminar'
        })
        setIsDialogOpen(false)
      }
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
              navigation(`${PrivateRoutes.USER}/${String(row.getValue('id'))}`)
            }}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600">
              <AlertDialog isOpen={isDialogOpen} onDemiss={() => { setIsDialogOpen(false) }}>
                <AlertDialogTrigger asChild>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between'
                    }}
                    onClick={(event) => { event.stopPropagation() }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Estas seguro de eliminar este usuario?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Esto eliminará permanentemente tu
                      cuenta y eliminar sus datos de nuestros servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deletePermanentlyRole}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export function DataTableDemo() {
  const navigate = useNavigate()
  const { allUsers } = useGetAllUser() ?? { allUsers: [] }
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const newAllUsers = React.useMemo(() => allUsers?.map((user) => ({
    ...user,
    branch: user.branch.name,
    role: user.role.name
  })) ?? [], [allUsers])

  // console.log(newAllUsers)
  const table = useReactTable({
    data: newAllUsers ?? [],
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
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => (
              table.getColumn('name')?.setFilterValue(event.target.value)
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
              ? (table.getRowModel().rows.map((row) => (
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
                </TableRow>)))
              : (<TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>)}
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
