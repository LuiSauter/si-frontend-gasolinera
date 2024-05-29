import { FuelIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Loading from '@/components/shared/loading'

const formSchema = z.object({
  email: z.string({ message: 'El correo electrónico es requerido' })
    .min(2, 'El correo electrónico debe tener al menos 2 caracteres')
    .max(50, 'El correo electrónico debe tener menos de 50 caracteres'),
  password: z.string().min(1, 'La contraseña es requerida')
})
const LoginPage = (): JSX.Element => {
  const { signWithEmailPassword, isMutating, error } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: any) => {
    void signWithEmailPassword({
      email: data.email,
      password: data.password
    })
  }

  return (
    <div className="w-full min-h-[100dvh] grid lg:min-h-[100dvh]">
      <div className="flex items-center justify-center py-12 z-10">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2"><FuelIcon width={30} height={30} /> Mi Gasolinera</h1>
            <p className="text-balance text-muted-foreground">
              Ingrese su correo electrónico a continuación para iniciar sesión en su cuenta
            </p>
          </div>
          <div className="grid gap-4">
            {error && <div className="text-red-500 text-center">{error}</div>}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <div className="grid gap-2">
                        <FormItem>
                          <FormLabel>Correo electronico</FormLabel>
                          <FormControl>
                            <Input id="email"
                              type="email"
                              placeholder="ejemplo@gmail.com"
                              required {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <div className="grid gap-2">
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input id="password" type="password" required placeholder='********' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    </>
                  )}
                />
                <Button type="submit" disabled={isMutating} className="w-full mt-4">
                  {isMutating ? <Loading /> : 'Iniciar sesión'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted md:flex w-full h-full items-end justify-end absolute right-0 top-0 bottom-0 z-0">
        <img
          src="/images/fuelstation.svg"
          alt="fuel station"
          className="h-[40%] w-fit object-contain dark:invert mb-16 z-0"
        />
      </div>
    </div >
  )
}

export default LoginPage
