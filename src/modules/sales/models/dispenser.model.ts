import { type ApiBase } from '@/models'
import { type Branch } from '@/modules/company/models/branch.model'

export interface Dispenser extends ApiBase {
  ubication: string
  max_capacity: string
  is_active: boolean
  branch: Branch
}

export interface CreateDispenser {
  ubication: string
  max_capacity: string
  is_active: boolean
  branchId: string
}

export interface DispenserUpdate {
  id: string
  ubication: string
  max_capacity: string
  is_active: boolean
  branchId: string
}
