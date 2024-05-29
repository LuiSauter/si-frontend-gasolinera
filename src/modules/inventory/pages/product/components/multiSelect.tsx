import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { type Group } from '@/modules/inventory/models/group.model'

interface MultiselectProps {
  value: string[]
  onChange: (e: any) => void
  groups: Group[]
}

function MultiSelect({ value, onChange, groups }: MultiselectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Group[]>(groups.filter((group) => value.includes(group.id)))
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    setSelected(groups.filter((group) => value.includes(group.id)))
  }, [value])

  const handleUnselect = React.useCallback((group: Group) => {
    setSelected((prev) => prev.filter((s) => s.id !== group.id))
  }, [])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          const newValue = [...value].slice(0, -1)
          onChange(newValue)
          setSelected((prev) => {
            const newSelected = [...prev]
            newSelected.pop()
            return newSelected
          })
        }
      }
      if (e.key === 'Escape') {
        input.blur()
      }
    }
  }, [value])

  const selectables = groups.filter(
    (group) => !selected.map((s) => s.id).includes(group.id)
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((group) => {
            return (
              <Badge key={group.id} variant="secondary">
                {group.name}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(group)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => { handleUnselect(group) }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => { setOpen(false) }}
            onFocus={() => { setOpen(true) }}
            placeholder="Seleccionar grupos..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0
            ? (
              <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in bg-light-bg-secondary dark:bg-dark-bg-primary my-2">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((group) => {
                    return (
                      <CommandItem
                        key={group.id}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onSelect={() => {
                          setInputValue('')
                          setSelected((prev) => [...prev, group])
                        }}
                        className={'cursor-pointer'}
                      >
                        {group.name}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </div>)
            : null}
        </CommandList>
      </div>
    </Command>
  )
}

export default MultiSelect
