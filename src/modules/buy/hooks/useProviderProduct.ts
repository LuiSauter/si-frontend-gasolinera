// import useSWRMutation from 'swr/mutation'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import useSWR from 'swr'
import { createProviderProduct, deleteProviderProduct, getAllProductProvider, getProviderProduct, updateProviderProduct } from '../services/providerProduct.service'
import { type UpdateProviderProduct, type CreateProviderProduct, type ProviderProduct } from '../models/providerProduct.model'
import useSWRMutation from 'swr/mutation'
import { useMemo } from 'react'

// const useGetProduct = (id?: string) => {
//   if (!id) return { product: null, isLoading: false, error: null, isValidating: false }
//   const { data, isLoading, error, isValidating } = useSWR<Product, ResponseError>(API_BASEURL + ENDPOINTS.PRODUCT + `/${id}`, getProduct)
//   return { product: data, isLoading, error, isValidating }
// }

const useDeleteProviderProduct = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.PROVIDER_PRODUCT_CREATE, deleteProviderProduct)
  return { deleteProviderProduct: trigger, error, isMutating }
}
// const useDeleteGroup = () => {
//   const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.GROUP, deletGroup)
//   return { deleteGroup: trigger, error, isMutating }
// }
const useGetProviderProduct = (id?: string) => {
  if (!id || id === '') {
    return { providerProduct: null, isLoading: false, error: null, isValidating: false }
  }
  const { data, isLoading, error, isValidating } = useSWR<ProviderProduct, ResponseError>(id ? API_BASEURL + ENDPOINTS.PROVIDER_PRODUCT_EDIT + `/${id}` : null, getProviderProduct)
  return { providerProduct: data, isLoading, error, isValidating }
}

const useCreateProviderProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateProviderProduct>(API_BASEURL + ENDPOINTS.PROVIDER_PRODUCT_CREATE, createProviderProduct)
  return { createProviderProduct: trigger, isMutating, error }
}

const useUpdateProviderProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, UpdateProviderProduct>(API_BASEURL + ENDPOINTS.PROVIDER_PRODUCT_CREATE, updateProviderProduct)
  return { updateProviderProduct: trigger, isMutating, error }
}

const useGetAllProductsProviders = (id?: string) => {
  // if (!id) return { providerProducts: null, isLoading: false, error: null, mutate: null }
  const apiURL = id ? API_BASEURL + ENDPOINTS.PROVIDER_PRODUCT + `/${id}` : null
  const { data, isLoading, error, mutate } = useSWR<ProviderProduct[], ResponseError>(apiURL, getAllProductProvider)

  const value = useMemo(() => {
    return { providerProducts: data, isLoading, error, mutate }
  }, [data, isLoading, error, mutate])

  // return { providerProducts: data, isLoading, error, mutate }
  return value
}

export { useGetAllProductsProviders, useCreateProviderProduct, useGetProviderProduct, useUpdateProviderProduct, useDeleteProviderProduct }
