import { fetchData } from '@/utils'
import { type UpdateProvider, type CreateProvider, type Provider } from '../models/provider.model'

const createProvider = async (url: string, { arg }: { arg: CreateProvider }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }

  const response = await fetchData(url, options)
  return response
}

const getProvider = async (url: string): Promise<Provider> => {
  const response = await fetchData(url)
  return response.data
}

const updateProvider = async (url: string, { arg }: { arg: UpdateProvider }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify({
      name: arg?.name,
      phone: arg?.phone,
      email: arg?.email,
      address: arg?.address,
      nit: arg?.nit,
      detail: arg?.detail
    })
  }
  await fetchData(`${url}/${arg.id}`, options)
}
const getAllProvider = async (url: string): Promise<Provider[]> => {
  const options: RequestInit = {
    method: 'GET'
  }
  const response = await fetchData(url, options)
  return response.data
}

const deleteProvider = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}
export { createProvider, getAllProvider, getProvider, updateProvider, deleteProvider }
