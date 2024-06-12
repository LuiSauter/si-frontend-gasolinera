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
  CATEGORY: '/api/category',
  GROUP: '/api/group',
  PRODUCT: '/api/product',
  FUEL: '/api/fuel',
  // buys
  PROVIDER: '/api/providers',
  PROVIDER_PRODUCT: '/api/provider-product/all',
  PROVIDER_PRODUCT_CREATE: '/api/provider-product',
  PROVIDER_PRODUCT_EDIT: '/api/provider-product/one',
  // sales
  DISPENSER: '/api/dispenser',
  DISCOUNT: '/api/discount',
  DISCOUNT_ALL: '/api/discount/all',
  DISCOUNT_ONE: '/api/discount/one'

}

export const API_BASEURL = AppConfig.API_URL
