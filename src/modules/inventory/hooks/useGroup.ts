import useSWR from 'swr'
import { type ResponseError } from '@/utils/response-error.utils'
import { API_BASEURL, ENDPOINTS } from '@/utils'
import useSWRMutation from 'swr/mutation'
import { createGroup, deletGroup, getAllGroups, getGroup, updateGroup } from '../services/group.service'
import { type GroupUpdate, type CreateGroup, type Group } from '../models/group.model'

const useGetAllGroup = () => {
  const { data, isLoading, error, mutate } = useSWR<Group[], ResponseError>(API_BASEURL + ENDPOINTS.GROUP, getAllGroups)

  return { groups: data, isLoading, error, mutate }
}

const useCreateGroup = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, CreateGroup>(API_BASEURL + ENDPOINTS.GROUP, createGroup)
  return { createGroup: trigger, isMutating, error }
}

const useGetGroup = (id?: string) => {
  const { data, isLoading, error, isValidating } = useSWR<Group, ResponseError>(id ? API_BASEURL + ENDPOINTS.GROUP + `/${id}` : null, getGroup)
  return { group: data, isLoading, error, isValidating }
}

const useUpdateGroup = () => {
  const { trigger, isMutating, error } = useSWRMutation<Promise<void>, ResponseError, string, GroupUpdate>(API_BASEURL + ENDPOINTS.GROUP, updateGroup)
  return { updateGroup: trigger, isMutating, error }
}

const useDeleteGroup = () => {
  const { trigger, error, isMutating } = useSWRMutation<Promise<void>, ResponseError, string, string>(API_BASEURL + ENDPOINTS.GROUP, deletGroup)
  return { deleteGroup: trigger, error, isMutating }
}

export { useGetAllGroup, useCreateGroup, useGetGroup, useUpdateGroup, useDeleteGroup }
