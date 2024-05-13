import { fetchData } from '@/utils'
import { type User, type CreateUser } from '../models/user.model'

const createUser = async (url: string, { arg }: { arg: CreateUser }):
Promise<User> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg)
  }
  const response: { data: User } = await fetchData(url, options)
  return response.data
}

const getAllUser = async (url: string): Promise<void> => {
  const options: RequestInit = {
    method: 'GET'
  }
  const response = await fetchData(url, options)
  console.log(response)
}
export { createUser, getAllUser }
