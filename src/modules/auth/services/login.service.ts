import { STORAGE_BRANCH, STORAGE_TOKEN, STORAGE_USER, fetchData, setStorage } from '@/utils'
import { type AuthLogin } from '../models/login.model'

const userLogin = async (url: string, { arg }: { arg: AuthLogin }): Promise<any> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: { 'Content-Type': 'application/json' }
  }

  const data = await fetchData(url, options)
  if (data.data.accessToken) {
    setStorage(STORAGE_TOKEN, data.data.accessToken as string)
    setStorage(STORAGE_BRANCH, data.data.User.branch?.id as string)
  }
  return data.data.User
}

const checkToken = async (url: string, { arg }: { arg: { token: string } }): Promise<any> => {
  const response = await fetchData(`${url}?token=${arg.token}`)
  if (response.statusCode === 200) {
    setStorage(STORAGE_USER, response.data.id as string)
    setStorage(STORAGE_BRANCH, response.data.branch?.id as string)
  }
  return response.data
}

export { userLogin, checkToken }
