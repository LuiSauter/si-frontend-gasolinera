import { fetchData } from '@/utils'
import { type Fuel, type CreateFuel } from '../models/fuel.model'
import { type ApiResponse } from '@/models'

const createFuel = async (url: string, { arg }: { arg: CreateFuel }): Promise<void> => {
  const options: RequestInit = { method: 'POST', body: JSON.stringify(arg) }
  await fetchData(url, options)
}

const getAllFuels = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data = response.data
  return { countData, data }
}

const getFuel = async (url: string): Promise<Fuel> => {
  const response = await fetchData(url)
  return response.data
}

const updateFuel = async (url: string, { arg }: { arg: CreateFuel }): Promise<void> => {
  const { id, ...updateFuel } = arg

  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(updateFuel)
  }
  await fetchData(`${url}/${id}`, options)
}

const deleteFuel = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${arg}`, options)
}

export { createFuel, getAllFuels, getFuel, updateFuel, deleteFuel }
