import { fetchData } from '@/utils'
import { type UpdateProviderProduct, type CreateProviderProduct, type ProviderProduct } from '../models/providerProduct.model'

const deleteProviderProduct = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

const updateProviderProduct = async (url: string, { arg }: { arg: UpdateProviderProduct }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify({
      last_price: arg?.last_price,
      providerId: arg?.providerId,
      productId: arg?.productId,
      details: arg?.details
    })
  }
  await fetchData(`${url}/${arg.id}`, options)
}

const getProviderProduct = async (url: string): Promise<ProviderProduct> => {
  const response = await fetchData(url)
  return response.data
}

const createProviderProduct = async (url: string, { arg }: { arg: CreateProviderProduct }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  const response = await fetchData(url, options)
  return response
}

const getAllProductProvider = async (url: string): Promise<ProviderProduct[]> => {
  const response = await fetchData(url)
  return response.data
}

const getAllProductProviderId = async (url: string, { arg }: { arg: string }): Promise<ProviderProduct[]> => {
  const response = await fetchData(`${url}/${arg}`)
  return response.data
}

export { getAllProductProvider, getAllProductProviderId, createProviderProduct, getProviderProduct, updateProviderProduct, deleteProviderProduct }
