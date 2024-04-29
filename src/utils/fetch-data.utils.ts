import { STORAGE_TOKEN } from '.'
import { type ApiResponse, type FilterOptions } from '../models'
import { ResponseError } from './response-error.utils'

export const generateQueryParams = (filterOptions: FilterOptions): string => {
  const { offset, limit, order, attr, value } = filterOptions

  const queryParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
    order: order.toString()
  })

  if (attr && value) {
    queryParams.append('attr', attr)
    queryParams.append('value', value)
  }

  return queryParams.toString()
}

export const handleResponseErrors = async (response: Response) => {
  if (!response.ok) {
    const errorResponse: ApiResponse = await response.json()
    const error = new ResponseError(
      'Ocurrio un error al realizar la solicitud',
      errorResponse
    )
    throw error
  }
}

export const fetchData = async (url: string, options?: RequestInit) => {
  const token = localStorage.getItem(STORAGE_TOKEN)
  const authorizationHeader = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...options?.headers,
      ...authorizationHeader
    }
  }

  const response = await fetch(url, requestOptions)
  await handleResponseErrors(response)
  return await response.json()
}
