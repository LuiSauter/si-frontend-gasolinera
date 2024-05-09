import { STORAGE_TOKEN, getStorage } from '.'
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
    const error = new ResponseError('Ocurrio un error al realizar la solicitud', errorResponse)
    throw error
  }
}

export const fetchData = async (url: string, options?: RequestInit, typeBlob?: boolean) => {
  const token = getStorage(STORAGE_TOKEN)
  const authorizationHeader = { Authorization: `Bearer ${token}` }
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...options?.headers,
      ...authorizationHeader
    }
  }

  if (!options || (options && !(options.body instanceof FormData))) {
    requestOptions.headers = {
      ...requestOptions.headers,
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(url, requestOptions)
  await handleResponseErrors(response)
  return !typeBlob ? await response.json() : response
}

type QueryOptions = Record<string, string | number | undefined>

export const generateQueryParamsGeneric = (queryOption: QueryOptions): string => {
  const queryParams = new URLSearchParams()

  for (const key in queryOption) {
    if (queryOption[key] !== undefined) {
      queryParams.append(key, queryOption[key]!.toString())
    }
  }

  return queryParams.toString()
}
