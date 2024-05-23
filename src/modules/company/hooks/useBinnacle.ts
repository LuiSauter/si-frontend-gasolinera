import useSWRMutation from 'swr/mutation'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { getLogByMothAndYear } from '../services/binnacle.service'
import { type ResponseError } from '@/utils/response-error.utils'
import { type GetLogByMothAndYear } from '../models/binnacle.model'

const useGetLogsByMothAndYear = () => {
  const { trigger, isMutating, error, data } = useSWRMutation<string, ResponseError, string, GetLogByMothAndYear>(API_BASEURL + ENDPOINTS.BINNACLE, getLogByMothAndYear)

  return { getLogByMothAndYear: trigger, isMutating, error, dataLogs: data }
}

export { useGetLogsByMothAndYear }
