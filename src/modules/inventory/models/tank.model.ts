import { type ApiBase } from '@/models'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Fuel } from './fuel.model'
import { type Product } from './product.model'

export interface Tank extends ApiBase {
  name: string
  description: string
  capacity_max: number
  is_active: boolean
  ubication: string
  instalation_date: string
  last_revision: string
  stock: number
  branch: Branch
  fuel: Fuel
  product?: Product
}

export interface CreateTank extends Partial<Tank> {
  fuelId: string
  branchId: string
  productId: string
}
