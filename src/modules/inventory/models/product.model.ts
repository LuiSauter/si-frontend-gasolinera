import { type ApiBase } from '@/models'
import { type Branch } from '@/modules/company/models/branch.model'

export interface Product extends ApiBase {
  code: string
  name: string
  stock: number
  minimum_tock: number
  description: string
  price_sale: number
  price_purchase: number
  iva: number
  image_url: string
  discount: number
  is_active: boolean
  branch?: Branch
  category?: Category
  groups?: ProductGroup[]
}

export interface CreateProduct extends Partial<Product> {
  branchId: string
  categoryId: string
  groupsId?: string[]
}

export interface Category extends ApiBase {
  name: string
  image_url: string
  description: string
}

export interface ProductGroup extends ApiBase {
  group: Group
}

export interface Group extends ApiBase {
  name: string
  description: string
}
