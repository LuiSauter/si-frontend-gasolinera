import {
  Bell
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { NotificacionPage } from './notificacionPage'
import { useEffect, useState } from 'react'

export function Notificaciones() {
  const [isClicked, setIsClicked] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      setIsClicked(true)
    } else {
      setIsClicked(false)
    }
  }, [menuOpen])

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full relative inline-flex items-center justify-center p-2 active:scale-95 transition-transform duration-75 ease-in-out"
        >
          <Bell className={`h-5 w-5 ${isClicked ? 'dark:text-dark-text-primary dark:fill-dark-text-primary text-light-text-primary fill-light-text-primary' : ''}`} />
          <span
            className="absolute top-0 right-0 flex items-center justify-center bg-red-600 text-white text-xs rounded-full"
            style={{ width: '15px', height: '15px', transform: 'translate(50%, -50%)' }}
          >
            3
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 bg-light-bg-secondary max-h-[30rem] overflow-y-auto">
        <DropdownMenuLabel className="text-2xl font-bold">Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NotificacionPage />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
