import useSWRMutation from 'swr/mutation'
import { type ApiResponse, type GetAllProps } from '@/models'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import useSWR, { type KeyedMutator } from 'swr'
import { type Output, type CreateOutput, type OuputUpdate } from '../models/output.model'
import { createOutput, deleteOutput, getAllOutputs, getOutput, updateOutput } from '../services/output.service'
interface UseGetAllProps extends GetAllProps {
}

const useCreateOutput = () => {
  const { error, isMutating, trigger } = useSWRMutation<Promise<void>, ResponseError, string, CreateOutput>(API_BASEURL + ENDPOINTS.OUTPUT, createOutput)
  return { createOutput: trigger, isMutating, error }
}

const useGetAllOutput = ({ isGetAll }: UseGetAllProps) => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.PRODUCT_OUTPUT, PERMISSION.PRODUCT_OUTPUT_SHOW])) {
      mounted && toast.info('No tienes permisos para listar las salidas de productos, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.PRODUCT_OUTPUT, PERMISSION.PRODUCT_OUTPUT_SHOW])])

  if (!verifyPermission([PERMISSION.PRODUCT_OUTPUT, PERMISSION.PRODUCT_OUTPUT_SHOW])) {
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
  const fetchURL = `${API_BASEURL + ENDPOINTS.OUTPUT}?${query}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllOutputs)

  return { ouputs: data?.data as Output[], countData: data?.countData, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useGetOutput = (id?: string) => {
  if (!id) return { output: null, isLoading: false, error: undefined, isValidating: false }
  const { data, isLoading, error, isValidating, mutate } = useSWR<Output, ResponseError>(API_BASEURL + ENDPOINTS.OUTPUT + `/${id}`, getOutput)

  return { output: data ?? null, isLoading, error, isValidating, mutate }
}

const useUpdateOutput = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, OuputUpdate>(API_BASEURL + ENDPOINTS.OUTPUT, updateOutput)
  return { updateOutput: trigger, isMutating, error }
}

const useDeleteOutput = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.OUTPUT, deleteOutput)
  return { deleteOutput: trigger, isMutating, error }
}

export { useCreateOutput, useGetAllOutput, useGetOutput, useUpdateOutput, useDeleteOutput }
