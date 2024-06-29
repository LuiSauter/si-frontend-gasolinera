import { fetchData } from '@/utils'
import { type ApiResponse } from '@/models'
import { type BuyNote, type CreateBuy } from '../models/buy-note.model'

const createBuyNote = async (url: string, { arg }: { arg: CreateBuy }): Promise<void> => {
  const options: RequestInit = { method: 'POST', body: JSON.stringify(arg) }
  await fetchData(url, options)
}

const getAllBuyNote = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: BuyNote[] = response.data as BuyNote[]
  return { countData, data }
}

const getBuyNote = async (url: string): Promise<BuyNote> => {
  const response = await fetchData(url)
  return response.data as BuyNote
}

export { createBuyNote, getAllBuyNote, getBuyNote }
