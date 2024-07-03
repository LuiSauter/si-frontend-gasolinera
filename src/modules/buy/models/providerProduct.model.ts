import { type ApiBase } from '@/models'
import { type Provider } from './provider.model'
import { type Product } from '@/modules/inventory/models/product.model'

export interface ProviderProduct extends ApiBase {
  details: string
  last_price: number
  provider: Provider
  product: Product
}

export interface CreateProviderProduct {
  details: string
  last_price: number
  providerId: string
  productId: string
}

export interface UpdateProviderProduct extends CreateProviderProduct {
  id: string
}
