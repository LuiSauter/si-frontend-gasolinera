import { fetchData } from '@/utils'
import { type GetLogByMothAndYear } from '../models/binnacle.model'

const getLogByMothAndYear = async (url: string, { arg }: { arg: GetLogByMothAndYear }): Promise<string> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({ password: arg.password })
  }
  const response = await fetchData(`${url}/${arg.year}/${arg.month}`, options)
  return response.data.binnacle
}

export { getLogByMothAndYear }
