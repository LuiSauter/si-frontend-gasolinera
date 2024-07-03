import { type ApiBase } from '@/models'
import { type Batch } from './batch.model'

export interface ProductOutput extends ApiBase {
  amount: number
  batch: Batch
}
