import { type Branch } from '@/modules/company/models/branch.model'
import { type Batch } from '@/modules/inventory/models/batch.model'
import { type Product } from '@/modules/inventory/models/product.model'

export interface SaleNoteYear {
  countData: number
  discount: number
  total: number
  month: string
}

export interface SaleNoteYearResponse {
  data: SaleNoteYear[]
  countData: number
}

export interface SaleNoteYearMonth {
  countData: number
  discount: number
  total: number
  month: string
  day: number
}

export interface SaleNoteYearMonthResponse {
  data: SaleNoteYearMonth[]
  countData: number
}

export interface SaleNoteProduct {
  countData: number
  data: SaleNoteProductData[]
  month: string
  day: number
}

export interface SaleNoteProductData {
  count: number
  product: Partial<Product>
}

export interface SaleNoteProductResponse {
  data: SaleNoteProduct[]
  countData: number
}

export interface ProductBatch extends Product {
  branch: Branch
}

export interface BatchData extends Batch {
  product: ProductBatch
}

export interface BatchDataResponse {
  countData: number
  data: BatchData[]
}

export interface BuyNoteYear {
  countData: number
  total: number
  month: string
}

export interface BuyNoteYearResponse {
  data: BuyNoteYear[]
  countData: number
}

export interface ProductMinStockResponse {
  countData: number
  data: Product[]
}
