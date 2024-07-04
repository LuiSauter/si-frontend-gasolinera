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

export enum YEAR {
  Q2020 = '2020',
  Q2021 = '2021',
  Q2022 = '2022',
  Q2023 = '2023',
  Q2024 = '2024',
  Q2025 = '2025',
  Q2026 = '2026',
  Q2027 = '2027',
  Q2028 = '2028',
  Q2029 = '2029',
  Q2030 = '2030',
  Q2031 = '2031',
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
  month: string
  year: string
}
