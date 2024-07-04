import useSWR from 'swr'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { type Hose } from '../models/hose.model'
import { getAllHoses, getOneHoseMutation } from '../services/hose.service'
import useSWRMutation from 'swr/mutation'

const useGetAllHoses = (id?: string) => {
  const { data, isLoading, error, mutate } = useSWR<Hose[], ResponseError>(id ? API_BASEURL + ENDPOINTS.HOSE_DISPENSER + '/all' + `/${id}` : null, getAllHoses)

  return { hoses: data, isLoading, error, mutate }
}

const useGetHoseMutation = () => {
  const fetchURL = `${API_BASEURL + ENDPOINTS.HOSE_DISPENSER}/one`
  const { trigger, error, isMutating, data } = useSWRMutation<Hose, ResponseError, string, string>(fetchURL, getOneHoseMutation)
  return { getHoseMutation: trigger, error, isMutating, hose: data }
}

export { useGetAllHoses, useGetHoseMutation }
