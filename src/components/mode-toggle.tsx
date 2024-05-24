import { MonitorIcon, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/context/themeContext'

export function ModeToggle() {
  const { toggleTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className='w-fit px-3'>
          {theme !== 'system' && (
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] dark:w-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />{theme === 'light' && <span className='pl-2'>Claro</span>}
              <Moon className="h-[1.2rem] w-0 dark:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />{theme === 'dark' && <span className='pl-2'>Oscuro</span>}
            </>
          )}
          {theme === 'system' && (
            <>
              <MonitorIcon className="h-[1.2rem] w-[1.2rem] dark:text-dark-text-primary text-light-text-primary shrink-0" />{theme === 'system' && <span className='pl-2'>Sistema</span>}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => { toggleTheme('light') }}>Claro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => { toggleTheme('dark') }}>Oscuro</DropdownMenuItem>
        <DropdownMenuItem onClick={() => { toggleTheme('system') }}>Sistema</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
