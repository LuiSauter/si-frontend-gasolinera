import useSWRMutation from 'swr/mutation'
import useSWR, { type KeyedMutator } from 'swr'

import { API_BASEURL, ENDPOINTS } from '@/utils'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'

import { type ApiResponse, type GetAllProps } from '@/models'
import { type ResponseError } from '@/utils/response-error.utils'
import { type CreateBatch, type Batch } from '../models/batch.model'

import { createBatch, getAllBatchs } from '../services/batch.service'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'

interface UseGetAllBatchProps extends GetAllProps {
  productId?: string
}

const useGetAllBatchs = ({ isGetAll, productId }: UseGetAllBatchProps) => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.BATCH_SHOW, PERMISSION.BATCH])) {
      mounted && toast.info('No tienes permisos para listar los lotes del producto, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.BATCH_SHOW, PERMISSION.BATCH])])

  if (!verifyPermission([PERMISSION.BATCH_SHOW, PERMISSION.BATCH])) {
    return {
      batchs: [],
      error: undefined,
      isLoading: false,
      mutate: (() => { }) as KeyedMutator<ApiResponse>,
      isValidating: false,

      filterOptions: filterStateDefault,
      search: () => { },
      setFilterOptions: () => {},
      setOffset: () => { },
      changeOrder: () => { },
      newPage: () => { },
      prevPage: () => { }
    }
  }

  const { changeOrder, filterOptions, newPage, prevPage, queryParams, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)
  const query = isGetAll ? '' : queryParams
  const fetchURL = `${API_BASEURL + ENDPOINTS.BATCH}/${productId}?${query}`
  const { data, error, isLoading, mutate, isValidating } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllBatchs)
  return {
    batchs: data?.data as Batch[], countData: data?.countData ?? 0, error, isLoading, mutate, isValidating, search, setFilterOptions, setOffset, changeOrder, filterOptions, newPage, prevPage
  }
}

const useCreateBatch = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, CreateBatch>(API_BASEURL + ENDPOINTS.BATCH, createBatch)
  return { createBatch: trigger, error, isMutating }
}

export { useGetAllBatchs, useCreateBatch }
