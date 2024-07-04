import useSWR from 'swr'
import { type CreateBranch, type Branch } from '../models/branch.model'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import { createBranch, getAllBranches, getBranch, suspendBranch, updateBranch } from '../services/branch.service'
import useSWRMutation from 'swr/mutation'
import { type ApiResponse, type GetAllProps } from '@/models'
import { filterStateDefault, useFilterData } from '@/hooks/useFilterData'
interface UseGetAllProps extends GetAllProps { }

// const useGetAllBranches = () => {
//   const { data, isLoading, error, mutate } = useSWR<Branch[], ResponseError>(API_BASEURL + ENDPOINTS.BRANCH, getAllBranches)

//   return { branches: data, isLoading, error, mutate }
// }
const useGetAllBranches = ({ isGetAll }: UseGetAllProps) => {
  const { changeOrder, filterOptions, queryParams, newPage, prevPage, search, setFilterOptions, setOffset } = useFilterData(filterStateDefault)
  const query = isGetAll ? '' : queryParams
  const fetchURL = `${API_BASEURL + ENDPOINTS.BRANCH}?${query}`

  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(fetchURL, getAllBranches)
  return { branches: data?.data, countData: data?.countData ?? 0, error, isLoading, mutate, changeOrder, filterOptions, newPage, prevPage, search, setFilterOptions, setOffset }
}
const useCreateBranch = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateBranch>(API_BASEURL + ENDPOINTS.BRANCH, createBranch)
  return { createBranch: trigger, isMutating, error }
}

const useGetBranch = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Branch, ResponseError>(id ? API_BASEURL + ENDPOINTS.BRANCH + `/${id}` : null, getBranch)
  return { branch: data, isLoading, error, isValidating }
}

const useUpdateBranch = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, Partial<Branch>>(API_BASEURL + ENDPOINTS.BRANCH, updateBranch)
  return { updateBranch: trigger, isMutating, error }
}

const useSuspendBranch = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.BRANCH, suspendBranch)
  return { suspendBranch: trigger, isMutating, error }
}

export { useGetAllBranches, useCreateBranch, useGetBranch, useUpdateBranch, useSuspendBranch }
