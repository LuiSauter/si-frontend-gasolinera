import { type ApiBase } from '@/models'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Product } from '@/modules/inventory/models/product.model'

export interface Discount extends ApiBase {
  name: string
  description: string
  type: string
  final_date: Date
  initial_date: Date
  percentage: number
  branch: Branch
  is_active: boolean
  products: Product[]
}
export interface DiscountAll extends ApiBase {
  name: string
  description: string
  type: string
  final_date: string
  initial_date: string
  percentage: number
  branch: Branch
  is_active: boolean
  products: Product[]
}
export interface CreateDiscount {
  name: string
  description: string
  type: string
  initial_date: Date
  final_date: Date
  percentage: number
  branchId: string
  productIds: string[]
}

export interface UpdateDiscount {
  id: string
  name: string
  final_date: Date
  initial_date: Date
  type: string
  description: string
  branchId: string
  percentage: number
  productIds: string[]
}
