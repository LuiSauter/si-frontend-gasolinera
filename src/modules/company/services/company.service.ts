import { fetchData } from '@/utils'
import { type Company, type UpdateCompany } from '../models/company.model'

const getCompany = async (url: string): Promise<Company> => {
  const response = await fetchData(url)
  return response.data
}

const updateCompany = async (url: string, { arg }: { arg: UpdateCompany }): Promise<void> => {
  const options: RequestInit = { method: 'PATCH', body: JSON.stringify(arg) }
  await fetchData(url, options)
}

export { getCompany, updateCompany }
