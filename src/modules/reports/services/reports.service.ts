import { fetchData, generateQueryParamsGeneric } from '@/utils'
import { TypeDocument, type Report, type ReportResponse } from '../models/reports.model'

export const generateReport = async (url: string, { arg }: { arg: Partial<Report> }): Promise<ReportResponse> => {
  const query = generateQueryParamsGeneric(arg.parameters as Record<string, string | number | undefined>)

  const urlReport = url + `/${arg.typeReport}/${arg.typeDocument === TypeDocument.PDF ? 'getPdf' : 'getExcel'}?${query}`
  const response = await fetchData(urlReport, undefined, true)

  let fileName = 'reporte'
  fileName += arg.typeDocument === TypeDocument.PDF ? '.pdf' : '.xlsx'
  const contentDisposition: string = response.headers.get('content-disposition')

  if (contentDisposition) {
    const fileNameOfServer = contentDisposition.split('=')
    fileName = fileNameOfServer[1].trim()
  }

  const dataBlob: Blob = await response.blob()
  return { fileName, dataBlob }
}
