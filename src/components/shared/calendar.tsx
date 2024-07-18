import { cn } from '@/lib/utils'
import { CheckCheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  placeholder: string
  setValue: (value: string) => void
  options: Array<{ value: string, label: string }>
  value: any
}

function SelectDate({ onOpenChange, open, options, placeholder, value, setValue }: Props) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type='button'
          className='flex items-center justify-between font-medium py-1.5 px-4 w-full text-sm text-light-text-primary bg-light-bg-secondary dark:bg-dark-bg-secondary border border-light-border rounded-md appearance-none dark:text-dark-text-primary dark:border-dark-border focus:outline-none focus:ring-0 focus:border-light-action dark:focus:border-dark-action placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary'
        >
          {options?.find(op => op?.value === value)?.label ?? placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-light-bg-secondary dark:bg-dark-bg-secondary w-fit">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList className='max-h-[280px] overflow-y-auto'>
            <CommandEmpty>No encontrado</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  value={option?.label}
                  key={option?.value}
                  onSelect={() => {
                    setValue(option?.value ?? '')
                    onOpenChange(false)
                  }}
                  className="hover:bg-light-action-hover dark:hover:bg-dark-border"
                >
                  <CheckCheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      option?.value === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option?.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectDate
