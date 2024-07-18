import { fetchData } from '@/utils'
import { type BatchDataResponse, type BuyNoteYearResponse, type ProductMinStockResponse, type SaleNoteProductResponse, type SaleNoteYear, type SaleNoteYearMonth, type SaleNoteYearMonthResponse, type SaleNoteYearResponse } from '../models/dashboard.model'

const getAllSaleNoteYear = async (url: string): Promise<SaleNoteYearResponse> => {
  const response: { data: SaleNoteYear[], countData: number } = await fetchData(url)
  const countData = response.countData
  const data = response.data
  return { countData, data }
}

const getAllSaleNoteYearMonth = async (url: string): Promise<SaleNoteYearMonthResponse> => {
  const response: { data: SaleNoteYearMonth[], countData: number } = await fetchData(url)
  const countData = response.countData
  const data = response.data
  return { countData, data }
}

const getAllSaleNoteProduct = async (url: string): Promise<SaleNoteProductResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  return { countData, data: response.data }
}

const getAllProductMinStock = async (url: string): Promise<ProductMinStockResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data = response.data
  return { countData, data }
}

const getAllBatchData = async (url: string): Promise<BatchDataResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data = response.data
  return { countData, data }
}

const getAllBuyNoteYear = async (url: string): Promise<BuyNoteYearResponse> => {
  const response: { data: SaleNoteYear[], countData: number } = await fetchData(url)
  const countData = response.countData
  const data = response.data
  return { countData, data }
}

export { getAllSaleNoteYear, getAllSaleNoteYearMonth, getAllSaleNoteProduct, getAllProductMinStock, getAllBatchData, getAllBuyNoteYear }
