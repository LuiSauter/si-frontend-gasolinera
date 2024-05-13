import useSWR from 'swr'
import { type Company, type UpdateCompany } from '../models/company.model'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { getCompany, updateCompany } from '../services/company.service'
import useSWRMutation from 'swr/mutation'

const useGetCompany = () => {
  const { data, isLoading, error } = useSWR<Company, ResponseError>(API_BASEURL + ENDPOINTS.COMPANY, getCompany)
  return { company: data, isLoading, error }
}

const useUpdateCompany = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, UpdateCompany>(API_BASEURL + ENDPOINTS.COMPANY, updateCompany)
  return { updateCompany: trigger, isMutating, error }
}

export { useGetCompany, useUpdateCompany }
