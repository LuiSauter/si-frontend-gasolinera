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
  FUEL: '/api/fuel'
}

export const API_BASEURL = AppConfig.API_URL
