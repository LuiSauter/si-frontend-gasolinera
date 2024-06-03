import { type ApiBase } from '@/models'

export interface Provider extends ApiBase {
  name: string
  phone: string
  email: string
  address: string
  nit: string
  detail: string
  isActive: boolean
}
export interface CreateProvider {
  name: string
  phone: string
  email: string
  address: string
  nit: string
  detail: string
}

export interface UpdateProvider extends CreateProvider {
  id: string
}
