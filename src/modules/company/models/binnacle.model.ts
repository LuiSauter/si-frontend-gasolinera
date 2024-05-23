export enum MONTH {
  JANUARY = 'enero',
  FEBRUARY = 'febrero',
  MARCH = 'marzo',
  APRIL = 'abril',
  MAY = 'mayo',
  JUNE = 'junio',
  JULY = 'julio',
  AUGUST = 'agosto',
  SEPTEMBER = 'septiembre',
  OCTOBER = 'octubre',
  NOVEMBER = 'noviembre',
  DECEMBER = 'diciembre',
}

export interface Binnacle {
  ip: string
  userId: string
  branchId?: string
  path: string
  method: string
  body: string
  date: string
  time: string
}

export interface GetLogByMothAndYear {
  month: MONTH
  year: number
  password: string
}
