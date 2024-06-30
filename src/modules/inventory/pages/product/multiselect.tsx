import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { PlusCircleIcon, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { type Group } from '@/modules/inventory/models/group.model'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import GroupForm from '../group/components/group-form'
import { type KeyedMutator } from 'swr'
import { type ApiResponse } from '@/models'
import { Button } from '@/components/ui/button'

interface MultiselectProps {
  value: string[]
  onChange: (value: string[]) => void
  groups: Group[]
  mutate: KeyedMutator<ApiResponse>
}

function MultiSelect({ value, onChange, groups, mutate }: MultiselectProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Group[]>(groups.filter((group) => value.includes(group.id)))
  const [inputValue, setInputValue] = useState('')
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    setSelected(groups.filter((group) => value.includes(group.id)))
  }, [value])

  const handleUnselect = useCallback((group: Group) => {
    const newValue = selected.filter((s) => s.id !== group.id).map(g => g.id)
    onChange(newValue)
    setSelected((prev) => prev.filter((s) => s.id !== group.id))
  }, [selected])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
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
      <div className="group rounded-md border border-input px-0 py-0 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 flex flex-wrap items-center">
        <div className="py-2 space-y-1">
          {selected.map((group) => {
            return (
              <Badge key={group.id} variant="secondary" className='h-fit ml-2'>
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
        </div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => { setOpen(false) }}
          onFocus={() => { setOpen(true) }}
          placeholder="Seleccionar grupos..."
          className="flex outline-none placeholder:text-muted-foreground h-10"
        />
        <AlertDialog open={openModal} onOpenChange={(open) => { setOpenModal(open) }}>
          <AlertDialogTrigger asChild>
            <Button className="gap-1 flex items-center ml-auto mr-1 h-8 w-8" size='icon' variant='ghost'>
              <PlusCircleIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <GroupForm buttonText='Crear' title='Crear grupo' setOpenModal={setOpenModal} mutate={mutate} />
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0
            ? (
              <>
                <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in bg-light-bg-secondary dark:bg-dark-bg-primary my-2">
                  <CommandEmpty>Grupo no encontrado</CommandEmpty>
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
                            onChange([...selected.map(g => g.id), group.id])
                            setSelected((prev) => [...prev, group])
                          }}
                          className={'cursor-pointer'}
                        >
                          {group.name}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                </div>
              </>)
            : null}
        </CommandList>
      </div>
    </Command>
  )
}

export default MultiSelect
