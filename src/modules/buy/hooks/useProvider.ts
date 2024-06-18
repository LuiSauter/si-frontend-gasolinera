import useSWRMutation from 'swr/mutation'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import useSWR from 'swr'
import { type UpdateProvider, type CreateProvider, type Provider } from '../models/provider.model'
import { createProvider, deleteProvider, getAllProvider, getProvider, updateProvider } from '../services/provider.service'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import { type ApiResponse } from '@/models'

const useCreateProvider = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateProvider>(API_BASEURL + ENDPOINTS.PROVIDER, createProvider)
  return { createProvider: trigger, isMutating, error }
}

const useGetProvider = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Provider, ResponseError>(id ? API_BASEURL + ENDPOINTS.PROVIDER + `/${id}` : null, getProvider)
  return { provider: data, isLoading, error, isValidating }
}

const useGetAllProvider = () => {
  const { changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)
  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(API_BASEURL + ENDPOINTS.PROVIDER, getAllProvider)
  return { providers: data?.data, countData: data?.countData ?? 0, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useUpdateProvider = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, UpdateProvider>(API_BASEURL + ENDPOINTS.PROVIDER, updateProvider)
  return { updateProvider: trigger, isMutating, error }
}

const useDeleteProvider = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.PROVIDER, deleteProvider)
  return { deleteProvider: trigger, error, isMutating }
}

export { useCreateProvider, useGetAllProvider, useGetProvider, useUpdateProvider, useDeleteProvider }
