import { PrivateRoutes } from '@/models/routes.model'
import { File, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'

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
  DropdownMenuItem,
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
import { useNavigate } from 'react-router-dom'
import { useDeleteRole, useGetAllRole } from '../../hooks/useRole'
import { type Role } from '../../models/role.model'
import { FormatDateMMMDYYYY } from '@/utils'
import { useHeader } from '@/hooks'
import Loading from '@/components/shared/loading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

const RolesPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Usuarios', path: PrivateRoutes.USER },
    { label: 'Roles' }
  ])
  const navigate = useNavigate()
  const { allRoles, isLoading } = useGetAllRole()
  const { deleteRole, error } = useDeleteRole()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const deletePermanently = (id: string) => {
    toast.promise(deleteRole(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.ROLES, { replace: true })
        }, 1000)
        return 'Rol eliminado exitosamente'
      },
      error: 'Ocurrio un error al eliminar el rol'
    })
    setIsDialogOpen(false)
  }

  let subscribe = true
  useEffect(() => {
    if (subscribe && error) {
      toast.error(error.errorMessages[0])
    }
    return () => {
      subscribe = false
    }
  }, [error])

  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
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
            <Button size="sm" className="h-8 gap-1" onClick={() => { navigate(PrivateRoutes.ROLE_FORM) }}>
              <PlusCircleIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Agregar rol
              </span>
            </Button>
          </div>
        </div>
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-6">
            <CardTitle>Roles</CardTitle>
            <CardDescription>
              Listado de los roles de los usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className='px-6 pb-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Fecha de creación</TableHead>
                  <TableHead>
                    <div className='sr-only'></div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allRoles?.length === 0 && <div>No hay roles</div>}
                {allRoles?.map((role: Role) => (
                  <TableRow key={role.id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{FormatDateMMMDYYYY(role.createdAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.ROLES}/${role.id}`) }}>
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => { setIsDialogOpen(false) }} className="text-red-600 hover:bg-danger/15 p-0">
                            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                              <AlertDialogTrigger asChild>
                                <div onClick={(e) => { e.stopPropagation() }} className='w-full h-full px-2 py-1.5'>Delete</div>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estas seguro de eliminar este rol?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esta acción <span className='text-warning'>eliminará permanentemente</span> el rol.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => { deletePermanently(role.id) }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {isLoading && <div className='grid place-content-center place-items-center w-full shrink-0 pt-6'><Loading /></div>}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default RolesPage
