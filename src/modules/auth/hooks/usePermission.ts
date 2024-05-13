import useSWR from 'swr'
import { type PermissionUpdate, type CreatePermission, type Permission } from '../models/permission.model'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { createPermission, getAllPermissions, getPermission, updatePermission } from '../services/permissions.service'
import useSWRMutation from 'swr/mutation'

const useGetAllPermissions = () => {
  const { data, isLoading, error, mutate } = useSWR<Permission[], ResponseError>(API_BASEURL + ENDPOINTS.PERMISSION, getAllPermissions)

  return { permissions: data, isLoading, error, mutate }
}

const useCreatePermission = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreatePermission>(API_BASEURL + ENDPOINTS.PERMISSION, createPermission)
  return { createPermission: trigger, isMutating, error }
}

const useGetPermission = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Permission, ResponseError>(id ? API_BASEURL + ENDPOINTS.PERMISSION + `/${id}` : null, getPermission)
  return { permission: data, isLoading, error, isValidating }
}

const useUpdatePermission = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, PermissionUpdate>(API_BASEURL + ENDPOINTS.PERMISSION, updatePermission)
  return { updatePermission: trigger, isMutating, error }
}

export { useGetAllPermissions, useCreatePermission, useGetPermission, useUpdatePermission }
