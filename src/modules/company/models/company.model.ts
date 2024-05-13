import { type Branch } from './branch.model'

export interface Company {
  direction: string
  name: string
  logo_url?: string
  phone?: string
  owner_name: string
  creation_date: string
  email: string
  nit: string
  centralId?: Branch
}

export interface UpdateCompany extends Omit<Company, 'centralId'> {
}
