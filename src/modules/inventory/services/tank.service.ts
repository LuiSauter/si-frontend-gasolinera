import { fetchData } from '@/utils'
import { type Tank, type CreateTank } from '../models/tank.model'
import { type ApiResponse } from '@/models'

const createTank = async (url: string, { arg }: { arg: CreateTank }): Promise<void> => {
  const options: RequestInit = { method: 'POST', body: JSON.stringify(arg) }
  await fetchData(url, options)
}

const getAllTanks = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: Tank[] = response.data as Tank[]
  return { countData, data }
}

const getAllTanksByProduct = async (url: string, { arg }: { arg: string }): Promise<Tank[]> => {
  const response = await fetchData(`${url}/${arg}`)
  const data: Tank[] = response.data as Tank[]
  return data
}

const getTank = async (url: string): Promise<Tank> => {
  const response = await fetchData(url)
  return response.data as Tank
}

const updateTank = async (url: string, { arg }: { arg: CreateTank }): Promise<void> => {
  const { id, ...updateTank } = arg

  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(updateTank)
  }
  await fetchData(`${url}/${id}`, options)
}

const deleteTank = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${arg}`, options)
}

export { createTank, getAllTanks, getAllTanksByProduct, getTank, updateTank, deleteTank }
