import { TableCell, TableRow } from '../ui/table'

interface SkeletonProps {
  rows?: number
  columns?: number
}

function Skeleton({ columns, rows }: SkeletonProps) {
  return Array.from(new Array(rows).keys()).map((item: number) => (
    <TableRow key={item} data-testid='skeleton' className="animate-pulse h-[52px] last:border-none">
      {Array.from(new Array(columns).keys()).map((item: number) => (
        <TableCell key={item} className="px-6 py-4 h-full">
          <div className="h-2 bg-light-text-secondary dark:bg-dark-text-secondary rounded-full" />
        </TableCell>
      ))}
    </TableRow>))
}

export default Skeleton
