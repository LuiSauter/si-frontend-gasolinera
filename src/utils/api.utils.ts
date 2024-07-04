import { AppConfig } from '../config'

export const ENDPOINTS = {
  // auth
  AUTH: '/api/auth',
  RESET_PASSWORD: '/api/reset-password',
  RECOVER_PASSWORD: '/api/forgot-password',
  // user
  USER: '/api/user',
  ROLE: '/api/role',
  PERMISSION: '/api/permission',
  // company
  COMPANY: '/api/company',
  BRANCH: '/api/branch',
  BINNACLE: '/api/binnacle',
  // inventory
  OUTPUT: '/api/output',
  CATEGORY: '/api/category',
  GROUP: '/api/group',
  PRODUCT: '/api/product',
  FUEL: '/api/fuel',
  BATCH: '/api/batch',
  TANK: '/api/tank',
  // buys
  BUY_NOTE: '/api/buy-note',
  PROVIDER: '/api/providers',
  PROVIDER_ALL: '/api/providers/all',
  PROVIDER_PRODUCT: '/api/provider-product/all',
  PROVIDER_PRODUCT_CREATE: '/api/provider-product',
  PROVIDER_PRODUCT_EDIT: '/api/provider-product/one',
  PURCHASE_ORDER: '/api/purchase-order',
  // sales
  DISPENSER: '/api/dispenser',
  HOSE_DISPENSER: '/api/hose',
  DISCOUNT: '/api/discount',
  DISCOUNT_ALL: '/api/discount/all',
  DISCOUNT_ONE: '/api/discount/one',
  SALES: '/api/sale-note'

}

export const API_BASEURL = AppConfig.API_URL
