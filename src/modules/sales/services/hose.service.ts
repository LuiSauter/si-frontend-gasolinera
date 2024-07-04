import { fetchData } from '@/utils'
import { type Hose } from '../models/hose.model'

const getAllHoses = async (url: string): Promise<Hose[]> => {
  const response = await fetchData(url)
  return response.data
}

const getOneHoseMutation = async (url: string, { arg }: { arg: string }): Promise<Hose> => {
  const response = await fetchData(`${url}/${arg}`)
  return response.data
}

export { getAllHoses, getOneHoseMutation }
