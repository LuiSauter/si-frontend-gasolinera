import { type ApiBase } from '@/models'
import { type Dispenser } from './dispenser.model'
import { type Tank } from '@/modules/inventory/models/tank.model'

export interface Hose extends ApiBase {
  is_active: boolean
  dispenser: Dispenser
  tank: Tank
}
