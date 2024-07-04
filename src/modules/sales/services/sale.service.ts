import { fetchData } from '@/utils'
import { type Sale, type CreateSale, type Customer } from '../models/sale.model'
import { type ApiResponse } from '@/models'

const createSaleNote = async (url: string, { arg }: { arg: CreateSale }): Promise<void> => {
  const options: RequestInit = { method: 'POST', body: JSON.stringify(arg) }
  await fetchData(url, options)
}

const getSalesNotes = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  return response
}

const getOneSaleNote = async (url: string): Promise<Sale> => {
  const response: { data: Sale } = await fetchData(url)
  return response.data
}

const getOneCustomer = async (url: string, { arg }: { arg: string }): Promise<Customer> => {
  const response: { data: Customer } = await fetchData(`${url}/${arg}`)
  return response.data
}

const deleteSaleNote = async (url: string, { arg }: { arg: { id: string } }): Promise<void> => {
  await fetchData(`${url}/${arg.id}`, {
    method: 'DELETE'
  })
}

export { createSaleNote, getSalesNotes, getOneSaleNote, getOneCustomer, deleteSaleNote }
