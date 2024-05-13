import { AppConfig } from '../config'

export const ENDPOINTS = {
  STORE: '/api/store',
  STORE_COMMENT: '/api/store-comment',
  CATEGORY: '/api/category',

  // auth
  AUTH: '/api/auth',
  RESET_PASSWORD: '/api/reset-password',
  RECOVER_PASSWORD: '/api/forgot-password',
  ROLE: '/api/role',
  PERMISSION: '/api/permission',
  USER: '/api/user'
}

export const API_BASEURL = AppConfig.API_URL
