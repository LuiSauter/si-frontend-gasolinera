import useSWR from 'swr'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type Hose } from '../models/hose.model'
import { getAllHoses } from '../services/hose.service'

const useGetAllHoses = (id?: string) => {
  const { data, isLoading, error, mutate } = useSWR<Hose[], ResponseError>(id ? API_BASEURL + ENDPOINTS.HOSE_DISPENSER + `/${id}` : null, getAllHoses)

  return { hoses: data, isLoading, error, mutate }
}
export { useGetAllHoses }
