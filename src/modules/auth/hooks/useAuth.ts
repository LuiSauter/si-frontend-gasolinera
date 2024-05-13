import useSWRMutation from 'swr/mutation'
import { checkToken, userLogin } from '../services/login.service'
import { type ResponseError } from '@/utils/response-error.utils'
import { type AuthLogin } from '../models/login.model'
import { API_BASEURL, ENDPOINTS } from '@/utils'

const useAuthLogin = () => {
  const { trigger, isMutating, error } = useSWRMutation<any, ResponseError, string, AuthLogin>(API_BASEURL + ENDPOINTS.AUTH + '/login', userLogin)
  return { authLogin: trigger, isLoggingIn: isMutating, errorLogin: error }
}

const useCheckToken = () => {
  const { trigger, isMutating, error } = useSWRMutation<any, ResponseError, string, { token: string }>(API_BASEURL + ENDPOINTS.AUTH + '/checkToken', checkToken)
  return { checkToken: trigger, isChekingToken: isMutating, errorToken: error }
}

export { useAuthLogin, useCheckToken }
