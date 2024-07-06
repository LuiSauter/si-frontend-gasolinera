import { fetchData } from '@/utils'
import { type GetLogByMothAndYear } from '../models/binnacle.model'

const getLogByMothAndYear = async (url: string, { arg }: { arg: GetLogByMothAndYear }): Promise<any[]> => {
  const response = await fetchData(`${url}/${arg.year}/${arg.month}`)
  return response.data.binnacle.map((log: string) => JSON.parse(log)).reverse()
}

export { getLogByMothAndYear }
