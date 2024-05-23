import { type ApiBase } from '@/models'

export interface Category extends ApiBase {
  name: string
  description: string
  image_url: string
}

export interface CreateCategory {
  name: string
  description: string
  image_url: string
}

export interface CategoryUpdate extends Partial<Category> {
  name: string
  description: string
  image_url: string
}
