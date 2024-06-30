import { type ApiBase } from '@/models'
import { type Product } from './product.model'

export interface Batch extends ApiBase {
  code: string
  expiration_date: string
  detail: string
  stock: number
  is_active: boolean
  initial_stock: number
  product: Product
}

export interface CreateBatch extends Partial<Batch> {
  productId: string
}
