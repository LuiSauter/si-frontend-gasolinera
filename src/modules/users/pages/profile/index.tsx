import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon, Pencil } from 'lucide-react'

import { PrivateRoutes } from '@/models'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { useGetProvider } from '@/modules/buy/hooks/useProvider'

import { type RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function ProfilePage(): JSX.Element {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const { id } = useParams()
  const { provider } = useGetProvider(id)
  return (
    <Tabs defaultValue="all">
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center bg-muted/50">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
                    <Button
                      type="button"
                      onClick={() => { navigate(-1) }}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                      <span className="sr-only">Volver</span>
                    </Button>
                    <img
                    alt={provider?.name}
                    className="aspect-square rounded-full object-cover shrink-0 lg:h-28 lg:w-28"
                    src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                    height="70"
                    width="70"
                     />
                    <div>
                      <CardTitle className="text-3xl">
                        {user.name}
                      </CardTitle>
                      <CardDescription>{user.role.name}</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2 h-full">
                  <Button onClick={() => { navigate(PrivateRoutes.SETTINGS) }} size="sm" className="h-8 gap-1">
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Editar Usuario
                    </span>
                  </Button>
                </div>
              </CardHeader>
        </Card>
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-2 xl:grid-cols-2">
          <div className="flex flex-col gap-4 lg:gap-6">

            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-lg">
                    Información
                  </CardTitle>
                  <CardDescription>Información del usuario</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-4 px-4 lg:px-6 lg:pb-6 text-sm">
                <div className="grid gap-3">
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Ci
                      </span>
                      <span>{user?.ci}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Nombre
                      </span>
                      <span>{user?.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Teléfono</span>
                      <span>{user?.phone}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{user?.email}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Dirección</span>
                      <span>{user?.address}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Estado</span>
                      <span>{user?.isActive ? 'Activo' : 'Inactivo'}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6">

            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-lg">
                    Sucursal
                  </CardTitle>
                  <CardDescription>Información de la sucursal</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pb-4 px-4 lg:px-6 lg:pb-6 text-sm">
                <div className="grid gap-3">
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Nombre
                      </span>
                      <span>{user.branch.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Dirección
                      </span>
                      <span>{user.branch.address}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Email
                      </span>
                      <span>{user.branch.email}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Teléfono
                      </span>
                      <span>{user.branch.phone}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Estado
                      </span>
                      <span>{user.branch.is_suspended ? 'Activo' : 'Inactivo'}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid gap-4 lg:gap-6 lg:grid-cols-1 xl:grid-cols-1">
          <div className="flex flex-col gap-4 lg:gap-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Permisos</CardTitle>
                <CardDescription>Estos son todos los permisos que tiene {user.name}.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.role.permissions.map((permision) => (
                    <div
                      key={permision.id}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {permision.permission.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {permision.permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Tabs>
  )
}

export default ProfilePage
