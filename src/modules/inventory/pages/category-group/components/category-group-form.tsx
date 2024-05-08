import {
  PlusCircle,
  UploadIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const CategoryGroupPage = (): JSX.Element => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">Categoria</TabsTrigger>
            <TabsTrigger value="active">Grupo</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Guardar Categoria
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-[1fr_350px] lg:gap-8 h-fit">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Categoria</CardTitle>
                <CardDescription>
                  Información de la categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue="Gasolina Regular"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      defaultValue="Gasolina regular de 95 octanos"
                      className="min-h-20"
                    />
                  </div>
                  {/* <div className="grid gap-3">
                    <Label htmlFor="picture">Imagen</Label>
                    <Input id="picture" type="file" />
                  </div> */}
                </div>
              </CardContent>
            </Card>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Imagen de la categoria</CardTitle>
                  <CardDescription>
                    Agrega una imagen para la categoria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <img
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="200"
                      src="https://st3.depositphotos.com/13035518/16575/v/450/depositphotos_165751364-stock-illustration-fuel-pump-vector-isolated-gas.jpg"
                      width="200"
                    />
                    {/* <div className="grid grid-cols-4 gap-2">
                      <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                        <UploadIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default CategoryGroupPage
