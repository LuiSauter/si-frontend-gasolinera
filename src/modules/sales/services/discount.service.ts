import { fetchData } from '@/utils'
import { type UpdateDiscount, type CreateDiscount, type Discount, type DiscountAll } from '../models/discount.model'
import { type ApiResponse } from '@/models'

// const getAllDiscount = async (url: string): Promise<Discount[]> => {
//   const response = await fetchData(url)
//   return response.data.data
// }
const getAllDiscount = async (url: string): Promise<ApiResponse> => {
  const response = await fetchData(url)
  const countData = response.countData
  const data: DiscountAll[] = response.data as DiscountAll[]
  return { countData, data }
}
const getDiscount = async (url: string): Promise<Discount> => {
  const response = await fetchData(url)
  return response.data
}

const createDiscount = async (url: string, { arg }: { arg: CreateDiscount }): Promise<void> => {
  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({
      ...arg,
      initial_date: arg.initial_date.toISOString(),
      final_date: arg.final_date.toISOString()
    })
  }
  console.log(arg)
  await fetchData(url, options)
}
// const createDiscount = async (url: string, { arg }: { arg: CreateDiscount }): Promise<void> => {
//   console.log('Datos enviados al servidor:', arg) // Añadir un log para verificar los datos enviados

//   const options: RequestInit = {
//     method: 'POST',
//     body: JSON.stringify(arg)
//   }

//   try {
//     const response = await fetch(url, options)

//     if (!response.ok) {
//       // Si la respuesta no es 2xx, lanza un error con los detalles
//       const errorData = await response.json()
//       throw new Error(`Error: ${response.status} ${response.statusText} - ${errorData.message}`)
//     }
//     // return response
//   } catch (error) {
//     console.error('Error al crear el descuento:', error) // Log detallado del error
//     throw error
//   }
// }

const updateDiscount = async (url: string, { arg }: { arg: UpdateDiscount }): Promise<void> => {
  const options: RequestInit = {
    method: 'PATCH',
    body: JSON.stringify(arg)
  }
  await fetchData(`${url}/${arg.id}`, options)
}

const deleteDiscount = async (url: string, { arg }: { arg: string }): Promise<void> => {
  const id = arg
  const options: RequestInit = { method: 'DELETE' }
  await fetchData(`${url}/${id}`, options)
}

export { getAllDiscount, createDiscount, updateDiscount, getDiscount, deleteDiscount }
