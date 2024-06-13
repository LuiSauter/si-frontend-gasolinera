import { type ResponseError } from '@/utils/response-error.utils'
import useSWR, { type KeyedMutator } from 'swr'
import useSWRMutation from 'swr/mutation'
import { type Tank, type CreateTank } from '../models/tank.model'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { createTank, deleteTank, getAllTanks, getTank, updateTank } from '../services/tank.service'
import { type GetAllProps, type ApiResponse } from '@/models'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useEffect } from 'react'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { toast } from 'sonner'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'

interface UseGetAllBatchProps extends GetAllProps {
  productId?: string
}

const useCreateTank = () => {
  const { error, isMutating, trigger } = useSWRMutation<Promise<void>, ResponseError, string, CreateTank>(API_BASEURL + ENDPOINTS.TANK, createTank)
  return { createTank: trigger, isMutating, error }
}

const useGetAllTanksByProduct = ({ isGetAll, productId }: UseGetAllBatchProps) => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.TANK, PERMISSION.TANK_SHOW])) {
      mounted && toast.info('No tienes permisos para listar los tanques, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.TANK, PERMISSION.TANK_SHOW])])

  if (!verifyPermission([PERMISSION.TANK, PERMISSION.TANK_SHOW])) {
    return {
      tanks: [],
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
  const fetchURL = `${API_BASEURL + ENDPOINTS.TANK}/product/${productId}?${query}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllTanks)

  return { tanks: data?.data as Tank[], countData: data?.countData, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useGetTank = (id?: string) => {
  if (!id) return { Tank: null, isLoading: false, error: null, isValidating: false }
  const { data, isLoading, error, isValidating, mutate } = useSWR<Tank, ResponseError>(API_BASEURL + ENDPOINTS.TANK + `/${id}`, getTank)

  return { Tank: data ?? null, isLoading, error, isValidating, mutate }
}

const useUpdateTank = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateTank>(API_BASEURL + ENDPOINTS.TANK, updateTank)
  return { updateTank: trigger, isMutating, error }
}

const useDeleteTank = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.TANK, deleteTank)
  return { deleteTank: trigger, isMutating, error }
}

export { useCreateTank, useGetAllTanksByProduct, useGetTank, useUpdateTank, useDeleteTank }
