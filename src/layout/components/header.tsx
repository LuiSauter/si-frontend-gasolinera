import { CircleUser, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Navigation from './navigation'
import { useAuth, useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models'

const Header = () => {
  const { breadcrumb } = useHeader()
  const { signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 dark:bg-dark-bg-secondary bg-light-bg-primary">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col px-0 py-0 gap-0">
          <SheetHeader>
            <div className="flex items-center gap-3 px-4 border-b py-3 h-14">
              <h1>Mi Gasolinera</h1>
            </div>
          </SheetHeader>
          {/* <div className='h-full'> */}
          <Navigation />
          {/* </div> */}
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((item, index) => (
              item.path
                ? (<div className='flex items-center sm:gap-2' key={index}>
                  <BreadcrumbItem>

                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>)
                : <BreadcrumbItem key={index}><BreadcrumbPage>{item.label}</BreadcrumbPage></BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>Perfil</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { navigate(PrivateRoutes.SETTINGS) }} className='cursor-pointer'>Configuración</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className='cursor-pointer'>Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
