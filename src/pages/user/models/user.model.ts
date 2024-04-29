import { type GENDER, type ROLE } from '@/utils'

export interface User {
  id: string
  name: string
  lastName: string
  email: string
  rol: ROLE
  gender: GENDER
  isSuspended: boolean
}
