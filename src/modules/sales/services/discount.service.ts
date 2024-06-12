import { fetchData } from '@/utils'
import { type UpdateDiscount, type CreateDiscount, type Discount } from '../models/discount.model'

const getAllDiscount = async (url: string): Promise<Discount[]> => {
  const response = await fetchData(url)
  return response.data.data
}

const getDiscount = async (url: string): Promise<Discount> => {
  const response = await fetchData(url)
  return response.data
}

const createDiscount = async (url: string, { arg }: { arg: CreateDiscount }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  await fetchData(url, options)
}

const updateDiscount = async (url: string, { arg }: { arg: UpdateDiscount }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}/${arg.id}`, options)
}

const deleteDiscount = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { getAllDiscount, createDiscount, updateDiscount, getDiscount, deleteDiscount }
