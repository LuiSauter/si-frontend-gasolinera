export enum Order {
  asc = 'asc',
  desc = 'desc',
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface FilterOptions {
  offset: number
  limit: number
  order: Order
  attr?: string
  value?: string
}
