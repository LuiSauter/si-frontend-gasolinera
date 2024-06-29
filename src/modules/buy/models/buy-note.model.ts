import { type ApiBase } from '@/models'
import { type Provider } from './provider.model'
import { type User } from '@/modules/users/models/user.model'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Tank } from '@/modules/inventory/models/tank.model'
import {
  type CreateBatch,
  type Batch
} from '@/modules/inventory/models/batch.model'
import { type PurchaseOrder } from './purchase-order.model'

export interface BuyNote extends ApiBase {
  code: string
  date: string
  time: string
  totalAmount: number

  provider: Provider
  user: User
  branch: Branch
  buyDetails: BuyDetail[]
  purchaseOrder: PurchaseOrder
}

export interface BuyDetail extends ApiBase {
  amount: number
  price: number
  subTotal: number
  tank?: Tank
  batch?: Batch
}

export interface CreateBuy {
  totalAmount: number
  providerId: string
  purchaseOrderId: string
  details: CreateBuyDetail[]
}

export interface CreateBuyDetail {
  amount: number
  price: number
  newBatch?: CreateBatch
  tankId?: string
}

export interface UpdateBuyNote extends Partial<CreateBuy> {
  id: string
}
