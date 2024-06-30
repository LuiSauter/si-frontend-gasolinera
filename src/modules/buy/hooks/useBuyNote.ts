import { type ResponseError } from '@/utils/response-error.utils'
import useSWRMutation from 'swr/mutation'
import { type BuyNote, type CreateBuy } from '../models/buy-note.model'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { createBuyNote, getAllBuyNote, getBuyNote } from '../services/buy-note.service'
import { type ApiResponse, type GetAllProps } from '@/models'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useEffect } from 'react'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { toast } from 'sonner'
import useSWR, { type KeyedMutator } from 'swr'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'

interface UseGetAllProps extends GetAllProps { }

const useCreateBuyNote = () => {
  const { error, isMutating, trigger } = useSWRMutation<Promise<void>, ResponseError, string, CreateBuy>(API_BASEURL + ENDPOINTS.BUY_NOTE, createBuyNote)
  return { createBuyNote: trigger, isMutating, error }
}

const useGetAllBuyNotes = ({ isGetAll }: UseGetAllProps) => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.BUY_NOTE, PERMISSION.BUY_NOTE_SHOW])) {
      mounted && toast.info('No tienes permisos para listar las compras, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.BUY_NOTE, PERMISSION.BUY_NOTE_SHOW])])

  if (!verifyPermission([PERMISSION.BUY_NOTE, PERMISSION.BUY_NOTE_SHOW])) {
    return {
      buyNotes: [],
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
  const fetchURL = `${API_BASEURL + ENDPOINTS.BUY_NOTE}?${query}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllBuyNote)

  return { buyNotes: data?.data as BuyNote[], countData: data?.countData, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useGetBuyNote = (id?: string) => {
  if (!id) return { buyNote: null, isLoading: false, error: undefined, isValidating: false }
  const { data, isLoading, error, isValidating, mutate } = useSWR<BuyNote, ResponseError>(API_BASEURL + ENDPOINTS.BUY_NOTE + `/${id}`, getBuyNote)

  return { buyNote: data ?? null, isLoading, error, isValidating, mutate }
}

export { useCreateBuyNote, useGetAllBuyNotes, useGetBuyNote }
