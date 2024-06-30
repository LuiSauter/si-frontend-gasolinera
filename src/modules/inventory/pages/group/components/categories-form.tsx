import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { z } from 'zod'
import { type Dispatch, type SetStateAction } from 'react'
import { useCreateCategory, useUpdateCategory } from '@/modules/inventory/hooks/useCategory'
import { Textarea } from '@/components/ui/textarea'
import { type ApiResponse, type IFormProps } from '@/models'
import { type KeyedMutator } from 'swr'
import { AlertDialogCancel, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  image_url: z.string()
})

interface ICategoryForm extends IFormProps {
  setOpenModal?: Dispatch<SetStateAction<boolean>>
  mutate: KeyedMutator<ApiResponse>
}

const CategoriesForm = ({ buttonText, title, mutate, setOpenModal }: ICategoryForm) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { createCategory, isMutating } = useCreateCategory()
  const { updateCategory, isMutating: isMutatingUpdate } = useUpdateCategory()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: searchParams.get('nombre') ?? '',
      description: searchParams.get('descripcion') ?? '',
      image_url: searchParams.get('imagen') ?? ''
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.promise(
      searchParams.get('id') && searchParams.get('nombre') && searchParams.get('descripcion') && searchParams.get('imagen')
        ? updateCategory({ id: searchParams.get('id')!, name: data.name, description: data.description, image_url: data.image_url })
        : createCategory({ name: data.name, description: data.description, image_url: data.image_url }),
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
            searchParams.delete('imagen')
            setSearchParams(searchParams)
            setOpenModal?.(false)
          }, 500)
          return `Categoría ${searchParams.get('id') ? 'actualizada' : 'creada'} correctamente.`
        },
        error(error) {
          return error?.errorMessages[0] ?? 'Error al crear el categoría'
        }
      })
  }

  return (
    <>
      <section className="grid flex-1 items-start gap-4 lg:gap-6">
        <Form {...form}>
          <form onSubmit={() => { }} className="mx-auto w-full flex flex-col gap-4 lg:gap-6">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="flex flex-col gap-4 lg:gap-6" >
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
                <FormField
                  control={form.control}
                  name="description"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripcion</FormLabel>
                      <FormControl>
                        <Textarea placeholder="El usuario pordrá..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image_url"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url Imagen</FormLabel>
                    <FormControl>
                      <Input placeholder="categoria1.jpg..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter className="flex items-center justify-center gap-2">
              <AlertDialogCancel asChild>
                <Button type='button' variant="outline" size="sm" onClick={() => {
                  searchParams.delete('id')
                  searchParams.delete('nombre')
                  searchParams.delete('descripcion')
                  searchParams.delete('imagen')
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

export default CategoriesForm
