import { API_BASEURL, ENDPOINTS } from '@/utils'
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from '@modules/auth/services/role.service'
import useSWRMutation from 'swr/mutation'
import { type UpdateRole, type CreateRole, type Role } from '../models/role.model'
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

const useGetRole = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Role, ResponseError>(id ? API_BASEURL + ENDPOINTS.ROLE + `/${id}` : null, getRole)
  return { role: data, isLoading, error, isValidating }
}

const useUpdateRole = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, UpdateRole>(API_BASEURL + ENDPOINTS.ROLE, updateRole)
  return { updateRole: trigger, isMutating, error }
}

const useDeleteRole = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.ROLE, deleteRole)
  return { deleteRole: trigger, error, isMutating }
}

export { useCreateRole, useGetAllRole, useDeleteRole, useGetRole, useUpdateRole }
