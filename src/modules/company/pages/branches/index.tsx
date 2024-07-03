import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ChevronLeftIcon, File, ListFilterIcon, MoreHorizontal, PlusCircleIcon } from 'lucide-react'
import { toast } from 'sonner'

import { PrivateRoutes } from '@/models/routes.model'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useHeader } from '@/hooks'
import { useGetAllBranches } from '../../hooks/useBranch'
import Loading from '@/components/shared/loading'

const BranchesPage = () => {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Empresa', path: PrivateRoutes.COMPANY },
    { label: 'Sucursales' }
  ])
  const navigate = useNavigate()
  const { branches, isLoading, error } = useGetAllBranches()

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
        <Button size="sm" className="h-8 gap-1" onClick={() => { navigate(PrivateRoutes.BRANCH_CREATE) }}>
          <PlusCircleIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar Sucursal
          </span>
        </Button>
      </div>
      <Card x-chunk="dashboard-05-chunk-3" className='flex flex-col overflow-hidden w-full relative'>
        <CardHeader className="px-7">
          <CardTitle>Sucursales</CardTitle>
        </CardHeader>
        <CardContent className='overflow-hidden relative w-full'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead><div className='sr-only'></div></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches?.length === 0 && <div>No hay sucursales</div>}
                {branches?.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.address}</TableCell>
                    <TableCell>{branch.email}</TableCell>
                    <TableCell>{branch.phone}</TableCell>
                    <TableCell>{branch.is_suspended ? 'Suspendido' : 'Activo'}</TableCell>
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
                          <DropdownMenuItem onClick={() => { }}>Editar</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => { }}>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {isLoading && <div className='grid place-content-center place-items-center w-full shrink-0 pt-6'><Loading /></div>}
        </CardContent>
      </Card>
    </section>
  )
}

export default BranchesPage
