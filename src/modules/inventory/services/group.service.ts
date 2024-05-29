import { fetchData } from '@/utils'
import { type GroupUpdate, type CreateGroup, type Group } from '../models/group.model'

const getAllGroups = async (url: string): Promise<Group[]> => {
  const response = await fetchData(url)
  return response.data
}

const getGroup = async (url: string): Promise<Group> => {
  const response = await fetchData(url)
  return response
}

const createGroup = async (url: string, { arg }: { arg: CreateGroup }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  await fetchData(url, options)
}

const updateGroup = async (url: string, { arg }: { arg: GroupUpdate }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}/${arg.id}`, options)
}

const deletGroup = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { getAllGroups, createGroup, updateGroup, getGroup, deletGroup }
