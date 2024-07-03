import { type ApiBase } from '@/models'
import { type STATE } from '../constants/state.constants'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Provider } from './provider.model'
import { type Product } from '@/modules/inventory/models/product.model'
import { type User } from '@/modules/users/models/user.model'
import { type BuyNote } from './buy-note.model'

export interface PurchaseOrder extends ApiBase {
  code: number
  reason: string
  state: STATE
  date: string
  time: string
  total: number

  branch: Branch
  provider: Provider
  purchaseOrderDetails: PurchaseOrderDetail[]
  user: User
  buyNote?: BuyNote
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

export interface UpdatePurchaseOrder extends Partial<CreatePurchaseOrder> {

}

interface CreatePurchaseOrderDetail extends Partial<Omit<PurchaseOrderDetail, 'subTotal'>> {
  productId: string
}
