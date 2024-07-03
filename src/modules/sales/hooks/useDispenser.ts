import useSWR from 'swr'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import useSWRMutation from 'swr/mutation'
import { createDispenser, deleteDispenser, getAllDispenser, getDispenser, updateDispenser } from '../services/dispenser.service'
import { type DispenserUpdate, type CreateDispenser, type Dispenser } from '../models/dispenser.model'

const useGetAllDispensers = () => {
  const { data, isLoading, error, mutate } = useSWR<Dispenser[], ResponseError>(API_BASEURL + ENDPOINTS.DISPENSER, getAllDispenser)

  return { dispensers: data, isLoading, error, mutate }
}

const useCreateDispenser = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateDispenser>(API_BASEURL + ENDPOINTS.DISPENSER, createDispenser)
  return { createDispenser: trigger, isMutating, error }
}

const useGetDispenser = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Dispenser, ResponseError>(id ? API_BASEURL + ENDPOINTS.DISPENSER + `/${id}` : null, getDispenser)
  return { dispenser: data, isLoading, error, isValidating }
}

const useUpdateDispenser = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, DispenserUpdate>(API_BASEURL + ENDPOINTS.DISPENSER, updateDispenser)
  return { updateDispenser: trigger, isMutating, error }
}

const useDeleteDispenser = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.DISPENSER, deleteDispenser)
  return { deleteDispenser: trigger, error, isMutating }
}

export { useGetAllDispensers, useCreateDispenser, useGetDispenser, useUpdateDispenser, useDeleteDispenser }
