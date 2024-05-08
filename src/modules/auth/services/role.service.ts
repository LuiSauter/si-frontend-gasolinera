import { fetchData } from '@/utils'
import { type Role, type CreateRole } from '../models/role.model'

const createRole = async (url: string, { arg }: { arg: CreateRole }): Promise<Role> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }

  const response: { data: Role } = await fetchData(url, options)
  return response.data
}

const getAllRoles = async (url: string): Promise<Role[]> => {
  const options: RequestInit = {
    method: 'GET'
  }

  const response = await fetchData(url, options)
  console.log(response)
  return response.data
}

const deleteRole = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { createRole, getAllRoles, deleteRole }
