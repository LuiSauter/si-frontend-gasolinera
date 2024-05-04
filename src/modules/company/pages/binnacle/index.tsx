import { useHeader } from '@/hooks'
import { PrivateRoutes } from '@/models/routes.model'

function BinnaclePage(): JSX.Element {
  useHeader([
    { label: 'Dashboard', path: PrivateRoutes.DASHBOARD },
    { label: 'Empresa', path: PrivateRoutes.COMPANY },
    { label: 'Bitácora' }
  ])
  return (
    <div>Bitácora Page </div>
  )
}

export default BinnaclePage
