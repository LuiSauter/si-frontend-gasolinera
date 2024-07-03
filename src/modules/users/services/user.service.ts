import { fetchData } from '@/utils'
import { type User, type CreateUser, type UpdateUser } from '../models/user.model'
import { type ApiResponse } from '@/models'

const createUser = async (url: string, { arg }: { arg: CreateUser }): Promise<void> => {
  console.log(arg)
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  const response = await fetchData(url, options)
  return response
}

const getUser = async (url: string): Promise<User> => {
  const response = await fetchData(url)
  return response.data
}

const updateUser = async (url: string, { arg }: { arg: UpdateUser }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify({
      ci: arg?.ci,
      name: arg?.name,
      email: arg?.email,
      password: arg?.password,
      gender: arg?.gender,
      address: arg?.address,
      phone: arg?.phone,
      role: arg?.role,
      branch: arg?.branch
    })
  }
  await fetchData(`${url}/${arg.id}`, options)
}
const getAllUser = async (url: string): Promise<ApiResponse> => {
  const options: RequestInit = { method: 'GET' }
  const response = await fetchData(url, options)
  return { data: response.data as User[], countData: response.countData }
}

const deleteUser = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { createUser, getAllUser, getUser, updateUser, deleteUser }
