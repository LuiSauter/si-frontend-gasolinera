import { fetchData } from '@/utils'
import { type CreatePurchaseOrder, type PurchaseOrder } from '../models/purchase-order.model'
import { type ApiResponse } from '@/models'

const createPurchaseOrder = async (url: string, { arg }: { arg: CreatePurchaseOrder }): Promise<void> => {
  const options: RequestInit = { method: 'POST', body: JSON.stringify(arg) }
  await fetchData(url, options)
}

const getAllPurchaseOrder = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: PurchaseOrder[] = response.data as PurchaseOrder[]
  return { countData, data }
}

const getPurchaseOrder = async (url: string): Promise<PurchaseOrder> => {
  const response = await fetchData(url)
  return response.data as PurchaseOrder
}

const updatePurchaseOrder = async (url: string, { arg }: { arg: CreatePurchaseOrder }): Promise<void> => {
  const { id, ...updatePurchaseOrder } = arg

  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(updatePurchaseOrder)
  }
  await fetchData(`${url}/${id}`, options)
}

const deletePurchaseOrder = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${arg}`, options)
}

export { createPurchaseOrder, getAllPurchaseOrder, getPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder }
