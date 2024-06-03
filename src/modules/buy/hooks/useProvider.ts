import useSWRMutation from 'swr/mutation'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import useSWR from 'swr'
import { createProvider, deleteProvider, getAllProvider, getProvider, updateProvider } from '../services/provider.service'
import { type UpdateProvider, type CreateProvider, type Provider } from '../models/provider.model'

const useCreateProvider = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateProvider>(API_BASEURL + ENDPOINTS.PROVIDER, createProvider)
  return { createProvider: trigger, isMutating, error }
}

const useGetProvider = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Provider, ResponseError>(id ? API_BASEURL + ENDPOINTS.PROVIDER + `/${id}` : null, getProvider)
  return { provider: data, isLoading, error, isValidating }
}

const useGetAllProvider = () => {
  const { data, error, isLoading } = useSWR<Provider[], ResponseError>(API_BASEURL + ENDPOINTS.PROVIDER, getAllProvider)
  return { providers: data, error, isLoading }
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
