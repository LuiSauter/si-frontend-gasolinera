import useSWR, { type KeyedMutator } from 'swr'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import useSWRMutation from 'swr/mutation'
import { type UpdateDiscount, type CreateDiscount, type Discount, type DiscountAll } from '../models/discount.model'
import { createDiscount, deleteDiscount, getAllDiscount, getDiscount, updateDiscount } from '../services/discount.service'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { type ApiResponse, type GetAllProps } from '@/models'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
interface UseGetAllProps extends GetAllProps {
}
// const useGetAllDiscounts = () => {
//   const { data, isLoading, error, mutate } = useSWR<Discount[], ResponseError>(API_BASEURL + ENDPOINTS.DISCOUNT_ALL, getAllDiscount)

//   return { discounts: data, isLoading, error, mutate }
// }
const useGetAllDiscounts = ({ isGetAll }: UseGetAllProps) => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.DISCOUNT, PERMISSION.DISCOUNT_SHOW])) {
      mounted && toast.info('No tienes permisos para listar los descuentos, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.DISCOUNT, PERMISSION.DISCOUNT_SHOW])])

  if (!verifyPermission([PERMISSION.DISCOUNT, PERMISSION.DISCOUNT_SHOW])) {
    return {
      Discounts: [],
      error: undefined,
      isLoading: false,
      mutate: (() => { }) as KeyedMutator<ApiResponse>,
      isValidating: false,

      filterOptions: filterStateDefault,
      search: () => { },
      setFilterOptions: () => { },
      setOffset: () => { },
      changeOrder: () => { },
      newPage: () => { },
      prevPage: () => { }
    }
  }
  const { changeOrder, filterOptions, newPage, prevPage, queryParams, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)

  const query = isGetAll ? '' : queryParams
  const fetchURL = `${API_BASEURL + ENDPOINTS.DISCOUNT_ALL}?${query}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllDiscount)

  return { discounts: data?.data as DiscountAll[], countData: data?.countData, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useCreateDiscount = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateDiscount>(API_BASEURL + ENDPOINTS.DISCOUNT, createDiscount)
  return { createDiscount: trigger, isMutating, error }
}

const useGetDiscount = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Discount, ResponseError>(id ? API_BASEURL + ENDPOINTS.DISCOUNT_ONE + `/${id}` : null, getDiscount)
  return { discount: data, isLoading, error, isValidating }
}

const useUpdateDiscount = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, UpdateDiscount>(API_BASEURL + ENDPOINTS.DISCOUNT, updateDiscount)
  return { updateDiscount: trigger, isMutating, error }
}

const useDeleteDiscount = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.DISCOUNT, deleteDiscount)
  return { deleteDiscount: trigger, error, isMutating }
}

export { useGetAllDiscounts, useCreateDiscount, useGetDiscount, useUpdateDiscount, useDeleteDiscount }
