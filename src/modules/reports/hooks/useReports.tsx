import useSWRMutation from 'swr/mutation'

import { API_BASEURL, ENDPOINTS } from '@/utils'
import { generateReport } from '@modules/reports/services/reports.service'
import type { Report, ReportResponse } from '@modules/reports/models/reports.model'
import { type ResponseError } from '@/utils/response-error.utils'

const useGenerateReport = () => {
  const { trigger, isMutating, error, data, reset } = useSWRMutation<ReportResponse, ResponseError, string, Partial<Report>>(API_BASEURL + ENDPOINTS.REPORTS, generateReport)
  return { generateReport: trigger, isMutating, error, data, reset }
}

export { useGenerateReport }
