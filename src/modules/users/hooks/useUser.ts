import useSWRMutation from 'swr/mutation'
import { createUser, deleteUser, getAllUser, getUser, updateUser } from '../services/user.service'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import { type User, type CreateUser, type UpdateUser } from '../models/user.model'
import useSWR from 'swr'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
import { type ApiResponse } from '@/models'

const useCreateUser = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateUser>(API_BASEURL + ENDPOINTS.USER, createUser)
  return { createUser: trigger, isMutating, error }
}

const useGetUser = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<User, ResponseError>(id ? API_BASEURL + ENDPOINTS.USER + `/${id}` : null, getUser)
  return { user: data, isLoading, error, isValidating }
}

const useGetAllUser = () => {
  const { changeOrder, filterOptions, newPage, prevPage, queryParams, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)
  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(`${API_BASEURL + ENDPOINTS.USER}?${queryParams}`, getAllUser)
  return { allUsers: data?.data ?? [], countData: data?.countData ?? 0, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}

const useUpdateUser = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, UpdateUser>(API_BASEURL + ENDPOINTS.USER, updateUser)
  return { updateUser: trigger, isMutating, error }
}

const useDeleteUser = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.USER, deleteUser)
  return { deleteUser: trigger, error, isMutating }
}

// const useDeleteRole = () => {
//   const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.ROLE, deleteRole)
//   return { deleteRole: trigger, error, isMutating }
// }

export { useCreateUser, useGetAllUser, useGetUser, useUpdateUser, useDeleteUser }
