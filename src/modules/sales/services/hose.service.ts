import { fetchData } from '@/utils'
import { type Hose } from '../models/hose.model'

const getAllHoses = async (url: string): Promise<Hose[]> => {
  const response = await fetchData(url)
  return response.data
}
export { getAllHoses }
