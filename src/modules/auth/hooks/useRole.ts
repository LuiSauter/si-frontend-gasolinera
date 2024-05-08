import { API_BASEURL, ENDPOINTS } from '@/utils'
import { createRole, deleteRole, getAllRoles } from '@modules/auth/services/role.service'
import useSWRMutation from 'swr/mutation'
import { type CreateRole, type Role } from '../models/role.model'
import { type ResponseError } from '@/utils/response-error.utils'
import useSWR from 'swr'

const useCreateRole = () => {
  const { trigger, isMutating, error } = useSWRMutation<Role, ResponseError, string, CreateRole>(API_BASEURL + ENDPOINTS.ROLE, createRole)
  return { createRole: trigger, isMutating, error }
}

const useGetAllRole = () => {
  const { data, error, isLoading } = useSWR<Role[], ResponseError>(API_BASEURL + ENDPOINTS.ROLE, getAllRoles)
  return { allRoles: data, error, isLoading }
}

const useDeleteRole = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.ROLE, deleteRole)
  return { deleteRole: trigger, error, isMutating }
}

export { useCreateRole, useGetAllRole, useDeleteRole }
