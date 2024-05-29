import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import { API_BASEURL, ENDPOINTS } from '@/utils'

import { type ResponseError } from '@/utils/response-error.utils'
import { type Fuel, type CreateFuel } from '../models/fuel.model'

import { createFuel, deleteFuel, getAllFuels, getFuel } from '../services/fuel.service'
import { type ApiResponse } from '@/models'

const useCreateFuel = () => {
  const { error, isMutating, trigger } = useSWRMutation<Promise<void>, ResponseError, string, CreateFuel>(API_BASEURL + ENDPOINTS.FUEL, createFuel)
  return { createFuel: trigger, isMutating, error }
}

const useGetAllFuels = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse, ResponseError>(API_BASEURL + ENDPOINTS.FUEL, getAllFuels)
  return { fuels: data?.data as Fuel[], countData: data?.countData, error, isLoading, mutate }
}

const useGetFuel = (id?: string) => {
  if (!id) return { fuel: null, isLoading: false, error: null, isValidating: false }
  const { data, isLoading, error, isValidating, mutate } = useSWR<Fuel, ResponseError>(API_BASEURL + ENDPOINTS.FUEL + `/${id}`, getFuel)

  return { fuel: data, isLoading, error, isValidating, mutate }
}

const useUpdateFuel = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateFuel>(API_BASEURL + ENDPOINTS.FUEL, createFuel)
  return { updateFuel: trigger, isMutating, error }
}

const useDeleteFuel = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.FUEL, deleteFuel)
  return { deleteFuel: trigger, isMutating, error }
}

export { useCreateFuel, useGetAllFuels, useGetFuel, useUpdateFuel, useDeleteFuel }
