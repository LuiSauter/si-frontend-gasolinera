import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { type Group } from '@/modules/inventory/models/product.model'

export function MultiSelect({ value, onChange, groups }: { value: string[], onChange: (e: any) => void, groups: Group[] }) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Group[]>([] as Group[])
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = React.useCallback((group: Group) => {
    setSelected(prev => prev.filter(s => s.id !== group.id))
    // onChange(prev.filter(s => s.value !== group.id).map(s => s.value))
  }, [])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected(prev => {
            const newSelected = [...prev]
            newSelected.pop()
            onChange(newSelected.map(s => s.id))
            return newSelected
          })
        }
      }
      if (e.key === 'Escape') {
        input.blur()
      }
    }
  }, [])

  const selectables = groups?.filter(group => !selected.includes(group))
  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 min-h-10 text-sm dark:ring-offset-dark-text-primary outline-none focus-within:ring-0 ring-0 rounded-md focus-within:ring-ring focus-within:ring-offset-2 bg-light-bg-secondary dark:bg-dark-bg-primary"
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((group) => {
            return (
              <Badge key={group.id} variant="secondary">
                {group.name}
                <button
                  className="ml-1 ring-offset-dark-text-primary rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(group)
                      onChange(value.filter(s => s !== group.id))
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => {
                    handleUnselect(group)
                    onChange(value.filter(s => s !== group.id))
                  }}
                  type="button"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => { setOpen(false) }}
            onFocus={() => { setOpen(true) }}
            placeholder="Select frameworks..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>

      <div className="relative">
        {open && selectables?.length > 0
          ? <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in bg-light-bg-secondary dark:bg-dark-bg-primary my-2">
            <CommandList>
              <CommandGroup className="h-full overflow-auto">
                {selectables?.map((group) => {
                  return (
                    <CommandItem
                      key={group.id}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      value={group.id}
                      onSelect={(valueId) => {
                        setInputValue('')
                        onChange([...value, valueId])
                        setSelected(prev => [...prev, group])
                      }}
                      className={'cursor-pointer'}
                    >
                      {group.name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </div>
          : null}
      </div>
    </Command>
  )
}
