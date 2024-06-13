import { type ApiBase } from '@/models'
import { type STATE } from '../constants/state.constants'
import { type Branch } from '@/modules/company/models/branch.model'
import { type Provider } from './provider.model'

export interface PurchaseOrder extends ApiBase {
  code: number
  reason: string
  state: STATE
  branch: Branch
  provider: Provider
}

export interface CreatePurchaseOrder extends Partial<PurchaseOrder> {
  branchId: string
  providerId: string
}
