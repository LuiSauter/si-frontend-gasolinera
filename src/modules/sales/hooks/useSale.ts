import { useAuthorization } from '@/hooks/useAuthorization'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import { type ApiResponse } from '@/models'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useSWR, { type KeyedMutator } from 'swr'
import { createSaleNote, deleteSaleNote, getOneCustomer, getOneSaleNote, getSalesNotes } from '../services/sale.service'
import { type ResponseError } from '@/utils/response-error.utils'
import { type Customer, type CreateSale, type Sale } from '../models/sale.model'
import useSWRMutation from 'swr/mutation'

const useGetAllSales = () => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.SALE_NOTE])) {
      mounted && toast.info('No tienes permisos para listar las notas de ventas, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.SALE_NOTE])])

  if (!verifyPermission([PERMISSION.SALE_NOTE])) {
    return {
      sales: [],
      countData: 0,
      error: undefined,
      isLoading: false,
      mutate: (() => { }) as KeyedMutator<ApiResponse>,
      search: () => { },
      newPage: () => { },
      prevPage: () => { },
      setOffset: () => { },
      setFilterOptions: () => { },
      filterOptions: filterStateDefault,
      nextPage: () => { }
    }
  }

  const { filterOptions, search, newPage, prevPage, setOffset, setFilterOptions, queryParams } = useFilterData(filterStateDefault)

  const fetchURL = `${API_BASEURL + ENDPOINTS.SALES}?${queryParams}`

  const { data, isLoading, error, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getSalesNotes)

  return { sales: data?.data as Sale[] ?? [], countData: data?.countData ?? 0, isLoading, error, filterOptions, newPage, prevPage, setOffset, setFilterOptions, search, mutate }
}

const useCreateSale = () => {
  const fetchURL = `${API_BASEURL + ENDPOINTS.SALES}`
  const { trigger, isMutating, error, data } = useSWRMutation<Promise<void>, ResponseError, string, CreateSale>(fetchURL, createSaleNote)
  return { createSale: trigger, isMutating, error, data }
}

const useGetOneSale = (id: string) => {
  if (!id) return { sale: undefined, isLoading: false, error: undefined, mutate: (() => { }) as KeyedMutator<Sale> }
  const fetchURL = `${API_BASEURL + ENDPOINTS.SALES}/${id}`

  const { data, isLoading, error, mutate } = useSWR<Sale, ResponseError>(fetchURL, getOneSaleNote)
  return { sale: data, isLoading, error, mutate }
}

const useGetCustomerMutation = () => {
  const fetchURL = `${API_BASEURL + ENDPOINTS.SALES}/customer`
  const { trigger, error, isMutating, data } = useSWRMutation<Customer, ResponseError, string, string>(fetchURL, getOneCustomer)
  return { getCustomerMutation: trigger, error, isMutating, customer: data! ?? {} as Customer }
}

const useDeleteSale = () => {
  const fetchURL = `${API_BASEURL + ENDPOINTS.SALES}`
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, { id: string }>(fetchURL, deleteSaleNote)
  return { deleteSale: trigger, isMutating, error }
}

export { useGetAllSales, useCreateSale, useGetOneSale, useDeleteSale, useGetCustomerMutation }
