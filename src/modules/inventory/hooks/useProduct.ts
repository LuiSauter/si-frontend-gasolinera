import { type ApiResponse } from '@/models'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import useSWR from 'swr'
import { createProduct, deleteProduct, getAllCategories, getAllGroups, getAllProducts, getProduct, updateProduct } from '../services/product.service'
import useSWRMutation from 'swr/mutation'
import { type Category, type Group, type CreateProduct, type Product } from '../models/product.model'

const useGetAllProducts = () => {
  const { data, isLoading, error, mutate } = useSWR<ApiResponse, ResponseError>(API_BASEURL + ENDPOINTS.PRODUCT, getAllProducts)

  return { products: data?.data, countData: data?.countData, isLoading, error, mutate }
}

const useCreateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateProduct>(API_BASEURL + ENDPOINTS.PRODUCT, createProduct)
  return { createProduct: trigger, isMutating, error }
}

const useGetAllCategories = () => {
  const { data, isLoading, error } = useSWR<Category[], ResponseError>(API_BASEURL + ENDPOINTS.CATEGORY, getAllCategories)
  return { categories: data, isLoading, error }
}

const useGetAllGroups = () => {
  const { data, isLoading, error } = useSWR<Group[], ResponseError>(API_BASEURL + ENDPOINTS.GROUP, getAllGroups)
  return { groups: data, isLoading, error }
}

const useUpdateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateProduct>(API_BASEURL + ENDPOINTS.PRODUCT, updateProduct)
  return { updateProduct: trigger, isMutating, error }
}

const useCreateOrUpdateProduct = () => {
  // const { categories, isLoading: isLoadingCategories, error: errorCategories } = useGetAllCategories()
  // const { groups, isLoading: isLoadingGroups, error: errorGroups } = useGetAllGroups()
  const { createProduct, isMutating: isCreating, error } = useCreateProduct()
  const { updateProduct, isMutating: isUpdating, error: errorUpdate } = useUpdateProduct()

  return { createProduct, isCreating, error: error ?? errorUpdate, updateProduct, isUpdating }
}

const useGetProduct = (id?: string) => {
  if (!id) return { product: null, isLoading: false, error: null, isValidating: false }
  const { data, isLoading, error, isValidating } = useSWR<Product, ResponseError>(API_BASEURL + ENDPOINTS.PRODUCT + `/${id}`, getProduct)
  return { product: data, isLoading, error, isValidating }
}

const useDeleteProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.PRODUCT, deleteProduct)
  return { deleteProduct: trigger, isMutating, error }
}

export { useGetAllProducts, useDeleteProduct, useCreateOrUpdateProduct, useGetProduct, useGetAllCategories, useGetAllGroups }
