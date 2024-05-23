import { fetchData } from '@/utils'
import { type GetLogByMothAndYear } from '../models/binnacle.model'

const getLogByMothAndYear = async (url: string, { arg }: { arg: GetLogByMothAndYear }): Promise<any[]> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({ password: arg.password })
  }
  const response = await fetchData(`${url}/${arg.year}/${arg.month}`, options)
  return response.data.binnacle.map((log: string) => JSON.parse(log))
}

export { getLogByMothAndYear }
