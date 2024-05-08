import { type ApiBase } from '@/models/api-base'

export interface Role extends ApiBase {
  name: string
  permissions: string[]
}

export interface CreateRole {
  name: string
  permissions: string[]
}
