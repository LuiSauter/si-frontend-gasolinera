import useSWRMutation from 'swr/mutation'
import { createUser, deleteUser, getAllUser, getUser, updateUser } from '../services/user.service'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type ResponseError } from '@/utils/response-error.utils'
import { type User, type CreateUser, type UpdateUser } from '../models/user.model'
import useSWR from 'swr'

// const useCreateUser = () => {
//   const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateUser>(API_BASEURL + ENDPOINTS.USER, createUser)
//   return { createUser: trigger, isMutating, error }
// }

const useCreateUser = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateUser>(API_BASEURL + ENDPOINTS.USER, createUser)
  return { createUser: trigger, isMutating, error }
}

const useGetUser = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<User, ResponseError>(id ? API_BASEURL + ENDPOINTS.USER + `/${id}` : null, getUser)
  return { user: data, isLoading, error, isValidating }
}

const useGetAllUser = () => {
  const { data, error, isLoading } = useSWR<User[], ResponseError>(API_BASEURL + ENDPOINTS.USER, getAllUser)
  return { allUsers: data, error, isLoading }
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
