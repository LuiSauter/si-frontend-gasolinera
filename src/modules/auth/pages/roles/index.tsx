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

const RolesPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Usuarios', path: PrivateRoutes.USER },
    { label: 'Roles' }
  ])
  const navigate = useNavigate()
  const { allRoles, isLoading } = useGetAllRole()
  const { deleteRole } = useDeleteRole()
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
                    {/* empty */}
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
                          <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.ROLES}/${role.id}`) }}>Editar</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              void deleteRole(role.id)
                            }}
                          >
                            Eliminar
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
