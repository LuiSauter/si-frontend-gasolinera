import { PrivateRoutes } from '@/models/routes.model'
import { File, ListFilterIcon, MoreHorizontal, Pencil, PlusCircleIcon, Trash } from 'lucide-react'

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
import {
  Tabs,
  TabsContent
} from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import { type Category } from '../../models/category.model'
import { useHeader } from '@/hooks'
import Loading from '@/components/shared/loading'
import { useDeleteCategory, useGetAllCategorys } from '../../hooks/useCategory'
import { toast } from 'sonner'
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
import { useState } from 'react'

const CategoryPage = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Inventario', path: PrivateRoutes.USER },
    { label: 'Categorias' }
  ])
  const navigate = useNavigate()
  const { categorys, isLoading } = useGetAllCategorys()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { deleteCategory } = useDeleteCategory()
  const deletePermanentlyCategory = (id: string) => {
    toast.promise(deleteCategory(id), {
      loading: 'Cargando...',
      success: () => {
        setTimeout(() => {
          navigate(PrivateRoutes.CATEGORY, { replace: true })
        }, 1000)
        return 'Categoría eliminada exitosamente'
      },
      error: 'Ocurrio un error al eliminar la categoría'
    })
    setIsDialogOpen(false)
  }
  return (
    <section className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-6 lg:col-span-2">
        <Tabs defaultValue="week" className='grid gap-4'>
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
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Todos
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
              <Button size="sm" className="h-8 gap-1" onClick={() => { navigate(PrivateRoutes.CATEGORY_CREAR) }}>
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Agregar Categoria
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-6">
                <CardTitle>Categorias</CardTitle>
                <CardDescription>
                  Listado de los categorias disponibles
                </CardDescription>
              </CardHeader>
              <CardContent className=''>
                <Table >
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagen</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead className='hidden sm:table-cell'>Descripción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categorys?.length === 0 && <div>No hay permisos</div>}
                    {categorys?.map((category: Category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <img
                            src={category.image_url} alt=""
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell className='hidden sm:table-cell'>{category?.description}</TableCell>
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
                              <DropdownMenuItem onClick={() => { navigate(`${PrivateRoutes.CATEGORY}/${category.id}`) }}>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default CategoryPage
