import { type ApiBase } from '@/models'
import { type Role } from '@/modules/auth/models/role.model'
import { type Branch } from '@/modules/company/models/branch.model'
import { type GENDER } from '@/utils'

export interface User extends ApiBase {
  name: string
  ci: number
  email: string
  address: string
  phone: string
  gender: GENDER
  isActive: boolean
  role: Role
  branch: Branch
  password: string
}
export interface CreateUser {
  ci: number
  name: string
  email: string
  password: string
  gender: string
  address: string
  phone: string
  role: string
  branch: string
}

export interface UpdateUser extends CreateUser {
  id: string
}
