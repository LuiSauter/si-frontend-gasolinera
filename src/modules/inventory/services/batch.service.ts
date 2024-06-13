import { type ApiResponse } from '@/models'
import { fetchData } from '@/utils'
import { type CreateBatch, type Batch } from '../models/batch.model'

const getAllBatchs = async (url: string): Promise<ApiResponse> => {
  const response: ApiResponse = await fetchData(url)
  return {
    countData: response.countData, data: response.data as Batch
  }
}

const getBatch = async (url: string): Promise<Batch> => {
  const response: ApiResponse = await fetchData(url)
  return response.data as Batch
}

const createBatch = async (url: string, { arg }: { arg: CreateBatch }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  await fetchData(url, options)
}

export { getAllBatchs, getBatch, createBatch }
