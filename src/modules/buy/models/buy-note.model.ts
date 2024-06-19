import { type ApiBase } from '@/models'
import { type Provider } from './provider.model'
import { type User } from '@/modules/users/models/user.model'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Tank } from '@/modules/inventory/models/tank.model'
import { type Batch } from '@/modules/inventory/models/batch.model'
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
