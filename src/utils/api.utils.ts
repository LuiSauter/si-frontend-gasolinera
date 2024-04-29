import { AppConfig } from '../config'

export const ENDPOINTS = {
  LOGIN: '/api/login',
  VERIFY: '/api/checkToken',
  LOGOUT: '/api/logout',
  RECOVER_PASSWORD: '/api/forgot-password',
  RESET_PASSWORD: '/api/reset-password',
  STORE: '/api/store',
  STORE_COMMENT: '/api/store-comment',
  CATEGORY: '/api/category'
}

export const API_BASEURL = AppConfig.API_URL
