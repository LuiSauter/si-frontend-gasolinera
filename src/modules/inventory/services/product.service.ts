import { fetchData } from '@/utils'
import { type CreateProduct, type Group, type Product } from '../models/product.model'
import { type ApiResponse } from '@/models'

const getAllProducts = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: Product = response.data
  return { countData, data }
}

const createProduct = async (url: string, { arg }: { arg: CreateProduct }): Promise<void> => {
  const options: RequestInit = { method: 'POST', body: JSON.stringify(arg) }

  await fetchData(url, options)
}

const updateProduct = async (url: string, { arg }: { arg: CreateProduct }): Promise<void> => {
  const { id, ...updateProduct } = arg

  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(updateProduct)
  }
  await fetchData(`${url}/${id}`, options)
}

const getProduct = async (url: string): Promise<Product> => {
  const response = await fetchData(url)
  return response.data
}

const deleteProduct = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${arg}`, options)
}

const getAllCategories = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  return response
}

const getAllGroups = async (url: string): Promise<Group[]> => {
  const response: { data: Group[] } = await fetchData(url)
  return response.data
}

export { getAllProducts, deleteProduct, createProduct, getAllCategories, getAllGroups, updateProduct, getProduct }
