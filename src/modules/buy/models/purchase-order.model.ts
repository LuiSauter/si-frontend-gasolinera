import { type ApiBase } from '@/models'
import { type STATE } from '../constants/state.constants'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Provider } from './provider.model'
import { type Product } from '@/modules/inventory/models/product.model'

export interface PurchaseOrder extends ApiBase {
  code: number
  reason: string
  state: STATE
  total: number

  branch: Branch
  provider: Provider
  purchaseOrderDetails: PurchaseOrderDetail[]
}

interface PurchaseOrderDetail extends ApiBase {
  amount: number
  subTotal: number
  product?: Product
}

export interface CreatePurchaseOrder extends Partial<Omit<PurchaseOrder, 'purchaseOrderDetails' | 'state'>> {
  branchId: string
  providerId: string
  details: CreatePurchaseOrderDetail[]
  state: string
}

interface CreatePurchaseOrderDetail extends Partial<Omit<PurchaseOrderDetail, 'subTotal'>> {
  productId: string
}
