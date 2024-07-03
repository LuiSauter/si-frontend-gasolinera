import { type ApiBase } from '@/models'
import { type Branch } from '@/modules/company/models/branch.model'
import { type User } from '@/modules/users/models/user.model'
import { type ProductOutput } from './ProductOutput.model'

export interface Output extends ApiBase {
  date: string
  time: string
  reason: string
  destination: string
  additionalNotes: string
  productOutput: ProductOutput[]
  user: User
  branch: Branch
}

export interface CreateOutput {
  reason: string
  destination: string
  additionalNotes: string
  userId: string
  branchId: string
}

export interface OuputUpdate extends CreateOutput {
  id: string
}
