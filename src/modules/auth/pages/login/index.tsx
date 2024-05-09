import { FuelIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(1)
})
const LoginPage = (): JSX.Element => {
  const { status, signWithEmailPassword, isMutating, error } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: any) => {
    console.log(data)
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
            {/* write error */}
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
                <Button type="submit" className="w-full mt-4">
                  Iniciar sesión
                </Button>
              </form>
            </Form>
          </div>
          {/* <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required placeholder='********' />
            </div>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </div> */}
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
