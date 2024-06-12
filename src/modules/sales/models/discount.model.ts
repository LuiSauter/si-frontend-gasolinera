import { type ApiBase } from '@/models'
import { type Branch } from '@/modules/company/models/branch.model'

export interface Discount extends ApiBase {
  name: string
  description: string
  type: string
  amount: number
  percentage: number
  branch: Branch
  is_active: boolean
}

export interface CreateDiscount {
  name: string
  description: string
  type: string
  amount: number
  percentage: number
  branchId: string
  is_active: boolean
}

export interface UpdateDiscount {
  id: string
  name: string
  description: string
  type: string
  amount: number
  percentage: number
  branchId: string
  is_active: boolean
}
