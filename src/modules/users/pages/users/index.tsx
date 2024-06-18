import { toast } from 'sonner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, File, ListFilter, MoreHorizontal, PlusCircle, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PrivateRoutes } from '@/models'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Skeleton from '@/components/shared/skeleton'
import Pagination from '@/components/shared/pagination'
import { useDeleteUser, useGetAllUser } from '../../hooks/useUser'
import { type User } from '../../models/user.model'
import { Badge } from '@/components/ui/badge'
import { useHeader } from '@/hooks'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const UserPage = (): JSX.Element => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Usuarios' }
  ])
  const navigate = useNavigate()
  const { allUsers, countData, isLoading, mutate, filterOptions, newPage, prevPage, setOffset } = useGetAllUser()
  const { deleteUser } = useDeleteUser()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const deletePermanentlyUser = (id: string) => {
    toast.promise(deleteUser(id), {
      loading: 'Cargando...',
      success: () => {
        void mutate()
        setTimeout(() => {
          navigate(PrivateRoutes.USER, { replace: true })
        }, 1000)
        return 'Usuario eliminado exitosamente'
      },
      error(error) {
        return error.errorMessages[0] ?? 'Puede que el usuario tenga permisos asignados, por lo que no se puede eliminar'
      }
    })
    setIsDialogOpen(false)
  }

  return (
    <section className='grid gap-4 overflow-hidden w-full relative'>
      <div className="inline-flex items-center flex-wrap gap-2">
        <Button
          type="button"
          onClick={() => { navigate(-1) }}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Volver</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='ml-auto'>
            <Button variant="outline" size="sm" className="h-8 gap-1"><ListFilter className="h-3.5 w-3.5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-8 gap-1"><File className="h-3.5 w-3.5" /></Button>
        <Button onClick={() => { navigate(PrivateRoutes.USER_CREAR) }} size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only lg:not-sr-only sm:whitespace-nowrap">Agregar</span>
        </Button>
      </div>
      <Card x-chunk="dashboard-06-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
        <CardHeader>
          <CardTitle>Todos los Usuarios</CardTitle>
        </CardHeader>
        <CardContent className='overflow-hidden relative w-full'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Sucursal</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead><span className='sr-only'>Opciones</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? <Skeleton rows={filterOptions.limit} columns={8} />
                  : allUsers?.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role.name}</TableCell>
                      <TableCell>{user.branch ? user.branch.name : '-'}</TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? 'default' : 'outline'}>
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu onOpenChange={() => { setIsDialogOpen(false) }}>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.USER}/${user.id}`) }}>Editar</DropdownMenuItem>
                            <DropdownMenuItem className='p-0'>
                              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <AlertDialogTrigger asChild className='w-full px-2 py-1.5'>
                                  <div
                                    onClick={(event) => { event.stopPropagation() }}
                                    className={`${user.isActive ? 'text-danger' : ''} flex items-center`}
                                  >
                                    {user.isActive
                                      ? <><Trash className="mr-2 h-4 w-4" />Eliminar</>
                                      : 'Activar'}
                                  </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>{user.isActive ? 'Eliminar usuario' : 'Activar usuario'}</AlertDialogTitle>
                                  </AlertDialogHeader>
                                  {user.isActive
                                    ? <>
                                      <AlertDialogDescription>Esta acción eliminará el usuario, no se puede deshacer.</AlertDialogDescription>
                                      <AlertDialogDescription>¿Estás seguro que deseas continuar?</AlertDialogDescription>
                                    </>
                                    : <AlertDialogDescription>
                                      Para activar el usuario deberá contactarse con un administrador del sistema.
                                    </AlertDialogDescription>
                                  }
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className='h-fit'>Cancelar</AlertDialogCancel>
                                    {user.isActive &&
                                      <AlertDialogAction className='h-full' onClick={() => { deletePermanentlyUser(user.id) }}>
                                        Continuar
                                      </AlertDialogAction>}
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
          </div>
        </CardContent>
        <CardFooter className='w-full'>
          <Pagination
            allItems={countData ?? 0}
            currentItems={allUsers?.length ?? 0}
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
    </section>
  )
}

export default UserPage
