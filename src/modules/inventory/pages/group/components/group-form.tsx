import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'
import { type Dispatch, type SetStateAction } from 'react'
import { useCreateGroup, useUpdateGroup } from '@/modules/inventory/hooks/useGroup'
import { Textarea } from '@/components/ui/textarea'
import { type ApiResponse, type IFormProps } from '@/models'
import { type KeyedMutator } from 'swr'
import { AlertDialogFooter, AlertDialogCancel, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50)
})

interface IGroupForm extends IFormProps {
  setOpenModal?: Dispatch<SetStateAction<boolean>>
  mutate: KeyedMutator<ApiResponse>
}

const GroupForm = ({ buttonText, title, mutate, setOpenModal }: IGroupForm) => {
  const { createGroup, isMutating } = useCreateGroup()
  const { updateGroup, isMutating: isMutatingUpdate } = useUpdateGroup()
  const [searchParams, setSearchParams] = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: searchParams.get('nombre') ?? '',
      description: searchParams.get('descripcion') ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.promise(
      searchParams.get('id') && searchParams.get('nombre') && searchParams.get('descripcion')
        ? updateGroup({ id: searchParams.get('id')!, name: data.name, description: data.description })
        : createGroup({ name: data.name, description: data.description }),
      {
        loading: 'Cargando...',
        success: () => {
          if (mutate) {
            void mutate()
          }
          setTimeout(() => {
            searchParams.delete('id')
            searchParams.delete('nombre')
            searchParams.delete('descripcion')
            setSearchParams(searchParams)
            setOpenModal && setOpenModal(false)
          }, 500)
          return `Grupo ${searchParams.get('id') ? 'actualizado' : 'creado'} exitosamente.`
        },
        error(error) {
          return error?.errorMessages[0] ?? 'Error al crear el grupo'
        }
      })
  }

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={() => { }} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-4 lg:gap-6 justify-center" >
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
              </AlertDialogHeader>
              <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tienda..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4 lg:gap-6 lg:grid-cols-1">
                <FormField
                  control={form.control}
                  name="description"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Taller mec..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <AlertDialogFooter className="flex items-center justify-center gap-2">
              <AlertDialogCancel asChild>
                <Button type='button' variant="outline" size="sm" onClick={() => {
                  searchParams.delete('id')
                  searchParams.delete('nombre')
                  searchParams.delete('descripcion')
                  setSearchParams(searchParams)
                }}>
                  Cancelar
                </Button>
              </AlertDialogCancel>
              <Button
                type='button'
                size="sm"
                disabled={isMutating || isMutatingUpdate}
                onClick={form.handleSubmit(onSubmit)}
              > {searchParams.get('id') ? 'Actualizar' : buttonText}</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </section>
    </>
  )
}

export default GroupForm
