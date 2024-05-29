import { type ApiBase } from '@/models'
import { type Product } from './product.model'

export interface Fuel extends ApiBase {
  type: string
  octane: number
  name: string
  is_active: boolean
  product: Product
}

export interface CreateFuel extends Partial<Fuel> {
  productId: string
}
