import { type ChangeEvent, useState } from 'react'

import { Order, type FilterOptions } from '@/models'
import { generateQueryParams } from '@/utils'

export const filterStateDefault: FilterOptions = {
  offset: 0,
  limit: 5,
  order: Order.ASC
}

export const useFilterData = (filterState: FilterOptions) => {
  const [filterOptions, setFilterOptions] = useState(filterState)
  const queryParams = generateQueryParams(filterOptions)
  const search = (attr: string, value: string) => {
    const updatedFilterOptions = { ...filterStateDefault, attr, value }
    setFilterOptions(updatedFilterOptions)
  }

  const changeOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as Order
    setFilterOptions((prevFilterOptions) => ({ ...prevFilterOptions, order }))
  }

  const prevPage = () => {
    const newOffset = filterOptions.offset - filterOptions.limit
    if (newOffset >= 0) {
      setFilterOptions((prevFilterOptions) => ({ ...prevFilterOptions, offset: newOffset }))
    }
  }

  const newPage = (countData: number) => {
    const newOffset = filterOptions.offset + filterOptions.limit
    if (countData > newOffset) {
      setFilterOptions((prevFilterOptions) => ({ ...prevFilterOptions, offset: newOffset }))
    }
  }

  const setOffset = (offset: number) => {
    setFilterOptions((prevFilterOptions) => ({ ...prevFilterOptions, offset }))
  }

  return { queryParams, filterOptions, prevPage, newPage, setOffset, setFilterOptions, search, changeOrder }
}
