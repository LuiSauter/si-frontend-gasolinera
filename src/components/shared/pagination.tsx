import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface IPagination {
  offset: number
  limit: number
  allItems: number
  currentItems?: number
  setOffset: (offset: number) => void
  setLimit?: (limit: number) => void
  newPage: () => void
  prevPage: () => void
  params?: boolean
}

const Pagination = ({ allItems, currentItems = 0, limit, offset, newPage, prevPage, setOffset, params = true }: IPagination) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    params && searchParams.get('page') && setOffset((Number(searchParams.get('page')) - 1) * limit)
  }, [searchParams.get('page')])

  return (
    <nav className="flex w-full gap-2 items-center flex-column flex-wrap md:flex-row justify-between" aria-label="Table navigation">
      <span
        className="text-sm font-normal text-light-text-secondary dark:text-dark-text-secondary mb-4 md:mb-0 block w-full md:inline md:w-auto"
      >
        Mostrando <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">{offset + 1}-{(offset + currentItems) ?? limit}</span> de <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">{allItems}</span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8  rounded-md overflow-hidden border ">
        <li>
          <button type='button' onClick={prevPage} className="flex items-center justify-center px-3 h-8 leading-tight text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-border dark:hover:bg-dark-border hover:text-light-text-primary dark:hover:text-dark-text-primary border-r">Anterior</button>
        </li>
        {Array.from(new Array(Math.ceil(allItems / limit)).keys()).slice(0, 21).map((item: number) => (
          <li key={item}>
            <button
              onClick={() => {
                setOffset(item * limit)
                params && navigate(`?page=${item + 1}`)
              }}
              type='button'
              className={`${offset / limit === item
                ? 'text-light-text-primary dark:text-dark-text-primary bg-light-border dark:bg-dark-border'
                : 'text-light-text-secondary dark:text-dark-text-secondary'}
              flex items-center justify-center px-3 h-8 leading-tight hover:bg-light-border dark:hover:bg-dark-border hover:text-light-text-primary dark:hover:text-dark-text-primary border-x`}
            >
              {item + 1}
            </button>
          </li>
        ))}
        {Array.from(new Array(Math.ceil(allItems / limit)).keys()).length > 21 && (
          <li>
            <button
              disabled={true}
              onClick={() => { }}
              type='button'
              className='text-light-text-secondary dark:text-dark-text-secondary flex items-center justify-center px-3 h-8 leading-tight hover:bg-border dark:hover:bg-dark-border hover:text-light-text-primary dark:hover:text-dark-text-primary border-x'
            >
              ...
            </button>
          </li>
        )}
        <li>
          <button type='button' onClick={newPage} className="flex items-center justify-center px-3 h-8 leading-tight text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-border dark:hover:bg-dark-border hover:text-light-text-primary dark:hover:text-dark-text-primary">Siguiente</button>
        </li>
      </ul>
    </nav >
  )
}

export default Pagination
