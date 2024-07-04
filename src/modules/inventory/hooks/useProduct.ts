import { type GetAllProps, type ApiResponse } from '@/models'
import useSWR, { type KeyedMutator } from 'swr'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import { createProduct, deleteProduct, getAllGroups, getAllProducts, getProduct, updateProduct } from '../services/product.service'
import useSWRMutation from 'swr/mutation'
import { type Group, type CreateProduct, type Product } from '../models/product.model'
import { useAuthorization } from '@/hooks/useAuthorization'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { PERMISSION } from '@/modules/auth/utils/permissions.constants'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'

interface UseGetAllProductsProps extends GetAllProps {
  branchId?: string
}

const useGetAllProducts = ({ isGetAll }: UseGetAllProductsProps) => {
  const { verifyPermission } = useAuthorization()
  let mounted = true
  useEffect(() => {
    if (!verifyPermission([PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW])) {
      mounted && toast.info('No tienes permisos para listar los productos, comunícate con un administrador.')
    }
    return () => {
      mounted = false
    }
  }, [!verifyPermission([PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW])])

  if (!verifyPermission([PERMISSION.PRODUCT, PERMISSION.PRODUCT_SHOW])) {
    return {
      products: [],
      countData: 0,
      isLoading: false,
      error: undefined,
      mutate: (() => { }) as KeyedMutator<ApiResponse>,

      search: () => { },
      setFilterOptions: () => { },
      setOffset: () => { },
      changeOrder: () => { },
      filterOptions: filterStateDefault,
      newPage: () => { },
      prevPage: () => { }
    }
  }

  const { changeOrder, filterOptions, newPage, prevPage, queryParams, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)
  const query = isGetAll ? '' : queryParams
  const fetchURL = `${API_BASEURL + ENDPOINTS.PRODUCT}?${query}`
  const { data, isLoading, error, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllProducts)

  const products: Product[] = data?.data as Product[] ?? []

  return {
    products, countData: data?.countData, isLoading, error, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset
  }
}

const useCreateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateProduct>(API_BASEURL + ENDPOINTS.PRODUCT, createProduct)
  return { createProduct: trigger, isMutating, error }
}

const useGetAllGroups = () => {
  const { data, isLoading, error, mutate } = useSWR<Group[], ResponseError>(API_BASEURL + ENDPOINTS.GROUP, getAllGroups)
  return { groups: data ?? [], isLoading, error, mutate }
}

const useUpdateProduct = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateProduct>(API_BASEURL + ENDPOINTS.PRODUCT, updateProduct)
  return { updateProduct: trigger, isMutating, error }
}

const useCreateOrUpdateProduct = () => {
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

export { useGetAllProducts, useDeleteProduct, useCreateOrUpdateProduct, useGetProduct, useGetAllGroups }
