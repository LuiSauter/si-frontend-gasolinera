import { type GENDER, type ROLE } from '@/utils'
import { type Role } from '@/modules/auth/models/role.model'

export interface User {
  id: string
  name: string
  lastName: string
  email: string
  rol: ROLE
  gender: GENDER
  isSuspended: boolean
}
export interface CreateUser {
  name: string
  email: string
  phone: string
  role: string
  branch: string
}
