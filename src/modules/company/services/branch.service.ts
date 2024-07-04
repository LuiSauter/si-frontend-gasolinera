import { fetchData } from '@/utils'
import { type Branch, type CreateBranch } from '../models/branch.model'
import { type ApiResponse } from '@/models'

// const getAllBranches = async (url: string): Promise<Branch[]> => {
//   const response = await fetchData(url)
//   return response.data
// }

const getAllBranches = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: Branch[] = response.data as Branch[]
  return { countData, data }
}

const createBranch = async (url: string, { arg }: { arg: CreateBranch }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }

  const response = await fetchData(url, options)
  return response
}

const getBranch = async (url: string): Promise<Branch> => {
  const response = await fetchData(url)
  return response.data
}

const updateBranch = async (url: string, { arg }: { arg: Partial<Branch> }): Promise<void> => {
  const { id, ...rest } = arg
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(rest)
  }

  await fetchData(`${url}/${id}`, options)
}

const suspendBranch = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${arg}`, options)
}

export { getAllBranches, createBranch, getBranch, updateBranch, suspendBranch }
