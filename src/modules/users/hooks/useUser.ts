import useSWRMutation from 'swr/mutation'
import { createUser, getAllUser } from '../services/user.service'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type User } from '@/modules/inventory/models/product.model'
import { type ResponseError } from '@/utils/response-error.utils'
import { type CreateUser } from '../models/user.model'
import useSWR from 'swr'

const useCreateUser = () => {
  const { trigger, isMutating, error } = useSWRMutation<User, ResponseError, string, CreateUser>(API_BASEURL + ENDPOINTS.USER, createUser)
  return { createUser: trigger, isMutating, error }
}

const useGetAllUser = () => {
  const { data, error, isLoading } = useSWR(API_BASEURL + ENDPOINTS.USER, getAllUser)
  return { allUsers: data, error, isLoading }
}
export { useCreateUser, useGetAllUser }
