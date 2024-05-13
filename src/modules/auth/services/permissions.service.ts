import { fetchData } from '@/utils'
import { type CreatePermission, type PermissionUpdate, type Permission } from '../models/permission.model'

const getAllPermissions = async (url: string): Promise<Permission[]> => {
  const response = await fetchData(url)
  return response.data
}

const getPermission = async (url: string): Promise<Permission> => {
  const response = await fetchData(url)
  return response.data
}

const createPermission = async (url: string, { arg }: { arg: CreatePermission }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  await fetchData(url, options)
}

const updatePermission = async (url: string, { arg }: { arg: PermissionUpdate }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}/${arg.id}`, options)
}

export { getAllPermissions, getPermission, createPermission, updatePermission }
