import useSWRMutation from 'swr/mutation'
import { type ApiResponse, type GetAllProps } from '@/models'
import { type ResponseError } from '@/utils/response-error.utils'
import { type PurchaseOrder, type CreatePurchaseOrder } from '../models/purchase-order.model'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { createPurchaseOrder, deletePurchaseOrder, getAllPurchaseOrder, getPurchaseOrder, updatePurchaseOrder } from '../services/purchase-order.service'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import useSWR, { type KeyedMutator } from 'swr'
interface UseGetAllProps extends GetAllProps {
}

const useCreatePurchaseOrder = () => {
  const { error, isMutating, trigger } = useSWRMutation<Promise<void>, ResponseError, string, CreatePurchaseOrder>(API_BASEURL + ENDPOINTS.PURCHASE_ORDER, createPurchaseOrder)
  return { createPurchaseOrder: trigger, isMutating, error }
}

const useGetAllPurchaseOrders = ({ isGetAll }: UseGetAllProps) => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW])) {
      mounted && toast.info('No tienes permisos para listar las ordenes de compra, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW])])

  if (!verifyPermission([PERMISSION.PURCHASE_ORDER, PERMISSION.PURCHASE_ORDER_SHOW])) {
    return {
      PurchaseOrders: [],
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
  const fetchURL = `${API_BASEURL + ENDPOINTS.PURCHASE_ORDER}?${query}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllPurchaseOrder)

  return { purchaseOrders: data?.data as PurchaseOrder[], countData: data?.countData, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useGetPurchaseOrder = (id?: string) => {
  if (!id) return { PurchaseOrder: null, isLoading: false, error: null, isValidating: false }
  const { data, isLoading, error, isValidating, mutate } = useSWR<PurchaseOrder, ResponseError>(API_BASEURL + ENDPOINTS.PURCHASE_ORDER + `/${id}`, getPurchaseOrder)

  return { purchaseOrder: data ?? null, isLoading, error, isValidating, mutate }
}

const useUpdatePurchaseOrder = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreatePurchaseOrder>(API_BASEURL + ENDPOINTS.PURCHASE_ORDER, updatePurchaseOrder)
  return { updatePurchaseOrder: trigger, isMutating, error }
}

const useDeletePurchaseOrder = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.PURCHASE_ORDER, deletePurchaseOrder)
  return { deletePurchaseOrder: trigger, isMutating, error }
}

export { useCreatePurchaseOrder, useGetAllPurchaseOrders, useGetPurchaseOrder, useUpdatePurchaseOrder, useDeletePurchaseOrder }
