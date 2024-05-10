import { fetchData } from '@/utils'
import { type Branch, type CreateBranch, type BranchData } from '../models/branch.model'

const getAllBranches = async (url: string): Promise<BranchData> => {
  const response = await fetchData(url)
  return response
}

const createBranch = async (url: string, { arg }: { arg: CreateBranch }): Promise<Branch> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }

  const response = await fetchData(url, options)
  return response
}

export { getAllBranches, createBranch }
