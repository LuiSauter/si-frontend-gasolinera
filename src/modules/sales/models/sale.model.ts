import { type User } from '@/modules/users/models/user.model'
import { type Dispenser } from './dispenser.model'
import { type Tank } from '@/modules/inventory/models/tank.model'
import { type Batch } from '@/modules/inventory/models/batch.model'
import { type Branch } from '@/modules/company/models/branch.model'
import { type ApiBase } from '@/models'

export interface Sale extends ApiBase {
  code: number
  amountPaid: number
  amountReceivable: number
  amountReturned: number
  discount: number

  date: string
  time: string
  seller: User
  dispenser: Dispenser
  customer: Customer
  saleDetails?: ISaleNoteDetails[]
  branch?: Branch
}

export interface Customer extends ApiBase {
  name: string
  nit: string
  plate: string
  monthlyAmountSold: number
  lastDateSold: string
}

export interface ISaleNoteDetails extends ApiBase {
  amount: number
  price: number
  subTotal: number

  batch?: Batch
  tank?: Tank
}

export interface CreateSale extends Partial<Sale> {
  customerName: string
  nit: string
  plate?: string
  hoseId?: string
  details: CreateSaleDetail[]
}

export interface CreateSaleDetail extends Partial<ISaleNoteDetails> {
  batchId?: string
}
