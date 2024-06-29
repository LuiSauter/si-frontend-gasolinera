import { PrivateRoutes } from '@/models/routes.model'
import { MoreHorizontal, Pencil, PlusCircleIcon, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useNavigate } from 'react-router-dom'
import { useHeader } from '@/hooks'
import Loading from '@/components/shared/loading'
import { toast } from 'sonner'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { useDeleteGroup, useGetAllGroup } from '@/modules/inventory/hooks/useGroup'
import { type Group } from '@/modules/inventory/models/group.model'
import Pagination from '@/components/shared/pagination'
import GroupForm from './group-form'

function GroupsList() {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Inventario', path: PrivateRoutes.PRODUCT },
    { label: 'grupos' }
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()
  const { groups, isLoading, filterOptions, newPage, prevPage, setOffset, countData, mutate } = useGetAllGroup({ isGetAll: true })
  const { deleteGroup } = useDeleteGroup()

  const deletePermanentlyGroup = (id: string) => {
    toast.promise(deleteGroup(id), {
      loading: 'Cargando...',
      success: () => {
        return 'Grupo eliminado exitosamente'
      },
      error: 'Ocurrio un error al eliminar el grupo'
    })
    setIsDialogOpen(false)
  }

  const handleEdit = (params: string) => {
    navigate(params)
    setOpenModal(true)
  }

  return (
    <section className='grid gap-4 overflow-hidden w-full relative'>
      <Card x-chunk="dashboard-06-chunk-0" className='flex flex-col overflow-hidden w-full relative'>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            Grupos
            <AlertDialog open={openModal} onOpenChange={(open) => { setOpenModal(open) }}>
              <AlertDialogTrigger asChild>
                <Button type='button' size="sm" className="h-8 gap-1">
                  <PlusCircleIcon className="h-3.5 w-3.5" />
                  Agregar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <GroupForm buttonText='Crear' title='Crear grupo' setOpenModal={setOpenModal} mutate={mutate} />
              </AlertDialogContent>
            </AlertDialog>
          </CardTitle>
        </CardHeader>
        <CardContent className='overflow-hidden relative w-full'>
          <div className='overflow-x-auto'>
            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead><span className='sr-only'></span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups?.map((group: Group) => (
                  <TableRow key={group.id}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell className='hidden sm:table-cell'>{group?.description}</TableCell>
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
                          <DropdownMenuItem onClick={() => {
                            handleEdit(`?nombre=${group.name}&descripcion=${group.description}&id=${group.id}`)
                          }}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                  <AlertDialogTitle>Estas seguro de eliminar este grupo?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente tu
                                    cuenta y eliminar sus datos de nuestros servidores.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => { deletePermanentlyGroup(group.id) }}>Continue</AlertDialogAction>
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
          {groups?.length === 0 && <div>Grupos</div>}
          {isLoading && <div className='grid place-content-center place-items-center w-full shrink-0 pt-6'><Loading /></div>}
        </CardContent>
        <CardFooter className='w-full'>
          <Pagination
            allItems={countData ?? 0}
            currentItems={groups?.length ?? 0}
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

export default GroupsList
