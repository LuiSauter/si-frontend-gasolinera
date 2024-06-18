import { fetchData } from '@/utils'
import { type CreateCategory, type Category, type CategoryUpdate } from '../models/category.model'
import { type ApiResponse } from '@/models'

const getAllCategorys = async (url: string): Promise<ApiResponse> => {
  const response: ApiResponse = await fetchData(url)
  return { data: response.data, countData: response.countData }
}

const getCategory = async (url: string): Promise<Category> => {
  const response = await fetchData(url)
  return response.data
}

const createCategory = async (url: string, { arg }: { arg: CreateCategory }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  await fetchData(url, options)
}

const updateCategory = async (url: string, { arg }: { arg: CategoryUpdate }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}/${arg.id}`, options)
}

const deleteCategory = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { getAllCategorys, createCategory, getCategory, updateCategory, deleteCategory }
