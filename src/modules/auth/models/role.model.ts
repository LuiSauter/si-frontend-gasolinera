import { type ApiBase } from '@/models/api-base'
import { type Permissions } from './permission.model'

export interface Role extends ApiBase {
  name: string
  permissions: Permissions[]
}

export interface CreateRole {
  name: string
  permissions: string[]
}

export interface UpdateRole extends CreateRole {
  id: string
}
