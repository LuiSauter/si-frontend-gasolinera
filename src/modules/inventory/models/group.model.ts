import { type ApiBase } from '@/models'

export interface Group extends ApiBase {
  name: string
  description: string
}

export interface CreateGroup {
  name: string
  description: string
}

export interface GroupUpdate extends Partial<Group> {
  name: string
  description: string
}
