import useSWR from 'swr'
import { type CreateCategory, type Category, type CategoryUpdate } from '../models/category.model'
import { createCategory, deleteCategory, getAllCategorys, getCategory, updateCategory } from '../services/category.service'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import useSWRMutation from 'swr/mutation'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import { type ApiResponse } from '@/models'

const useGetAllCategorys = () => {
  const { changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)
  const { data, isLoading, error, mutate } = useSWR<ApiResponse, ResponseError>(API_BASEURL + ENDPOINTS.CATEGORY, getAllCategorys)

  return { categorys: data?.data as Category[], countData: data?.countData ?? 0, isLoading, error, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useCreateCategory = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateCategory>(API_BASEURL + ENDPOINTS.CATEGORY, createCategory)
  return { createCategory: trigger, isMutating, error }
}

const useGetCategory = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Category, ResponseError>(id ? API_BASEURL + ENDPOINTS.CATEGORY + `/${id}` : null, getCategory)
  return { category: data, isLoading, error, isValidating }
}

const useUpdateCategory = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CategoryUpdate>(API_BASEURL + ENDPOINTS.CATEGORY, updateCategory)
  return { updateCategory: trigger, isMutating, error }
}

const useDeleteCategory = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.CATEGORY, deleteCategory)
  return { deleteCategory: trigger, error, isMutating }
}

export { useGetAllCategorys, useCreateCategory, useGetCategory, useUpdateCategory, useDeleteCategory }
