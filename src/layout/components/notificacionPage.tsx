import { type ComponentProps } from 'react'
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { AlertTriangle } from 'lucide-react'

export function NotificacionPage() {
  const bandera = true // mail.selected === item.id
  const bandera2 = true //! item.read
  // const text = "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in.\n\nI have a few minor suggestions that I'll include in the attached document.\n\nLet's discuss these during our next meeting. Keep up the excellent work!\n\nBest regards, Alice"
  //   const date2 = new Date(date)
  // const [mail, setMail] = useMail()
  return (
    <ScrollArea>
      <div className="flex flex-col gap-2 p-4 pt-0 hover:bg-accent" >
        {/* {items.map((item) => ( */}
        <button
        // border-neutral-200 bg-light-bg-primary dark:bg-dark-bg-secondary text-neutral-950 shadow-sm dark:border-neutral-800 dark:text-neutral-50
            key={45}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:dark:bg-dark-bg-secondary hover:bg-light-bg-primary',
              !bandera && 'bg-muted'
            )}
            onClick={() => !bandera
              // setMail({
              //   ...mail,
              //   selected: item.id
              // })

            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Stock Minimo</div>
                  { bandera && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    bandera
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {/* {formatDistanceToNow(new Date(date), {
                    addSuffix: true
                  })} */}
                12 jun 2024 12:00
                </div>
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              Coca Cola a llegado al stock mínimo
              {/* {text.substring(0, 300)} */}
            </div>
            <div className="text-xs font-medium">Stock Actual: 50</div>
            {/* {item.labels.length */}
            {bandera
              ? (
              <div className="flex items-center gap-2 w-full justify-between">
                {/* {item.labels.map((label) => ( */}
                  <Badge key={41} variant={getBadgeVariantFromLabel('work')}>
                    Importante
                  </Badge>
                  <AlertTriangle className="text-red-600" size={24} />
                {/* ))} */}
              </div>
                )
              : null}
          </button>
        {/* ))} */}
        <button
        // border-neutral-200 bg-light-bg-primary dark:bg-dark-bg-secondary text-neutral-950 shadow-sm dark:border-neutral-800 dark:text-neutral-50
            key={4566}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:dark:bg-dark-bg-secondary hover:bg-light-bg-primary',
              !bandera && 'bg-muted'
            )}
            onClick={() => !bandera
              // setMail({
              //   ...mail,
              //   selected: item.id
              // })

            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Stock Mínimo</div>
                  { bandera2 && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    bandera
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {/* {formatDistanceToNow(new Date(date), {
                    addSuffix: true
                  })} */}
                  30 jun 2024 0:39
                </div>
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              El combustible a llegado a su stock mínimo.
              {/* {text.substring(0, 300)} */}
            </div>
            <div className="text-xs font-medium">Stock Actual: 30</div>
            {/* {item.labels.length */}
            {bandera
              ? (
              <div className="flex items-center gap-2 w-full justify-between">
                {/* {item.labels.map((label) => ( */}
                  <Badge key={5541} variant={getBadgeVariantFromLabel('work')}>
                    importante
                  </Badge>
                  <AlertTriangle className="text-red-600" size={24} />
                {/* ))} */}
              </div>
                )
              : null}
          </button>
        {/* ))} */}<button
        // border-neutral-200 bg-light-bg-primary dark:bg-dark-bg-secondary text-neutral-950 shadow-sm dark:border-neutral-800 dark:text-neutral-50
            key={4555}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:dark:bg-dark-bg-secondary hover:bg-light-bg-primary',
              !bandera && 'bg-muted'
            )}
            onClick={() => !bandera
              // setMail({
              //   ...mail,
              //   selected: item.id
              // })

            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Stock Mínimo</div>
                  { bandera2 && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    bandera
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {/* {formatDistanceToNow(new Date(date), {
                    addSuffix: true
                  })} */}
                10 jul 2024 6:40
                </div>
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              Gasolina Premium esta en stock mínimo.
              {/* {text.substring(0, 300)} */}
            </div>
            <div className="text-xs font-medium">Stock Actual: 10</div>
            {/* {item.labels.length */}
            {bandera
              ? (
              <div className="flex items-center gap-2 w-full justify-between">
                  <Badge key={151} variant={getBadgeVariantFromLabel('work')}>
                    Importante
                  </Badge>
                  <AlertTriangle className="text-red-600" size={24} />
              </div>
                )
              : null}
          </button>
          <button
        // border-neutral-200 bg-light-bg-primary dark:bg-dark-bg-secondary text-neutral-950 shadow-sm dark:border-neutral-800 dark:text-neutral-50
            key={4515}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:dark:bg-dark-bg-secondary hover:bg-light-bg-primary',
              !bandera && 'bg-muted'
            )}
            onClick={() => !bandera
              // setMail({
              //   ...mail,
              //   selected: item.id
              // })

            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Stock Minimo</div>
                  { !bandera && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    bandera
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {/* {formatDistanceToNow(new Date(date), {
                    addSuffix: true
                  })} */}
                28 jun 2024 7:00
                </div>
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              Sprite a llegado al stock mínimo
              {/* {text.substring(0, 300)} */}
            </div>
            <div className="text-xs font-medium">Stock Actual: 15</div>
            {/* {item.labels.length */}
            {bandera
              ? (
              <div className="flex items-center gap-2 w-full justify-between">
                {/* {item.labels.map((label) => ( */}
                  <Badge key={41666} variant={getBadgeVariantFromLabel('personal')}>
                    Importante
                  </Badge>
                  <AlertTriangle className="text-red-600" size={24} />
                {/* ))} */}
              </div>
                )
              : null}
          </button>
        {/* ))} */}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default'
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline'
  }

  return 'secondary'
}
