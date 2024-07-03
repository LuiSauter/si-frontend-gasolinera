import { fetchData } from '@/utils'
import { type Dispenser, type CreateDispenser, type DispenserUpdate } from '../models/dispenser.model'

const getAllDispenser = async (url: string): Promise<Dispenser[]> => {
  const response = await fetchData(url)
  return response.data
}

const getDispenser = async (url: string): Promise<Dispenser> => {
  const response = await fetchData(url)
  return response.data
}

const createDispenser = async (url: string, { arg }: { arg: CreateDispenser }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  await fetchData(url, options)
}

const updateDispenser = async (url: string, { arg }: { arg: DispenserUpdate }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}/${arg.id}`, options)
}

const deleteDispenser = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { getAllDispenser, createDispenser, updateDispenser, getDispenser, deleteDispenser }
