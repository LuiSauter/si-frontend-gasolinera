export enum TypeReport {
  BITACORA = 'bitacora',
  SALES = 'sales',
  BUY = 'buy',
  PRODUCT_ENTRY = 'product-entry',
  PRODUCT_OUTPUT = 'product-output'
}

export enum TypeDocument {
  PDF = 'pdf',
  EXCEL = 'excel'
}

export interface ApiParameterOptions extends Record<string, string | number | undefined> {
  branchId?: string
  categoryId?: string
  groupId?: string
  start_date?: string
  end_date?: string
  userId?: string
  productId?: string
  providerId?: string
}

interface Option {
  label: string
  value: string
}

export interface ParameterOptions {
  categoryId?: Option
  groupId?: Option
  branchId?: string

  start_date?: string
  end_date?: string
  userId?: Option
  productId?: Option
  nit?: string

  month?: string
  year?: string

  providerId?: Option
}

export interface Report {
  typeDocument: TypeDocument
  typeReport: TypeReport
  parameters?: ParameterOptions
}

export interface ReportResponse {
  fileName: string
  dataBlob: Blob
}
