import { fetchData } from '@/utils'
import { type UpdatePurchaseOrder, type CreatePurchaseOrder, type PurchaseOrder } from '../models/purchase-order.model'
import { type ApiResponse } from '@/models'

const createBuyNote = async (url: string, { arg }: { arg: CreatePurchaseOrder }): Promise<void> => {
  const options: RequestInit = { method: 'POST', body: JSON.stringify(arg) }
  await fetchData(url, options)
}

const getAllBuyNote = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: PurchaseOrder[] = response.data as PurchaseOrder[]
  return { countData, data }
}

const getBuyNote = async (url: string): Promise<PurchaseOrder> => {
  const response = await fetchData(url)
  return response.data as PurchaseOrder
}

const updateBuyNote = async (url: string, { arg }: { arg: UpdatePurchaseOrder }): Promise<void> => {
  const { id, ...updatePurchaseOrder } = arg

  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(updatePurchaseOrder)
  }
  await fetchData(`${url}/${id}`, options)
}

const deleteBuyNote = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${arg}`, options)
}

export { createBuyNote, getAllBuyNote, getBuyNote, updateBuyNote, deleteBuyNote }
