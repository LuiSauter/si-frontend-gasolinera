import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { MoreHorizontal, Pencil, PlusCircleIcon, Trash } from 'lucide-react'

import { PrivateRoutes } from '@/models/routes.model'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useHeader } from '@/hooks'
import Loading from '@/components/shared/loading'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState } from 'react'
import Pagination from '@/components/shared/pagination'
import { type Category } from '@/modules/inventory/models/product.model'
import { useDeleteCategory, useGetAllCategorys } from '@/modules/inventory/hooks/useCategory'
import CategoriesForm from './categories-form'

const CategoryList = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Inventario', path: PrivateRoutes.PRODUCT },
    { label: 'Categorias' }
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()
  const { categorys, isLoading, countData, filterOptions, newPage, prevPage, setOffset, mutate } = useGetAllCategorys()
  const { deleteCategory } = useDeleteCategory()
  const deletePermanentlyCategory = (id: string) => {
    toast.promise(deleteCategory(id), {
      loading: 'Cargando...',
      success: () => {
        return 'Categoría eliminada exitosamente'
      },
      error(error) {
        return error.errorMessages[0] ?? 'Puede que la categoría tenga productos asignados, por lo que no se puede eliminar'
      }
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
            Categorias
            <AlertDialog open={openModal} onOpenChange={(open) => { setOpenModal(open) }}>
              <AlertDialogTrigger asChild>
                <Button type='button' size="sm" className="h-8 gap-1">
                  <PlusCircleIcon className="h-3.5 w-3.5" />
                  Agregar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <CategoriesForm buttonText='Crear' title='Crear categoria' setOpenModal={setOpenModal} mutate={mutate} />
              </AlertDialogContent>
            </AlertDialog>
          </CardTitle>
        </CardHeader>
        <CardContent className='overflow-hidden relative w-full'>
          <div className='overflow-x-auto'>
            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorys?.length === 0 && <div>No hay permisos</div>}
                {categorys?.map((category: Category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <img
                        src={category.image_url} alt={category.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category?.description}</TableCell>
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
                            handleEdit(`?nombre=${category.name}&descripcion=${category.description}&imagen=${category.image_url}&id=${category.id}`)
                          }}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem className="text-red-600" onClick={() => { setIsDialogOpen(false) }} >
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
                                  <AlertDialogTitle>¿Estas seguro de eliminar esta categoría?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer.
                                    Esto eliminará permanentemente la categoría.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => { deletePermanentlyCategory(category.id) }}>Continue</AlertDialogAction>
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
          </div>
        </CardContent>
        <CardFooter className='w-full'>
          <Pagination
            allItems={countData ?? 0}
            currentItems={categorys?.length ?? 0}
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

export default CategoryList
