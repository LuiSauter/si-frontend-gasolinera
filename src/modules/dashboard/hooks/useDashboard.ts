import { API_BASEURL, getStorage, STORAGE_BRANCH } from '@/utils'
import useSWR, { type KeyedMutator } from 'swr'
import { type BatchDataResponse, type ProductMinStockResponse, type SaleNoteProductResponse, type SaleNoteYearMonthResponse, type BuyNoteYearResponse, type SaleNoteYearResponse } from '../models/dashboard.model'
import { type ResponseError } from '@/utils/response-error.utils'
import { getAllBatchData, getAllBuyNoteYear, getAllProductMinStock, getAllSaleNoteProduct, getAllSaleNoteYear, getAllSaleNoteYearMonth } from '../services/dashboard.service'

const useGetAllSaleNoteYear = (year?: string) => {
  if (getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH)) {
    return { countData: 0, saleNoteYears: [], isLoading: false, error: undefined, mutate: null, isValidating: false }
  }
  const { data, isLoading, error, mutate, isValidating } = useSWR<SaleNoteYearResponse, ResponseError>(year ? API_BASEURL + '/api/sale-note/year/' + year : null, getAllSaleNoteYear)
  return { countData: data?.countData, saleNoteYears: data?.data ?? [], isLoading, error, mutate, isValidating }
}

const useGetAllBuyNoteYear = (year?: string) => {
  if (getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH)) {
    return { countData: 0, buyNoteYears: [], isLoading: false, error: undefined, mutate: null, isValidating: false }
  }
  const { data, isLoading, error, mutate, isValidating } = useSWR<BuyNoteYearResponse, ResponseError>(year ? API_BASEURL + '/api/buy-note/year/' + year : null, getAllBuyNoteYear)
  return { countData: data?.countData, buyNoteYears: data?.data ?? [], isLoading, error, mutate, isValidating }
}

const useGetAllSaleNoteYearMonth = (year: string, month: string) => {
  if (getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH)) {
    return { countData: 0, saleNoteYearMonth: [], isLoading: false, error: undefined, mutate: null, isValidating: false }
  }
  const url = API_BASEURL + '/api/sale-note/date/' + year + '/' + month
  const { data, isLoading, error, mutate, isValidating } = useSWR<SaleNoteYearMonthResponse, ResponseError>(url, getAllSaleNoteYearMonth)
  return { countData: data?.countData, saleNoteYearMonth: data?.data ?? [], isLoading, error, mutate, isValidating }
}

const useGetAllSaleNoteProduct = (year: string, month: string) => {
  if (getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH)) {
    return { countData: 0, saleNoteProduct: [], isLoading: false, error: undefined, mutate: null, isValidating: false }
  }
  const url = API_BASEURL + '/api/sale-note/product/' + year + '/' + month
  const { data, isLoading, error, mutate, isValidating } = useSWR<SaleNoteProductResponse, ResponseError>(url, getAllSaleNoteProduct)
  return { countData: data?.countData, saleNoteProduct: data?.data ?? [], isLoading, error, mutate, isValidating }
}

const useGetAllProductMinStock = () => {
  if (getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH)) {
    return { countData: 0, productsMinStock: [], isLoading: false, error: undefined, mutate: (() => { }) as KeyedMutator<ProductMinStockResponse>, isValidating: false }
  }
  const { data, isLoading, error, mutate, isValidating } = useSWR<ProductMinStockResponse, ResponseError>(API_BASEURL + '/api/product/minimun-stock', getAllProductMinStock)
  return { countData: data?.countData, productsMinStock: data?.data ?? [], isLoading, error, mutate, isValidating }
}

const useGetAllBatchData = () => {
  if (getStorage(STORAGE_BRANCH) === '' || !getStorage(STORAGE_BRANCH)) {
    return { countData: 0, productsBatchData: [], isLoading: false, error: undefined, mutate: null, isValidating: false }
  }
  const { data, isLoading, error, mutate, isValidating } = useSWR<BatchDataResponse, ResponseError>(API_BASEURL + '/api/batch/date-end', getAllBatchData)
  return { countData: data?.countData, productsBatchData: data?.data ?? [], isLoading, error, mutate, isValidating }
}

export { useGetAllSaleNoteYear, useGetAllSaleNoteYearMonth, useGetAllSaleNoteProduct, useGetAllBuyNoteYear, useGetAllProductMinStock, useGetAllBatchData }
