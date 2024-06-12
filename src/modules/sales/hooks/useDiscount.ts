import useSWR from 'swr'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import useSWRMutation from 'swr/mutation'
import { type UpdateDiscount, type CreateDiscount, type Discount } from '../models/discount.model'
import { createDiscount, deleteDiscount, getAllDiscount, getDiscount, updateDiscount } from '../services/discount.service'

const useGetAllDiscounts = () => {
  const { data, isLoading, error, mutate } = useSWR<Discount[], ResponseError>(API_BASEURL + ENDPOINTS.DISCOUNT_ALL, getAllDiscount)

  return { discounts: data, isLoading, error, mutate }
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
