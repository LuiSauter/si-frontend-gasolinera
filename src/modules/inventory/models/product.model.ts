import { type ApiBase } from '@/models'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Fuel } from './fuel.model'

export interface Product extends ApiBase {
  code: string
  name: string
  stock: number
  minimum_stock: number
  description: string
  price_sale: number
  price_purchase: number
  is_active: boolean
  image_url?: string
  path_image?: string
  branch?: Branch
  category?: Category
  groups?: ProductGroup[]
  fuel?: Fuel
  product_discount: number
}

export interface CreateProduct extends Partial<Product> {
  branchId: string
  categoryId: string
  groupsId?: string[]
  image?: File
}

export interface Category extends ApiBase {
  name: string
  image_url?: string
  path_image?: string
  description: string
}

export interface ProductGroup extends ApiBase {
  group: Group
}

export interface Group extends ApiBase {
  name: string
  description: string
}
