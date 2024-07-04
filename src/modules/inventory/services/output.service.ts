import { fetchData } from '@/utils'
import { type OuputUpdate, type CreateOutput, type Output } from '../models/output.model'
import { type ApiResponse } from '@/models'

// const getAllOuputs = async (url: string): Promise<Output[]> => {
//   const response = await fetchData(url)
//   return response.data
// }
const getAllOutputs = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: Output[] = response.data as Output[]
  return { countData, data }
}
const getOutput = async (url: string): Promise<Output> => {
  const response = await fetchData(url)
  return response.data
}

const createOutput = async (url: string, { arg }: { arg: CreateOutput }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  await fetchData(url, options)
}

const updateOutput = async (url: string, { arg }: { arg: OuputUpdate }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}/${arg.id}`, options)
}

const deleteOutput = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { getAllOutputs, createOutput, updateOutput, getOutput, deleteOutput }
